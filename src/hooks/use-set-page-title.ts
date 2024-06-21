import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export const useSetPageTitle = (title: string) => {
  const location = useLocation()

  useEffect(() => {
    document.title = title + " | Movie App"
  }, [location, title])
}
