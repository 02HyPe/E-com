import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middlewares/wrapper/asyncHandler";
import { createOrderType } from "../schema/orderSchema";
import {
  OrderModel,
  ProductModel,
  UserModel,
} from "../configs/mongoose.models";
import { ErrorResponse } from "../utils/errorHandler";
import Stripe from "stripe";

export const createOrder = asyncHandler(
  async (
    req: Request<{}, {}, createOrderType>,
    res: Response,
    next: NextFunction
  ) => {
    const { products, address } = req.body;
    const email = req.email;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      throw next(new ErrorResponse(500, "error with user"));
    }
    const productDtls = await ProductModel.find({ _id: { $in: products } });
    const orders = new OrderModel({
      user: user._id,
      address: address,
      products: productDtls,
    });
    await orders.save();
    if (!orders || !orders.user) {
      throw next(new ErrorResponse(500, "internal orders server error"));
    }
    const lineItems = productDtls.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.productName,
        },
        unit_amount: product.price * 100,
      },
      quantity: 1,
    }));

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      metadata: {
        orderId: orders._id.toString(),
        userId: orders.user.toString(),
      },
      success_url: "http://localhost:9001/",
      cancel_url: "http://localhost:9001/",
    });

    res.json({ msg: session.url });
  }
);

export const paymentUpdate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let event: Stripe.Event;
    const wbsecret = req.headers["stripe-signature"] as string;
    event = Stripe.webhooks.constructEvent(
      req.body,
      wbsecret,
      process.env.SIGN_WEBHOOK_SECRET
    );
    const eventObj = event.data.object as Stripe.Checkout.Session;
    const order_id = eventObj.metadata?.orderId;

    switch (event.type) {
      case "checkout.session.completed": {
        await OrderModel.findByIdAndUpdate(order_id, {
          $inc: { __v: 1 },
          status: "placed",
        });
        break;
      }
      default:
    }
    res.json({ msg: "payment successfull" });
  }
);
