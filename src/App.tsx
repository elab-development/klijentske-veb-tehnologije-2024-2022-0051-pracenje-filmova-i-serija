import { TMDBProvider } from "@/hooks/use-tmdb"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Suspense, lazy } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout/layout"
import ErrorRoute from "./routes/error"
import NotFound from "./routes/not-found"
const Home = lazy(() => import("@/routes/home/page"))

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: "/",
        element: (
          <Suspense
            fallback={null}
            // fallback={<LoaderPinwheelIcon className="animate-spin h-12 w-12" />}
          >
            <Home />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TMDBProvider>
        <RouterProvider router={router} />
      </TMDBProvider>
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </QueryClientProvider>
  )
}

export default App
