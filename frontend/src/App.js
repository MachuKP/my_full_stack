import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Event, { loader as eventLoader } from "./pages/Events";
import NewEvent from "./pages/NewEvent";
import EventDetail, {
  loader as eventDetailLoader,
  action as eventDetailAction,
} from "./pages/EventDetail";
import EditEvent from "./pages/EditEvent";
import Layout from "./UI/Layout";
import EventLayout from "./UI/EventLayout";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    id: "root",
    children: [
      { index: true, element: <Home /> },
      {
        path: "events",
        element: <EventLayout />,
        children: [
          { index: true, element: <Event />, loader: eventLoader },
          { path: "new", element: <NewEvent /> },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetail />,
                action: eventDetailAction,
              },
              { path: "edit", element: <EditEvent /> },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
