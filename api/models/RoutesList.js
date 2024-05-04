"use strict";

import { CustomError } from "../helpers";
import RoutesList from "../schemas/RoutesList";

const RoutesListModel = {
  create,
  all,
  insertAll,
};

export default RoutesListModel;

async function create(body) {
  try {
    const foundRoute = await RoutesList.findOne({ routeName: body.routeName });
    if (!foundRoute) {
      const allRoutes = await RoutesList.find({});
      body.routeId = allRoutes.length + 1;
      const route = new RoutesList(body);
      const data = await route.save();
      return data;
    } else {
      throw new CustomError("Route already exists.");
    }
  } catch (error) {
    throw new CustomError(error);
  }
}

async function all(body) {
  try {
    const allRoutes = await RoutesList.find({});
    return allRoutes;
  } catch (error) {
    throw new CustomError(error);
  }
}

async function insertAll(body) {
  const { routesToInsert } = body;
  try {
    for (let i = 0; i < routesToInsert.length; i++) {
      const foundRoute = await RoutesList.findOne({
        routeName: routesToInsert[i].routeName,
      });
      if (!foundRoute) {
        const allRoutes = await RoutesList.find({});
        routesToInsert[i].routeId = allRoutes.length + 1;
        const route = new RoutesList(routesToInsert[i]);
        await route.save();
      }
    }
    return "Inserted all the Routes Successfully.";
  } catch (error) {
    throw new CustomError(error);
  }
}
