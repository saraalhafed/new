const router = require("express").Router();

const Profile = require("../controllers/profileController");
// Authentication middleware :
const authMw = require("../middlewares/authMiddleware"); 

router
  .route("/")
  .get(Profile.list)
  .post(authMw ,Profile.create);

router
  .route("/:id")
  .get(authMw ,Profile.read)
  .put(authMw ,Profile.update)
  .patch(authMw ,Profile.update)
  .delete(authMw ,Profile.delete);

module.exports = router;
