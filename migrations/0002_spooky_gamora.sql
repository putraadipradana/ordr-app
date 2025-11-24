ALTER TABLE "materials" RENAME COLUMN "status" TO "material_status";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "status" TO "order_status";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "priority" TO "order_priority";--> statement-breakpoint
DROP TYPE "public"."material_status";