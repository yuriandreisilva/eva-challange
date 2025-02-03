const express = require("express");
const router = express.Router();
const JourneyHasActionService = require("../services/journeyHasActionService");
const ActionService = require("../services/actionService");
const JourneyService = require("../services/journeyService");

router.get("/actions", async (req, res) => {
  try {
    const actions = await ActionService.getAll();
    res.status(201).json(actions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/action-by-id", async (req, res) => {
  try {
    const action = await ActionService.getById(req.body.action_id);
    res.status(201).json(action);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/action", async (req, res) => {
  try {
    const action = await ActionService.create(req.body);
    res.status(201).json(action);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/journeys/actions", async (req, res) => {
  try {
    const journeyHasAction = await JourneyHasActionService.create(req.body);
    res.status(201).json(journeyHasAction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/actions-journey", async (req, res) => {
  try {
    const response = await ActionService.getActionsByJourney(req.query.journey_id);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/actions-by-collaborator", async (req, res) => {
  try {
    const actions = await JourneyHasActionService.getAllByJourneyId(
      req.body.journey_id,
      req.body.collaborator_id,
    );
    res.status(201).json(actions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;