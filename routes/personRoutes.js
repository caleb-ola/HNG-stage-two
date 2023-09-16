const express = require("express");
const {
  createPerson,
  getPerson,
  updatePerson,
  deletePerson,
  getAllPeople,
} = require("../controllers/personController");

const router = express.Router();

router.route("/person").get(getAllPeople).post(createPerson);
router
  .route("/person/:id")
  .get(getPerson)
  .patch(updatePerson)
  .delete(deletePerson);

module.exports = router;
