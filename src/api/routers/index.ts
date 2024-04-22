import express from "express";
import authenticationRoute from "./authentication.route";

const router = express.Router();

export default (): express.Router => {
  authenticationRoute(router);

  return router;
}