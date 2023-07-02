import NextLink from "next/link";

import { ProjectAvatar } from "@/components/core";

type Props = {
  tags: BestOfJS.TagWithProjects[];
};
export const TagList = ({ tags }: Props) => {
  return (
    <div className="divide-y divide-dashed rounded-lg border">
      {tags.map((tag) => (
        <div key={tag.code} className="flex w-full justify-between">
          <div className="p-4">
            <NextLink
              href={`/projects?tags=${tag.code}`}
              className="text-orange-700 hover:text-orange-800 hover:underline dark:text-orange-300 dark:hover:text-orange-200"
            >
              {tag.name}
            </NextLink>
            <span className="ml-2">({tag.counter} projects)</span>
          </div>
          <div className="flex items-center gap-4 px-4">
            {tag.projects.map((project) => (
              <NextLink
                key={project.slug}
                href={`/projects/${project.slug}`}
                prefetch={false}
              >
                <ProjectAvatar project={project} size={32} />
              </NextLink>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
