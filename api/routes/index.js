"use strict";

import { CustomError, expressUtils, ResponseBody } from "../helpers";
import Admin from "../schemas/Admin";
import RoutesList from "../schemas/RoutesList";
import AuthRouter from "./Auth";
import BookingRouter from "./Booking";
import ContactRouter from "./Contact";
import HealthRouter from "./Health";
import MentorRouter from "./Mentor";
import PayoutsRouter from "./Payouts";
import PromoRouter from "./Promo";
import ReferralRouter from "./Referral";
import RoutesListRouter from "./RoutesList";
import TransactionRouter from "./Transactions";
import AdminRouter from "./Admin";
import UserRouter from "./User";
import UniversitiesRouter from "./Universities";
import CompaniesRouter from "./Companies";
import DigitalTwinRouter from "./DigitalTwin";

const { resHandler } = expressUtils;
const { handleResponse } = resHandler;

const Routes = [
  { path: "/health", router: HealthRouter },
  { path: "/admin/admins", router: AdminRouter },
  { path: "/admin/routes", router: RoutesListRouter },
  { path: "/admin/auth", router: AuthRouter },
  { path: "/admin/user", router: UserRouter },
  { path: "/admin/mentor", router: MentorRouter },
  { path: "/admin/booking", router: BookingRouter },
  { path: "/admin/promo", router: PromoRouter },
  { path: "/admin/referral", router: ReferralRouter },
  { path: "/admin/transactions", router: TransactionRouter },
  { path: "/admin/payouts", router: PayoutsRouter },
  { path: "/admin/contact", router: ContactRouter },
  { path: "/admin/universities", router: UniversitiesRouter },
  { path: "/admin/companies", router: CompaniesRouter },
  { path: "/admin/digital-twin", router: DigitalTwinRouter },
];

Routes.init = (app) => {
  if (!app || !app.use) {
    console.error(
      "[Error] Route Initialization Failed: app / app.use is undefined "
    );
    return process.exit(1);
  }

  app.use("*", async (request, response, next) => {
    const { originalUrl } = request;
    try {
      if (
        originalUrl === "/admin/auth/login" ||
        originalUrl === "/admin/auth/sign-up" ||
        originalUrl === "/admin/routes/create" ||
        originalUrl === "/admin/routes"
      )
        return next();

      const apiSecretKey = request.get("api-secret");
      if (!apiSecretKey) {
        throw new CustomError();
      }
      const admin = await Admin.findOne({ apiSecretKey: apiSecretKey });
      if (!admin) {
        throw new CustomError();
      }
      const routesAccessId = await RoutesList.findOne({
        routeName: originalUrl,
      });
      if (!routesAccessId) {
        throw new CustomError();
      }
      if (!admin.accessRoutes.includes(routesAccessId.routeId)) {
        throw new CustomError();
      }
      next();
    } catch (err) {
      response.body = new CustomError({
        statusCode: 403,
        message: "Forbidden",
        code: "SIMPLICLARIFY_AUTH_04",
      });
      next();
    }
  });

  Routes.forEach((route) => app.use(route.path, route.router));

  // Final Route Pipeline
  app.use("*", (request, response, next) => {
    if (!request.isMatched) {
      const { method, originalUrl } = request;
      const message = `Cannot ${method} ${originalUrl}`;
      const error = new ResponseBody(404, message);
      response.body = error;
    }

    return handleResponse(request, response, next);
  });

  // Route Error Handler
  app.use((error, request, response, next) => {
    if (!error) {
      return process.nextTick(next);
    }
    console.warn(`[WARN] middleware ${error}`);
    const { statusCode = 500, message } = error;
    let responseBody;
    if (error.constructor.name === "ResponseBody") {
      responseBody = error;
    } else {
      responseBody = new ResponseBody(statusCode, message, error);
    }
    response.body = responseBody;
    return handleResponse(request, response, next);
  });
};
export default Routes;
