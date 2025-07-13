ALTER TABLE "memory" ALTER COLUMN "embedding" SET DATA TYPE vector(768);--> statement-breakpoint
ALTER TABLE "memory" ADD COLUMN "is_core" boolean DEFAULT false NOT NULL;