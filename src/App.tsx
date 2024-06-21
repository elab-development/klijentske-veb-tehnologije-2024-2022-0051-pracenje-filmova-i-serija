import { TMDBProvider } from "@/hooks/use-tmdb"
import Home from "@/routes/home/page"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Home />,
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
