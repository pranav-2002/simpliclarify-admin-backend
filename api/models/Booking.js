"use strict";
import { CustomError } from "../helpers";

import Booking from "../schemas/_Booking";

const BookingModel = {
  getAllBookingsAdmin,
};

export default BookingModel;

async function getAllBookingsAdmin() {
  try {
    const response = await Booking.find({}).select();
    return response;
  } catch (error) {
    throw new CustomError(error);
  }
}
