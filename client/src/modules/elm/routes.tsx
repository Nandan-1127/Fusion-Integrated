
import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";

const LeaveApplicationsPage = lazy(
  () => import("./pages/LeaveApplicationsPage")
);

export const routes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="applications" replace />,
  },
  {
    path: "applications",
    element: <LeaveApplicationsPage />,
  },
];
