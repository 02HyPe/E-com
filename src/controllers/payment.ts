import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middlewares/wrapper/asyncHandler";
import { paymentType } from "../schema/paymentSchema";
import Stripe from "stripe";
import { ErrorResponse } from "../utils/errorHandler";

export const paymentGateway = asyncHandler(
  async (
    req: Request<{}, {}, paymentType>,
    res: Response,
    next: NextFunction
  ) => {
    const { price, productName, quantity } = req.body;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: productName,
            },
            unit_amount: price,
          },
          quantity: quantity * 100,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:9001/success",
      cancel_url: "http://localhost:9001/cancel",
    });
    if (!session.url) {
      throw next(new ErrorResponse(500, "something went wrong with checkout"));
    }
    res.redirect(session.url);
  }
);

export const paymentSuccess = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ msg: "payment successfull" });
  }
);

export const paymentCancel = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ msg: "payment canceled" });
  }
);
