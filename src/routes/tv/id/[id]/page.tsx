import LoadingMediaSingle from "@/components/media-page-loader"
import TMDBImage from "@/components/tmdb-image"
import GenreBadge from "@/components/ui/genre-badge"
import { Separator } from "@/components/ui/separator"
import WatchListButton from "@/components/watchlist-button"
import { useSetPageTitle } from "@/hooks/use-set-page-title"
import { useTMDB } from "@/hooks/use-tmdb"
import { AppError } from "@/lib/models/app-error"
import { useQuery } from "@tanstack/react-query"
import { StarIcon } from "lucide-react"
import { useParams } from "react-router-dom"

const TVSingle = () => {
  const { id } = useParams<{ id: string }>()
  const parsedId = parseInt(id ?? "-1")
  const tmdb = useTMDB()
  const { data, isError, isLoading, isSuccess, error } = useQuery({
    queryKey: ["tv", id],
    queryFn: () => tmdb.tvShows.details(parsedId),
    staleTime: 1000 * 60 * 60, // 1 hour
  })
  useSetPageTitle(data?.name)

  if (isLoading) {
    return <LoadingMediaSingle statsNumber={5} />
  }

  if (isError) {
    throw new AppError(error)
  }

  if (isSuccess) {
    const movieStats = [
      {
        label: "Seasons",
        value: data.seasons.length,
      },
      {
        label: "Rating",
        value: `${data.vote_average.toFixed(2)}/10 (${data.vote_count} votes)`,
      },
      {
        label: "Production countries",
        value: data.production_countries
          .map((c) => c.name)
          .join(", ")
          .replace(/,/g, ", "),
      },
      {
        label: "Production companies",
        value: data.production_companies
          .map((c) => c.name)
          .join(", ")
          .replace(/,/g, ", "),
      },
      {
        label: "Status",
        value: data.status,
      },
    ]
    return (
      <section>
        <div className="relative mb-8">
          <div className="absolute right-0 top-0 bg-background/50 p-1 lg:p-2">
            <div className="flex h-9 w-9 flex-col items-center justify-center text-sm lg:h-12 lg:w-12">
              <StarIcon className="inline" height={"1.5em"} />
              {data.vote_average.toFixed(2)}
            </div>
          </div>
          <TMDBImage
            src={data.backdrop_path}
            tmdbSize="backdrop"
            alt={data.name + " backdrop"}
            className="aspect-video w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-8 xl:flex-row">
          <div className="max-xl:order-2 xl:max-w-sm xl:flex-1">
            <TMDBImage
              src={data.poster_path!}
              tmdbSize={"poster"}
              alt={data.name + " poster"}
              className={
                "mx-auto hidden aspect-[2/3] w-full max-w-sm xl:mx-0 xl:block"
              }
            />
            <dl className="space-y-8 py-8">
              {movieStats.map((stat, i) => (
                <div key={stat.label + i} className="flex flex-col gap-1">
                  <dt className="text-sm font-bold uppercase text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="text-base">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="space-y-4 xl:flex-1">
            <span className="inline-block uppercase text-foreground/80">
              {data.seasons.length > 1
                ? `${data.seasons.length} seasons`
                : `${data.seasons.length} season`}
            </span>
            <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl">
              {data.name}
            </h1>
            <span className="!mt-2 inline-block font-bold text-muted-foreground">
              {new Date(data.first_air_date).getFullYear()}
            </span>
            <div className="flex flex-wrap gap-2">
              {data.genres.map(
                (genre) =>
                  genre && (
                    <GenreBadge
                      key={genre.id}
                      genre={genre}
                      size="lg"
                      mediaType="tv"
                    />
                  ),
              )}
            </div>

            <p className="!mt-8 max-w-xl flex-1 text-foreground/80">
              {data.overview}
            </p>
            <div className="!mt-8">
              <WatchListButton
                className="border-primary"
                mediaType={"tv"}
                mediaId={data.id}
                withText
              ></WatchListButton>
            </div>
          </div>
          <Separator className="xl:hidden" />
        </div>
      </section>
    )
  }

  return null
}

export default TVSingle
