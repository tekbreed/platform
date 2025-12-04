import groq from "groq"

export const homePageQuery = groq`*[_type == "homePage"][0] {
  latestFeature,
  features[] {
    icon,
    name,
    released,
    description
  }
}`
