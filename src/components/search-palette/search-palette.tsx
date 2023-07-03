"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { ProjectAvatar, StarTotal, TagIcon } from "../core";
import { useSearchState } from "../project-list/search-state";
import {
  filterProjectsByQuery,
  filterProjectsByTagsAndQuery,
} from "./find-projects";

export type SearchProps = {
  allProjects: BestOfJS.SearchIndexProject[];
  allTags: BestOfJS.Tag[];
};

export type SearchResults = {
  projects: BestOfJS.SearchIndexProject[];
  tags: BestOfJS.Tag[];
};

export function SearchPalette({ allProjects, allTags }: SearchProps) {
  const router = useRouter();
  const searchState = useSearchState();
  const [currentTagCodes, setCurrentTagCodes] = React.useState<string[]>(
    searchState.tags
  );

  // The search palette is mounted only once, we need to sync the tags when the URL changes
  React.useEffect(() => {
    setCurrentTagCodes(searchState.tags);
  }, [JSON.stringify(searchState.tags)]);

  const removeTag = (tagCode: string) =>
    setCurrentTagCodes((state) => state.filter((tag) => tag !== tagCode));
  const resetCurrentTags = () => setCurrentTagCodes(searchState.tags);

  const currentTags = currentTagCodes.map((tagCode) =>
    lookUpTag(tagCode, allTags)
  );
  const [open, setOpen] = React.useState(false);

  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const onOpenChange = (value: boolean) => {
    if (!value) {
      resetCurrentTags();
      setSearchQuery("");
    }
    setOpen(value);
  };

  // const [searchResults, setSearchResults] = React.useState<SearchResults>({
  //   projects: [],
  //   tags: [], //relevantTags.slice(0, 20),
  // });

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onValueChange = (value: string) => {
    // setSearchQuery({ projects, tags: [] });
    setSearchQuery(value);
  };

  const filteredProjects = searchQuery
    ? filterProjectsByTagsAndQuery(allProjects, currentTagCodes, searchQuery)
    : [];

  React.useEffect(() => {
    if (searchQuery.length < 3) return;
    if (filteredProjects.length === 0) return;
    const firstProject = filteredProjects[0];
    router.prefetch(`/projects/${firstProject.slug}`);
  }, [searchQuery, filteredProjects.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const popularTags = allTags.slice(0, 10);

  const filteredTags = searchQuery
    ? filterTagsByQuery(allTags, searchQuery)
    : popularTags;

  const onSelectProject = (slug: string) => {
    const url = `/projects/${slug}`;
    setOpen(false);
    router.push(url);
  };

  const onSelectTag = (tagCode: string) => {
    const url = `/projects?tags=${tagCode}`;
    setOpen(false);
    router.push(url);
  };

  const onSelectSearchForText = () => {
    const url = `/projects?query=${searchQuery}`;
    setOpen(false);
    router.push(url);
  };

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search in projects...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={onOpenChange}>
        <CommandInput
          placeholder="Search projects"
          onValueChange={onValueChange}
        />
        {currentTags.length > 0 && (
          <div className="flex flex-wrap gap-2 border-b p-4">
            {currentTags.map((tag) => {
              if (!tag) return null;
              return (
                <Badge key={tag.code} onClick={() => removeTag(tag.code)}>
                  {tag.name}
                  <XMarkIcon className="h-5 w-5" />
                </Badge>
              );
            })}
          </div>
        )}
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {searchQuery.length > 0 && (
            <CommandGroup heading="Projects">
              {filteredProjects.slice(0, 10).map((project) => (
                <CommandItem
                  key={project.slug}
                  value={project.slug}
                  onSelect={onSelectProject}
                >
                  <div className="grid w-full grid-cols-[32px_1fr_100px] items-center gap-4">
                    <div className="items-center justify-center">
                      <ProjectAvatar project={project} size={32} />
                    </div>
                    <div className="">{project.name}</div>
                    <div className="text-right">
                      <StarTotal value={project.stars} />
                    </div>
                  </div>
                </CommandItem>
              ))}
              {searchQuery.length > 2 && (
                <CommandItem
                  onSelect={onSelectSearchForText}
                  value={`search/${searchQuery}`}
                  className="grid w-full grid-cols-[32px_1fr] items-center gap-4"
                >
                  <div className="flex justify-center">
                    <MagnifyingGlassIcon className="" />
                  </div>
                  <div>
                    Search for
                    <span className="ml-1 font-bold italic">{searchQuery}</span>
                  </div>
                </CommandItem>
              )}
            </CommandGroup>
          )}
          <CommandGroup heading="Tags">
            {filteredTags.length > 0 ? (
              filteredTags.slice(0, 20).map((tag) => (
                <CommandItem
                  key={tag.code}
                  value={tag.code}
                  onSelect={onSelectTag}
                >
                  <div className="grid w-full grid-cols-[32px_1fr_100px] items-center gap-4">
                    <div className="flex w-full items-center justify-center">
                      <TagIcon />
                    </div>
                    <span className="">{tag.name}</span>
                    <div className="text-right text-muted-foreground">
                      {tag.counter}
                    </div>
                  </div>
                </CommandItem>
              ))
            ) : (
              <div className="py-6 text-center text-sm">No tag found</div>
            )}
          </CommandGroup>
          {/* <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup> */}
        </CommandList>
      </CommandDialog>
    </>
  );
}

function filterTagsByQuery(tags: BestOfJS.Tag[], searchQuery: string) {
  return tags.filter(
    (tag) =>
      tag.code.includes(searchQuery) ||
      tag.name.toLowerCase().includes(searchQuery)
  );
}

function lookUpTag(tagCode: string, allTags: BestOfJS.Tag[]) {
  return allTags.find((tag) => tag.code === tagCode);
}
