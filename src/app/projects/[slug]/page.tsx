import { Suspense } from "react";
import { Metadata, ResolvingMetadata } from "next";

import { searchClient } from "@/app/backend";
import { getHotProjectsRequest } from "@/app/backend-search-requests";

import { ProjectDetailsGitHubCard } from "./project-details-github/github-card";
import { ProjectHeader } from "./project-header";
import { ReadmeCard } from "./project-readme/project-readme";
import "./project-readme/readme.css";
import { ProjectDetailsNpmCard } from "./project-details-npm/project-details-npm";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params;
  const project = await getData(slug);

  return {
    title: project.name,
  };
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { slug } = params;
  const project = await getData(slug);

  return (
    <div className="flex flex-col space-y-8">
      <ProjectHeader project={project} />
      <Suspense fallback={<>Loading details...</>}>
        {/* @ts-expect-error Server Component */}
        <ProjectDetailsCards project={project} />
      </Suspense>
      {/* @ts-expect-error Server Component */}
      <ReadmeCard project={project} />
    </div>
  );
}

async function ProjectDetailsCards({ project }: { project: BestOfJS.Project }) {
  const projectWithDetails = await getProjectDetails(project);
  return (
    <>
      <ProjectDetailsGitHubCard project={projectWithDetails} />
      {project.packageName && (
        <ProjectDetailsNpmCard project={projectWithDetails} />
      )}
    </>
  );
}

async function getData(projectSlug: string) {
  const project = await searchClient.getProjectBySlug(projectSlug);
  return project;
}

async function getProjectDetails(project: BestOfJS.Project) {
  const details = await fetchProjectDetailsData(project.full_name);
  return mergeProjectData(project, details);
}

async function fetchProjectDetailsData(fullName: string) {
  const url = `https://bestofjs-serverless.vercel.app/api/project-details?fullName=${fullName}`;
  return fetch(url).then((r) => r.json());
}

function mergeProjectData(project: BestOfJS.Project, details: any) {
  const {
    npm,
    bundle,
    packageSize,
    description,
    github: { contributor_count, commit_count, created_at },
    timeSeries,
  } = details;

  return {
    ...project,
    description,
    timeSeries,
    commit_count,
    contributor_count,
    created_at,
    npm,
    bundle,
    packageSize,
  } as BestOfJS.ProjectDetails;
}

export async function generateStaticParams() {
  const { projects: hotProjects } = await searchClient.findProjects(
    getHotProjectsRequest()
  );

  return hotProjects.map((project) => ({ slug: project.slug }));
}
