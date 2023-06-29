import React from "react";

import { Card } from "@/components/ui/card";

import {
  BottomPaginationControls,
  TopPaginationControls,
} from "../core/pagination/pagination-controls";
import { computePaginationState } from "../core/pagination/pagination-state";
import { ProjectSortOrderPicker } from "./project-sort-order-picker";
import { ProjectScore, ProjectTable } from "./project-table";
import { SortOptionKey } from "./sort-order-options";

type Props = {
  projects: BestOfJS.Project[];
  page: number;
  total: number;
  limit: number;
  sortOptionId: string;
  searchState: any;
  buildPageURL: any;
};
export const ProjectPaginatedList = ({
  projects,
  page,
  total,
  limit,
  sortOptionId,
  buildPageURL,
  searchState,
}: Props) => {
  const showPagination = total > limit;
  const showSortOptions = total > 1;
  const paginationState = computePaginationState({
    total,
    currentPageNumber: page,
    limit,
  });

  return (
    <Card>
      {(showSortOptions || showPagination) && (
        <div className="flex flex-col justify-between space-x-4 border-b p-4 md:flex-row">
          <div>
            {showSortOptions && (
              <ProjectSortOrderPicker
                value={sortOptionId as SortOptionKey}
                searchState={searchState}
              />
            )}
          </div>
          {showPagination && (
            <TopPaginationControls
              paginationState={paginationState}
              buildPageURL={buildPageURL}
            />
          )}
        </div>
      )}
      <ProjectTable
        projects={projects}
        buildPageURL={buildPageURL}
        metricsCell={(project) => (
          <ProjectScore project={project} sortOptionId={sortOptionId} />
        )}
        footer={
          <div className="flex justify-end">
            <BottomPaginationControls
              paginationState={paginationState}
              buildPageURL={buildPageURL}
            />
          </div>
        }
      />
    </Card>
  );
};

// function MyDropdown() {
//   return (
//     <Menu>
//       <Menu.Button>More</Menu.Button>
//       <Menu.Items>
//         <Menu.Item>
//           {({ active }) => (
//             <a
//               className={`${active && "bg-blue-500"}`}
//               href="/account-settings"
//             >
//               Account settings
//             </a>
//           )}
//         </Menu.Item>
//         <Menu.Item>
//           {({ active }) => (
//             <a
//               className={`${active && "bg-blue-500"}`}
//               href="/account-settings"
//             >
//               Documentation
//             </a>
//           )}
//         </Menu.Item>
//         <Menu.Item disabled>
//           <span className="opacity-75">Invite a friend (coming soon!)</span>
//         </Menu.Item>
//       </Menu.Items>
//     </Menu>
//   );
// }
