//aim of this middleware is to enorce Strict-Transport-Security
function hsts(req, res, next) {
  if (req.secure) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=0; includesubDomains; preload"
    );
  }
  next();
}

module.exports = hsts;