"use strict";

import { ResponseBody } from "../helpers";
import PromoModel from "../models/Promo";

const PromoController = {
  create,
  get,
  deletePromo,
  enableDisablePromo,
};

export default PromoController;

async function create(request, response, next) {
  const { body } = request;
  const data = await PromoModel.create(body);
  const responseBody = new ResponseBody(201, "Promo created", data);
  response.body = responseBody;
  next();
}

async function get(request, response, next) {
  const data = await PromoModel.get();
  const responseBody = new ResponseBody(200, "Fetched all active promos", data);
  response.body = responseBody;
  next();
}

async function deletePromo(request, response, next) {
  const { body } = request;
  const data = await PromoModel.deletePromo(body);
  const responseBody = new ResponseBody(201, "Promo deleted", data);
  response.body = responseBody;
  next();
}

async function enableDisablePromo(request, response, next) {
  const { body } = request;
  const data = await PromoModel.enableDisablePromo(body);
  const responseBody = new ResponseBody(201, "Promo Enabled / Disabled", data);
  response.body = responseBody;
  next();
}
