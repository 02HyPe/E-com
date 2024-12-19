declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URL: string;
    PORT: string;
    ACCESS_JWT_KEY: string;
    REFRESH_JWT_KEY: string;
    STRIPE_SECRET_KEY: string;
    NGROK_AUTHTOKEN: string;
    SIGN_WEBHOOK_SECRET: string;
  }
}

declare namespace Express {
  interface Request {
    email?: string;
    role?: string;
  }
}
