import { useSetPageTitle } from "@/hooks/use-set-page-title"
import TrendingMovies from "@/routes/home/_components/trending/movies"

const Home = () => {
  useSetPageTitle("Home")
  return (
    <div className="space-y-32">
      <TrendingMovies />
    </div>
  )
}

export default Home
