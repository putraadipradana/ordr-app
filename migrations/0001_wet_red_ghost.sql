CREATE TYPE "public"."material_status" AS ENUM('Suplied', 'Order');--> statement-breakpoint
CREATE TYPE "public"."order_priority" AS ENUM('Low', 'Medium', 'High');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('Done', 'In Progress', 'Not Started');--> statement-breakpoint
CREATE TABLE "materials" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" text NOT NULL,
	"number" text NOT NULL,
	"name" text NOT NULL,
	"status" "material_status" DEFAULT 'Order' NOT NULL,
	"qty" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"order_number" text NOT NULL,
	"name" text NOT NULL,
	"status" "order_status" DEFAULT 'Not Started' NOT NULL,
	"priority" "order_priority" DEFAULT 'Low' NOT NULL,
	"amount" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "materials" ADD CONSTRAINT "materials_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;