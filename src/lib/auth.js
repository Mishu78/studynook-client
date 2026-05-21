const { betterAuth } = require("better-auth");
const { mongodbAdapter } = require("better-auth/adapters/mongodb");
const { MongoClient } = require("mongodb");

// 💡 Reuse your server environment connection string
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('studynook');

const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  // 💡 Keeps both options completely validated and allowed
  trustedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
  ],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});

module.exports = { auth };