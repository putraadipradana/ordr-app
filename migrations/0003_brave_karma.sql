ALTER TABLE "materials" ADD CONSTRAINT "materials_number_unique" UNIQUE("number");--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_order_number_unique" UNIQUE("order_number");