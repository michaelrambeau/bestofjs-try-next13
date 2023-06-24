import { SearchPalette } from "@/components/search-palette/search-palette";

import { searchClient } from "./backend";

export async function SearchContainer() {
  const { allTags, allProjects } = await getData();

  return <SearchPalette allProjects={allProjects} allTags={allTags} />;
}

async function getData() {
  const { tags: allTags } = await searchClient.findTags({
    sort: { counter: -1 },
  });
  const allProjects = await searchClient.getSearchIndex();
  return { allTags, allProjects };
}
