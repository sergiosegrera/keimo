ALTER TABLE "memory" ADD COLUMN "core_memory_slot" integer;--> statement-breakpoint
ALTER TABLE "memory" DROP COLUMN "is_core";--> statement-breakpoint
ALTER TABLE "memory" ADD CONSTRAINT "unique_core_memory_slot" UNIQUE NULLS NOT DISTINCT("user_id","core_memory_slot");