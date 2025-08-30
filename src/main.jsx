import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
const queryClient = new QueryClient();
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
]);
createRoot(document.getElementById('root')).render(
 <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </QueryClientProvider>
)
