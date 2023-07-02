import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { stateToQueryString } from "./navigation-state";
import { SortOptionKey, sortOrderOptionsByKey } from "./sort-order-options";

const sortOptionGroups: SortOptionKey[][] = [
  ["total"],
  ["daily", "weekly", "monthly", "yearly"],
  ["monthly-downloads"],
  // ["last-commit", "contributors"],
  // ["created", "newest"],
  // ["bookmark"],
];

type Props = { value: SortOptionKey; searchState: any };
export function ProjectSortOrderPicker({ value, searchState }: Props) {
  const currentOption = sortOrderOptionsByKey[value];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Sort: {currentOption?.label || ""}
          <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] divide-y">
        {sortOptionGroups.map((group, index) => {
          return (
            <DropdownMenuGroup key={index} className="py-2">
              {group.map((id) => {
                const item = sortOrderOptionsByKey[id];
                const nextState = { ...searchState, page: 1, sort: item.key };
                const queryString = stateToQueryString(nextState);
                const url = `/projects?` + queryString;

                return (
                  <DropdownMenuItem key={id} asChild>
                    <Link href={url}>{item.label}</Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

{
  /* <DropdownMenuLabel>My Account</DropdownMenuLabel>
<DropdownMenuSeparator />
<DropdownMenuGroup>
  <DropdownMenuItem>
    <User className="mr-2 h-4 w-4" />
    <span>Profile</span>
    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
  </DropdownMenuItem>
  <DropdownMenuItem>
    <CreditCard className="mr-2 h-4 w-4" />
    <span>Billing</span>
    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
  </DropdownMenuItem>
  <DropdownMenuItem>
    <Settings className="mr-2 h-4 w-4" />
    <span>Settings</span>
    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
  </DropdownMenuItem>
  <DropdownMenuItem>
    <Keyboard className="mr-2 h-4 w-4" />
    <span>Keyboard shortcuts</span>
    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
  </DropdownMenuItem>
</DropdownMenuGroup>
<DropdownMenuSeparator />
<DropdownMenuGroup>
  <DropdownMenuItem>
    <Users className="mr-2 h-4 w-4" />
    <span>Team</span>
  </DropdownMenuItem>
  <DropdownMenuSub>
    <DropdownMenuSubTrigger>
      <UserPlus className="mr-2 h-4 w-4" />
      <span>Invite users</span>
    </DropdownMenuSubTrigger>
    <DropdownMenuPortal>
      <DropdownMenuSubContent>
        <DropdownMenuItem>
          <Mail className="mr-2 h-4 w-4" />
          <span>Email</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MessageSquare className="mr-2 h-4 w-4" />
          <span>Message</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <PlusCircle className="mr-2 h-4 w-4" />
          <span>More...</span>
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  </DropdownMenuSub>
  <DropdownMenuItem>
    <Plus className="mr-2 h-4 w-4" />
    <span>New Team</span>
    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
  </DropdownMenuItem>
</DropdownMenuGroup>
<DropdownMenuSeparator />
<DropdownMenuItem>
  <Github className="mr-2 h-4 w-4" />
  <span>GitHub</span>
</DropdownMenuItem>
<DropdownMenuItem>
  <LifeBuoy className="mr-2 h-4 w-4" />
  <span>Support</span>
</DropdownMenuItem>
<DropdownMenuItem disabled>
  <Cloud className="mr-2 h-4 w-4" />
  <span>API</span>
</DropdownMenuItem>
<DropdownMenuSeparator />
<DropdownMenuItem>
  <LogOut className="mr-2 h-4 w-4" />
  <span>Log out</span>
  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
</DropdownMenuItem> */
}
