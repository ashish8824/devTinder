const adminAuth = (req, res, next) => {
  console.log("admimAuth is calling");
  const token = "xyz";
  console.log("admin auth is calling");
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("unauthorized");
  } else {
    next();
  }
};

module.exports = { adminAuth };
