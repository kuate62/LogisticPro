import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import index from "./route/index.jsx";
import useAuthStore from "./store/useAuthStore";

function App() {
  const router = createBrowserRouter(index);

  useEffect(() => {
    useAuthStore.getState().initApp();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
