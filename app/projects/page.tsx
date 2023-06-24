import NextLink from "next/link";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";

import { badgeVariants } from "@/components/ui/badge";
import { TagIcon } from "@/components/core";
import { PageHeading } from "@/components/core/typography";
import {
  ProjectPageSearchParams,
  parseSearchParams,
  stateToQueryString,
} from "@/components/project-list/navigation-state";
import { ProjectPaginatedList } from "@/components/project-list/project-paginated-list";
import {
  SortOption,
  SortOptionKey,
  sortOrderOptionsByKey,
} from "@/components/project-list/sort-order-options";
import { SearchPageTagPicker, TagPicker } from "@/components/tags/tag-picker";

// import { TagPickerPopover } from "@/components/tag-picker/tag-picker-popover"

import { searchClient } from "../backend";
import {
  ProjectSearchQuery,
  SearchQueryUpdater,
  SearchUrlBuilder,
} from "./types";

// needed when running the built app (`start` command)
// otherwise Next.js always renders the same page, ignoring the query string parameters!
// export const revalidate = 0;
export const dynamic = "force-dynamic";

type ProjectsPageData = {
  projects: BestOfJS.Project[];
  total: number;
  page: number;
  limit: number;
  tags: string[];
  selectedTags: BestOfJS.Tag[];
  relevantTags: BestOfJS.Tag[];
  allTags: BestOfJS.Tag[];
  sortOptionId: SortOptionKey;
};

type PageProps = {
  searchParams: ProjectPageSearchParams;
};
export default async function Projects({ searchParams }: PageProps) {
  const { projects, page, limit, total, sortOptionId, selectedTags, allTags } =
    await getData(searchParams);

  const searchState = parseSearchParams(searchParams);

  const buildPageURL = (updater: SearchQueryUpdater<ProjectSearchQuery>) => {
    const nextState = updater(searchState);
    const queryString = stateToQueryString(nextState);
    return "/projects?" + queryString;
  };

  return (
    <>
      <ProjectPageHeader
        searchState={searchState}
        tags={selectedTags}
        total={total}
      />
      <CurrentTags
        tags={selectedTags}
        buildPageURL={buildPageURL}
        allTags={allTags}
      />
      <ProjectPaginatedList
        projects={projects}
        page={page}
        limit={limit}
        total={total}
        sortOptionId={sortOptionId}
        searchState={searchState}
        buildPageURL={buildPageURL}
      />
    </>
  );
}

function ProjectPageHeader({
  tags,
  searchState,
  total,
}: {
  tags: BestOfJS.Tag[];
  searchState: ProjectSearchQuery;
  total: number;
}) {
  const { query } = searchState;
  const showingAllProjects = query === "" && tags.length === 0;
  if (showingAllProjects) {
    return (
      <PageHeading
        title={
          <>
            All Projects <ShowNumberOfProject count={total} />
          </>
        }
      />
    );
  }
  if (query === "") {
    return (
      <PageHeading
        title={
          <>
            {tags.map((tag) => tag.name).join(" + ")}{" "}
            <ShowNumberOfProject count={total} />
          </>
        }
        icon={<TagIcon size={32} />}
      />
    );
  }
  return <PageHeading title="Search results" />;
}

function ShowNumberOfProject({ count }: { count: number }) {
  return (
    <>
      <span className="px-1 text-yellow-500">•</span>
      {count === 1 ? "One project" : `${count} projects`}
    </>
  );
}

function CurrentTags({
  tags,
  buildPageURL,
  allTags,
}: {
  tags: BestOfJS.Tag[];
  buildPageURL: SearchUrlBuilder<ProjectSearchQuery>;
  allTags: BestOfJS.Tag[];
}) {
  const currentTagCodes = tags.map((tag) => tag.code);
  const tagsToAdd = allTags.filter(
    (tag) => !currentTagCodes.includes(tag.code)
  );
  return (
    <div className="mb-4 inline-flex gap-2">
      {/* <TagPickerPopover allTags={tagsToAdd} /> */}
      <SearchPageTagPicker
        allTags={allTags}
        currentTagCodes={currentTagCodes}
      />
      {tags.map((tag) => {
        const url = buildPageURL((state) => ({
          ...state,
          page: 1,
          tags: state.tags.filter((tagCode) => tagCode !== tag.code),
        }));
        return (
          <NextLink
            key={tag.code}
            href={url}
            className={badgeVariants({ variant: "default" })}
          >
            {tag.name}
            <XMarkIcon className="h-5 w-5" />
          </NextLink>
        );
      })}
      {/* <button className="btn btn-outline btn-warning gap-2 normal-case">
        Add tag
        <PlusIcon className="h-5 w-5" />
      </button> */}
    </div>
  );
}

async function getData(
  searchParams: ProjectPageSearchParams
): Promise<ProjectsPageData> {
  const { tags, sort, page, limit, query } = parseSearchParams(searchParams);
  const sortOption = getSortOption(sort);

  const { projects, selectedTags, relevantTags, total } =
    await searchClient.findProjects({
      criteria: tags.length > 0 ? { tags: { $all: tags } } : {},
      query,
      sort: sortOption.sort,
      skip: limit * (page - 1),
      limit,
    });

  const { tags: allTags } = await searchClient.findTags({});

  return {
    projects,
    total,
    page,
    limit,
    sortOptionId: sortOption.key,
    selectedTags,
    relevantTags,
    tags,
    allTags,
  };
}

function getSortOption(sortKey: string): SortOption {
  const defaultOption = sortOrderOptionsByKey.daily;
  if (!sortKey) return defaultOption;
  return sortOrderOptionsByKey[sortKey as SortOptionKey] || defaultOption;
}
