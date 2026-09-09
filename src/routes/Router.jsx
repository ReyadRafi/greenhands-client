import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UpcomingEvents from "../pages/UpcomingEvents";
import EventDetails from "../pages/EventDetails";
import CreateEvent from "../pages/CreateEvent";
import ManageEvents from "../pages/ManageEvents";
import JoinedEvents from "../pages/JoinedEvents";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "upcoming-events", element: <UpcomingEvents /> },
      { path: "events/:id", element: <EventDetails /> },
      {
        path: "create-event",
        element: (
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-events",
        element: (
          <PrivateRoute>
            <ManageEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "joined-events",
        element: (
          <PrivateRoute>
            <JoinedEvents />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;