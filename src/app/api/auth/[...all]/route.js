import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('studynook');

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  // Enable Email & Password signups
  emailAndPassword: {
    enabled: true
  },
  trustedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
  ],
  user: {
    additionalFields: {
      image: {
        type: "string",
        required: false
      }
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});

export const { GET, POST } = auth;