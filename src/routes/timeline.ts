import { Router } from "express";
import * as TimelineController from "../controllers/timeline";
import { privateRoute } from "../config/passport";

const timelineRoutes: Router = Router();

timelineRoutes.get("/:id", TimelineController.getTimeline);

timelineRoutes.get("/", TimelineController.getAllTimelines);


timelineRoutes.post(
  "/createTimeline", privateRoute,
  TimelineController.createTimeline,
);
timelineRoutes.post(
  "/createTimelineMedia", privateRoute, 
  TimelineController.createTimelineMedia,
);


timelineRoutes.delete("/timeline/:id", privateRoute);

timelineRoutes.put("/timeline/:id");

timelineRoutes.patch("/timeline/:id");

export default timelineRoutes;

/*
/timeline
POST /timeline (cria timeline)
DELETE /timeline/:id (remove timeline)
PUT(PATCH) /timeline/:id (modifica timeline)
GET /timeline/:id (retorna a timeline pelo id)
*/
