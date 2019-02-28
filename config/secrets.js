module.exports = {
  jwtSecret: process.env.JWT_SECRET || "secret",
  twilioApiKey: process.env.TWILIOP_API_KEY || "key"
};
