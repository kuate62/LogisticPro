import { createBrowserRouter, RouterProvider } from "react-router-dom";
import index from "./route/index.jsx";

function App() {
  const router = createBrowserRouter(index);
  return <RouterProvider router={router} />;
}

export default App;
