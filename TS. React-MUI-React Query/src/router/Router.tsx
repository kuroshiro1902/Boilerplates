import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      // children: [
      //   {
      //     path: "contact",
      //     element: <Contact />,
      //   },
      //   {
      //     path: "about",
      //     lazy: () => import("./pages/About"),
      //   },
      // ],
      // errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}
