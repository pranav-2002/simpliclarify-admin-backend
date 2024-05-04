"use strict";

import { CustomError } from "../helpers";
import Promo from "../schemas/_Promo";

const PromoModel = {
  create,
  get,
  deletePromo,
  enableDisablePromo,
};

export default PromoModel;

async function create(body) {
  try {
    const { promoCode } = body;
    console.log(promoCode);
    const foundPromo = await Promo.findOne({ promoCode });
    console.log("check", foundPromo);
    if (!foundPromo) {
      const promo = new Promo(body);
      const data = await promo.save();
      return data;
    } else {
      throw new CustomError("Offer is already generated with this promoCode");
    }
  } catch (error) {
    throw new CustomError(error);
  }
}

async function get() {
  try {
    const promos = await Promo.find({});
    return promos;
  } catch (error) {
    throw new CustomError(error);
  }
}

async function deletePromo(body) {
  try {
    const promos = await Promo.find({ promoCode: body.promoCode }).deleteOne();
    return promos;
  } catch (error) {
    throw new CustomError(error);
  }
}

async function enableDisablePromo(body) {
  try {
    const promo = await Promo.findOne({ promoCode: body.promoCode });
    promo.promoActive = !promo.promoActive;
    promo.save();
    return promo;
  } catch (error) {
    throw new CustomError(error);
  }
}
