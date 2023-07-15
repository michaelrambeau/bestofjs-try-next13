import { IoLogoNpm } from "react-icons/io";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CardBody, CardSection } from "@/components/core";

import { MonthlyDownloadsChart } from "./monthly-downloads-charts";

export function ProjectDetailsNpmCard({
  project,
}: {
  project: BestOfJS.ProjectDetails;
}) {
  const { packageName, npm } = project;
  return (
    <Card>
      <CardHeader className="border-b py-2">
        <div className="flex items-center gap-2">
          <IoLogoNpm className="translate-y-1 text-[44px] text-red-500" />
          Package on NPM
        </div>
      </CardHeader>
      <CardBody>
        <CardSection>
          <div className="flex items-center gap-2">
            <a
              href={`https://www.npmjs.com/package/${packageName}`}
              className="font-mono hover:underline"
            >
              {packageName}
              {/* <ExternalLinkIcon /> */}
            </a>
            <Badge className="">{npm.version}</Badge>
          </div>
        </CardSection>
        <CardSection>
          {/* @ts-expect-error Server Component */}
          <MonthlyDownloadsChart project={project} />
        </CardSection>
      </CardBody>
    </Card>
  );
}
