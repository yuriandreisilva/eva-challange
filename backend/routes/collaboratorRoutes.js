const express = require("express");
const router = express.Router();
const CollaboratorService = require("../services/collaboratorService");
const CollaboratorHasJourneyService = require("../services/collaboratorHasJourneyService");

router.post("/collaborators", async (req, res) => {
  try {
    const collaborator = await CollaboratorService.create(req.body);
    res.status(201).json(collaborator);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/collaborators", async (req, res) => {
  try {
    const collaborator = await CollaboratorService.getAll();
    res.status(201).json(collaborator);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/collaborators-has-journey", async (req, res) => {
  try {
    const collaboratorWithJourney = await CollaboratorHasJourneyService.create(req.body);
    res.status(201).json(collaboratorWithJourney);
  } catch (error) {
    res.status(error.status == 409 ? 409 : 400).json({ error: error.message });
  }
});

router.get("/collaborators-has-journey", async (req, res) => {
  try {
    const collaboratorWithJourney = await CollaboratorHasJourneyService.getAll();
    res.status(201).json(collaboratorWithJourney);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/collaborator/journey", async (req, res) => {
  try {
    const collaboratorWithJourney = await CollaboratorHasJourneyService.getByJourneyIdAndCollaboratorId(
      req.body.journey_id,
      req.body.collaborator_id
    );
    res.status(201).json(collaboratorWithJourney);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
