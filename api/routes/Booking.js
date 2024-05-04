"use strict";

import Express from "express";

import { expressUtils } from "../helpers";
import BookingController from "../controllers/Booking";

const { getAllBookingsAdmin } = BookingController;

const { reqHandler, resHandler } = expressUtils;
const { extractHeaders, routeSanity, asyncWrapper } = reqHandler;
const { setHeaders } = resHandler;

const BookingRouter = new Express.Router();

BookingRouter.use(extractHeaders);

BookingRouter.get(
  "/get-all-bookings",
  routeSanity,
  asyncWrapper(getAllBookingsAdmin)
);

BookingRouter.use(setHeaders);

export default BookingRouter;
