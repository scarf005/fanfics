import type { CollectionEntry } from "astro:content"

type Sort = "asc" | "desc"

export const compareBy =
  <T>(f: (t: T) => number) =>
  (sort: Sort) =>
    sort === "asc" ? (a: T, b: T) => f(a) - f(b) : (a: T, b: T) => f(b) - f(a)

export const compareByPubdate = compareBy<CollectionEntry<"posts">>((post) =>
  post.data.pubDate.valueOf()
)
