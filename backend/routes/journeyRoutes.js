const express = require("express");
const router = express.Router();
const CollaboratorHasJourneyService = require("../services/collaboratorHasJourneyService");
const JourneyCategoryService = require("../services/journeyCategoryService");
const JourneyHasActionService = require("../services/journeyHasActionService");
const JourneyService = require("../services/journeyService");

router.post("/journeys/collaborator", async (req, res) => {
  try {
    const journey = await CollaboratorHasJourneyService.create(req.body);
    res.status(201).json(journey);
  } catch (error) {
    res.status(error.status == 409 ? 409 : 400).json({ error: error.message });
  }
});

router.put("/journeys/:id/inactivate", async (req, res) => {
  try {
    const { id } = req.params;
    // const updatedJourney = await CollaboratorHasJourneyService.update(id, { date_end: new Date() });

    if (!updatedJourney) return res.status(404).json({ error: "Jornada não encontrada" });

    res.json({ message: "Jornada inativada com sucesso", journey: updatedJourney });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/journeys/category", async (req, res) => {
  try {
    const category = await JourneyCategoryService.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/journey", async (req, res) => {
  try {
    const journey = await JourneyService.create(req.body);
    res.status(201).json(journey);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/journeys/action", async (req, res) => {
  try {
    const journeyHasAction = await JourneyHasActionService.create(req.body);
    res.status(201).json(journeyHasAction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/journeys", async (req, res) => {
  try {
    const journeys = await JourneyService.getAll();
    res.status(201).json(journeys);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;


