const express = require("express");
const router = express.Router();
const tutorial = require("../controllers/tutorial.controller");

router.get("/api/tutorials", tutorial.findAll);

router.get("/api/tutorials/published", tutorial.findAll);

router.get("/api/tutorials/:id", tutorial.findOne);

router.post("/api/tutorials", tutorial.create);

router.put("/api/tutorials/:id", tutorial.update);

router.delete("/api/tutorials/:id", tutorial.delete);

router.delete("/api/tutorials", tutorial.deleteAll);

module.exports = router;
