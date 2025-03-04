module.exports = {
  // isLogged
  isLogged: (req, res, next) =>
    req.user ? next() : next(new Error("NoPermission: You must login")),
};
