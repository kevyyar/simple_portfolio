export default {
  development: {
    port: process.env.PORT || 3000,
    database: process.env.DATABASE_URL || "mongodb://localhost:27017/portfolio",
    nodeEnv: "development",
  },
  production: {
    port: process.env.PORT || 80,
    database: process.env.DATABASE_URL,
    nodeEnv: "production",
  },
}[process.env.NODE_ENV || "development"];
