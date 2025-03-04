const router = require("express").Router();

// route        http://127.0.0.1:8000/api/users
router.use("/users", require("./userRoute")); //  /api/users
router.use("/auth", require("./authRoute")); //  /api/auth
router.use("/country", require("./countryRoute")); //  /api/country
router.use("/packlist", require("./packListRoute")); //  /api/packlist
router.use("/profile", require("./profileRoute")); //  /api/profile
module.exports = router;
