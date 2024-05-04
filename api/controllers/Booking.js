import { ResponseBody } from "../helpers";
import BookingModel from "../models/Booking";

const BookingController = {
  getAllBookingsAdmin,
};

export default BookingController;

async function getAllBookingsAdmin(request, response, next) {
  const { body } = request;
  const data = await BookingModel.getAllBookingsAdmin(body);
  const responseBody = new ResponseBody(201, "Fetched all bookings", data);
  response.body = responseBody;
  next();
}
