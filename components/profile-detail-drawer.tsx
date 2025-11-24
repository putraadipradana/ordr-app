"use client";
import { schema } from "@/app/users/columns";
import { Button } from "@/components/ui/button";
import z from "zod";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

export function ProfileDetailDrawer({
  item,
}: {
  item: z.infer<typeof schema>;
}) {
  const initials = item.name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("");

  return (
    <DrawerContent>
      <DrawerHeader className="gap-1">
        <DrawerTitle className="sr-only">Profile detail</DrawerTitle>
        <DrawerDescription className="sr-only">
          Showing total visitors for the last 6 months
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex flex-col gap-4 overflow-y-auto px-4">
        <div className="flex mt-5">
          <Avatar className="size-20 rounded-full">
            <AvatarImage
              className="bg-muted"
              src={`${item.image}`}
              alt={item.name}
            />
            <AvatarFallback className="rounded-lg text-2xl">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col space-y-3 mt-5">
          <div className="space-x-2.5">
            <span className="text-lg font-semibold">{item.name}</span>
            {item.role === "admin" && (
              <Badge variant={"outline"} className="capitalize rounded-full">
                {item.role}
              </Badge>
            )}
          </div>
          <blockquote className="text-muted-foreground italic">
            &quot;After all,&quot; he said, &quot;everyone enjoys a good joke,
            so it&apos;s only fair that they should pay for the privilege.&quot;
          </blockquote>
        </div>
        <div className="grid grid-cols-2 py-4">
          <div className="flex items-center space-x-2">
            <span className="font-mono">600</span>
            <span className="text-sm text-muted-foreground">Orders</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-mono">20</span>
            <span className="text-sm text-muted-foreground">Customers</span>
          </div>
        </div>
        <Separator />
        <div className="py-4">
          <span className="font-medium text-sm">Recent order</span>
        </div>
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline">Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}
