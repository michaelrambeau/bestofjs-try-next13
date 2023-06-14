import NextLink from "next/link";
import { GoFlame, GoGift } from "react-icons/go";

import { SectionHeading } from "@/components/core/section";
import {
  ProjectScore,
  ProjectTable,
} from "@/components/project-list/project-table";

import { searchClient } from "./backend";
import {
  getHotProjectsRequest,
  getLatestProjects,
} from "./backend-search-requests";

export default async function IndexPage() {
  const { hotProjects, newestProjects } = await getData();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          The best of JS and friends
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          A place to find the best open source related to the web platform: JS,
          TypeScript, CSS, Node.js, Deno, Bun...
        </p>
      </div>

      <HotProjectList projects={hotProjects} />

      <NewestProjectList projects={newestProjects} />
    </div>
  );
}

function HotProjectList({ projects }: { projects: BestOfJS.Project[] }) {
  return (
    <div>
      <SectionHeading
        icon={<GoFlame fontSize={32} />}
        title="Hot Projects"
        subtitle={
          <>
            by number of stars added <b>the last 24 hours</b>
          </>
        }
      />
      <ProjectTable
        projects={projects}
        showDetails={false}
        metricsCell={(project) => (
          <ProjectScore project={project} sortOptionId="daily" />
        )}
        footer={
          <NextLink
            href={`/projects?sort=daily`}
            passHref
            className="btn btn-outline"
          >
            View full rankings »
          </NextLink>
        }
      />
    </div>
  );
}

function NewestProjectList({ projects }: { projects: BestOfJS.Project[] }) {
  return (
    <div>
      <SectionHeading
        icon={<GoGift fontSize={32} />}
        title="Recently Added Projects"
        subtitle={
          <>
            Latest additions to <i>Best of JS</i>
          </>
        }
      />
      <ProjectTable
        projects={projects}
        showDetails={false}
        metricsCell={(project) => (
          <ProjectScore project={project} sortOptionId="total" />
        )}
        footer={
          <NextLink
            href={`/projects?sort=newest`}
            passHref
            className="btn btn-outline"
          >
            View more »
          </NextLink>
        }
      />
    </div>
  );
}

async function getData() {
  const { projects: hotProjects } = await searchClient.findProjects(
    getHotProjectsRequest()
  );
  const { projects: newestProjects } = await searchClient.findProjects(
    getLatestProjects()
  );
  return { hotProjects, newestProjects };
}
