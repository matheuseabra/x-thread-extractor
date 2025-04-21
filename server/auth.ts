import { polar } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { db } from "@shared/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN || "",
  server: "sandbox",
});

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    twitter: {
      enabled: true,
      clientId: process.env.TWITTER_CLIENT_ID || "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
      redirectUri: process.env.TWITTER_REDIRECT_URI,
    },
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      enableCustomerPortal: true,
      checkout: {
        enabled: true,
        products: [
          {
            productId: process.env.PLUS_PRODUCT_ID || "",
            slug: "plus",
          },
          {
            productId: process.env.PRO_PRODUCT_ID || "",
            slug: "pro",
          },
        ],
        successUrl: `${process.env.APP_URL}/dashboard`,
      },
      webhooks: {
        secret: process.env.POLAR_WEBHOOK_SECRET || "",
        onSubscriptionActive: async (payload) => {
          console.log("Subscription active:", payload);
        },
        onSubscriptionRevoked: async (payload) => {
          console.log("Subscription canceled:", payload);
        },
      },
    }),
  ],
});
