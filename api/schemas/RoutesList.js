"use strict";
import mongoose from "mongoose";

const routesListSchema = mongoose.Schema(
  {
    routeId: { type: Number, default: 0 },
    routeName: { type: String, required: true },
    routeDescription: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at" } }
);

const RoutesList = new mongoose.model("RoutesList", routesListSchema);

export default RoutesList;
