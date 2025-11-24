import AppLayout from "@/components/app-layout";
import { getOrders } from "@/server/order";
import { BreadcrumbItem } from "@/types";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export const dynamic = "force-dynamic";

export default async function Page() {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Orders",
      href: "/orders",
    },
  ];

  const data = await getOrders();

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
