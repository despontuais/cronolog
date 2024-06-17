import { Router } from "express";
import * as MediaController from "../controllers/media";
import { privateRoute } from "../config/passport";

const mediaRoutes: Router = Router();

//timelineRoutes.get("timeline/:id");

mediaRoutes.post(
  "/createMedia", privateRoute,
  MediaController.createMedia
);
/*
timelineRoutes.delete("/timeline/:id", privateRoute);

timelineRoutes.put("/timeline/:id");

timelineRoutes.patch("/timeline/:id");
*/
export default mediaRoutes;

/*
/timeline
POST /timeline (cria timeline)
DELETE /timeline/:id (remove timeline)
PUT(PATCH) /timeline/:id (modifica timeline)
GET /timeline/:id (retorna a timeline pelo id)
*/
