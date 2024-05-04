"use strict";

import { ResponseBody } from "../helpers";
import RoutesListModel from "../models/RoutesList";

const PayoutsController = {
  createRoute,
  allRoutes,
  insertAll,
};
export default PayoutsController;

async function createRoute(request, response, next) {
  const { body } = request;
  const data = await RoutesListModel.create(body);
  const responseBody = new ResponseBody(200, "Added a route", data);
  response.body = responseBody;
  next();
}

async function allRoutes(request, response, next) {
  const data = await RoutesListModel.all();
  const responseBody = new ResponseBody(200, "Fetched all routes", data);
  response.body = responseBody;
  next();
}

async function insertAll(request, response, next) {
  const { body } = request;
  const data = await RoutesListModel.insertAll(body);
  const responseBody = new ResponseBody(200, "Inserted all Routes", data);
  response.body = responseBody;
  next();
}
