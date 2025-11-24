import * as React from "react";

import AppLayout from "@/components/app-layout";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getUsers } from "@/server/user";
import { BreadcrumbItem } from "@/types";

export const dynamic = "force-dynamic";

export default async function Page() {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Users",
      href: "/users",
    },
  ];

  const data = await getUsers();
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              <DataTable columns={columns} data={data} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
