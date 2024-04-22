import express from "express";
import authenticationRoute from "./authentication";
import users from "./users";

const router = express.Router();

export default (): express.Router => {
  authenticationRoute(router);
  users(router);
  
  return router;
}