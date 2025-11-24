"use client";
import { z } from "zod";
import { toast } from "sonner";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../../ui/drawer";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { schema } from "@/app/orders/columns";

export default function EditOrderForm({
  item,
  setIsEditAction,
}: {
  item: z.infer<typeof schema>;
  setIsEditAction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  async function onSubmit() {
    setIsEditAction(false);
    toast.success("Good job");
  }
  return (
    <DrawerContent>
      <DrawerHeader className="gap-1">
        <DrawerTitle>Edit order</DrawerTitle>
        <DrawerDescription>Edit Your Order</DrawerDescription>
      </DrawerHeader>
      <div className="flex flex-col gap-4 overflow-y-auto px-4">
        {item.orderNumber}
        <Separator className="sm:sr-only" />
      </div>
      <DrawerFooter>
        <Button type="submit" onClick={onSubmit} form="create-order-form">
          Save Changes
        </Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}
