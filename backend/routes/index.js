const express = require("express");
const router = express.Router();

const journeyRoutes = require("./journeyRoutes");
const collaboratorRoutes = require("./collaboratorRoutes");
const actionRoutes = require("./actionRoutes");

router.use(journeyRoutes);
router.use(collaboratorRoutes);
router.use(actionRoutes);

module.exports = router;
