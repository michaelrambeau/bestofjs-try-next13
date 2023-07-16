import React from "react";
import formatUrl from "@/helpers/url";
import { GoHome, GoMarkGithub } from "react-icons/go";
import { ImNpm } from "react-icons/im";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ProjectAvatar } from "@/components/core";
import { ProjectTagGroup } from "@/components/tags/project-tag";

type Props = { project: BestOfJS.Project };
export const ProjectHeader = ({ project }: Props) => {
  const { full_name, packageName, repository, url } = project;

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:divide-x sm:divide-dashed">
      <div className="flex min-h-[120px] grow items-center">
        <div className="pr-4">
          <ProjectAvatar project={project} size={75} />
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="text-4xl">{project.name}</h2>
          <div>{project.description}</div>
          <div>
            <ProjectTagGroup tags={project.tags} />
          </div>
        </div>
      </div>
      <aside className="flex flex-col justify-center space-y-2 sm:w-[280px] sm:pl-4">
        <ButtonLink href={repository} icon={<GoMarkGithub size={20} />}>
          {full_name}
        </ButtonLink>
        {url && (
          <ButtonLink href={url} icon={<GoHome size={20} />}>
            {formatUrl(url)}
          </ButtonLink>
        )}
        {packageName && (
          <ButtonLink
            href={`https://www.npmjs.com/package/${packageName}`}
            icon={<ImNpm className="text-[20px]" />}
          >
            {packageName}
          </ButtonLink>
        )}
      </aside>
    </div>
  );
};

const ButtonLink = ({
  href,
  icon,
  children,
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) => (
  <a
    href={href}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "relative",
      "justify-start"
    )}
  >
    <span className="absolute left-4">{icon}</span>
    <span className="overflow-hidden text-ellipsis whitespace-nowrap pl-[36px] text-base">
      {children}
    </span>
  </a>
);

//"btn-outline btn relative w-full justify-start normal-case"
