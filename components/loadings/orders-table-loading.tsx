import { Skeleton } from "../ui/skeleton";

export default function OrdersTableLoading() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:gap-0 gap-2">
              <Skeleton className="w-full h-8 sm:max-w-95" />
              <Skeleton className="w-full h-8 sm:max-w-30" />
            </div>
            <Skeleton className="w-full h-36" />
            <div className="py-4">
              <div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
                <div className="flex-1 whitespace-nowrap text-muted-foreground text-sm">
                  <Skeleton className="w-20 h-3" />
                </div>
                <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="w-30 h-3" />
                    <Skeleton className="h-8 w-18 data-size:h-8" />
                  </div>
                  <div className="flex items-center justify-center font-medium text-sm">
                    <Skeleton className="w-20 h-3" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Skeleton className="hidden size-8 lg:flex" />
                    <Skeleton className="size-8 lg:flex" />
                    <Skeleton className="size-8 lg:flex" />
                    <Skeleton className="hidden size-8 lg:flex" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
