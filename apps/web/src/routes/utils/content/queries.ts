import groq from "groq";

export const homePageQuery = groq`*[_type == "homePage"][0] {
  "id": _id,
  latestFeature,
  "features": features[]->{
    "id": _id,
    icon,
    name,
    published,
    description
  },
}`;
