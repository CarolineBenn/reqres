module.exports = {
  port:     process.env.PORT || 3000,
  database: process.env.MONGOLAB_URI || "mongodb://localhost/passport-jwt-boilerplate",
  secret:   process.env.SECRET || "12Sas%3fdv&7"
}