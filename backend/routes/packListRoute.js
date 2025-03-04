const router = require("express").Router();
// Import controller:
const PackList = require("../controllers/packlistController");

router
  .route("/")
  .get(PackList.list)
  .post(PackList.create);

router
  .route("/:id")
  .get(PackList.read)
  .put(PackList.update)
  .patch(PackList.update)
  .delete(PackList.delete);

module.exports = router;
