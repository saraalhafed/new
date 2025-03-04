const router = require("express").Router();
// Import controller:
const Country = require("../controllers/countryController");
// Authentication middleware :
const authMw = require("../middlewares/authMiddleware"); /* Protecting the user route: without log in is not possible to access the country route */

const { isLogged } = require("../middlewares/permissions");

// upload middleware:
const upload = require('../middlewares/upload')

router
  .route("/")
  .get(Country.list)
  .post(upload.array('images'),Country.create);

router
  .route("/:id")
  .get(authMw, isLogged, Country.read)
  .put(authMw, isLogged, Country.update)
  .patch(authMw, isLogged, Country.update)
  .delete(authMw, isLogged, Country.delete);

module.exports = router;
