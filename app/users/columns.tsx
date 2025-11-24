"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, UserCog } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import z from "zod";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { ProfileDetailDrawer } from "@/components/profile-detail-drawer";
import { Drawer } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

export const schema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().nullable(),
  email: z.email(),
  role: z.string().nullable(),
  createdAt: z.date(),
});

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant="outline" className="py-1 [&>svg]:size-3.5">
        <UserCog />
        <span className="capitalize">{row.original.role}</span>
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const data = row.original;
      return <span>{format(new Date(data.createdAt), "dd MMMM, yyyy")}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TableAction item={row.original} />,
  },
];

function TableAction({ item }: { item: z.infer<typeof schema> }) {
  const isMobile = useIsMobile();
  const [openUser, setOpenUser] = useState(false);

  return (
    <>
      <Drawer
        direction={isMobile ? "bottom" : "right"}
        open={openUser}
        onOpenChange={setOpenUser}
      >
        <ProfileDetailDrawer item={item} />
      </Drawer>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setOpenUser(true)}>
            Detail
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
