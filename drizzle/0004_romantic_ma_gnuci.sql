CREATE TABLE "core_memory" (
	"core_memory_id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"content" text NOT NULL,
	"core_memory_slot" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	CONSTRAINT "core_memory_slot_unique" UNIQUE("user_id","core_memory_slot"),
	CONSTRAINT "core_memory_slot_range" CHECK ("core_memory"."core_memory_slot" >= 1 AND "core_memory"."core_memory_slot" <= 10)
);
--> statement-breakpoint
ALTER TABLE "memory" DROP CONSTRAINT "unique_core_memory_slot";--> statement-breakpoint
ALTER TABLE "memory" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "memory" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "message" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "message" ADD COLUMN "expires_at" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "core_memory" ADD CONSTRAINT "core_memory_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "memory" DROP COLUMN "core_memory_slot";