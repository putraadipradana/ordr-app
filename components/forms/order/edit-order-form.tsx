/* eslint-disable react/no-children-prop */
"use client";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui/drawer";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { Spinner } from "../../ui/spinner";
import { IconPlus } from "@tabler/icons-react";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { useForm } from "@tanstack/react-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { createOrder } from "@/server/order";
import { authClient } from "@/lib/auth-client";
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
