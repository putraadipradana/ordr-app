export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface DataTableRowAction<TData> {
    row: Row<TData>;
    variant: "update" | "delete";
}