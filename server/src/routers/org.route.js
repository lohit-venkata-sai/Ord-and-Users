import { Router } from "express";
import { maxActiveCoordinatorsEnum, timeZoneEnum, regionEnum, languageEnum } from '../../drizzle/schema.js'
import {
  getAllOrgDetails,
  getOrgDetails,
  postOrgDetails,
  updateOrgDetails,
  deleteOrg,
} from "../containers/org.container.js";
import { isOrgAvailable } from "../middlewares/org.middleware.js";
const router = Router();

router.get('/', getAllOrgDetails);
router.post("/", postOrgDetails);
router.get("/o/:orgId", isOrgAvailable, getOrgDetails);
router.put("/o/:orgId", isOrgAvailable, updateOrgDetails);
router.delete('/o/:orgId', isOrgAvailable, deleteOrg);

router.get('/time-zone-enum', (req, res) => {
    res
      .status(200)
      .send({
        timeZoneEnum: [
          "UTC",
          "Asia/Kolkata",
          "America/New_York",
          "Europe/London",
          "Asia/Dubai",
        ],
      });
});
router.get('/region-enum', (req, res) => {
    res
      .status(200)
      .send({
        regionEnum: [
          "Asia/Kolkata",
          "Europe/London",
          "America/New_York",
          "Australia/Sydney",
          "Africa/Cairo",
          "Europe/Paris",
          "America/Los_Angeles",
          "Asia/Tokyo",
          "Pacific/Auckland",
          "Asia/Dubai",
        ],
      });
});
router.get('/language-enum', (req, res) => {
    res
      .status(200)
      .send({
        languageEnum: ["English", "Hindi", "French", "Spanish", "Arabic"],
      });
});
router.get("/max-active-coordinators-enum", (req, res) => {
  res.status(200).send({
    maxActiveCoordinatorsEnum: ["5", "7", "9", "11", "20"],
  });
});

router.get("/status-enum", (req, res) => {
  res.status(200).send({
    statusEnum: ["active", "blocked"],
  });
});


export default router;
