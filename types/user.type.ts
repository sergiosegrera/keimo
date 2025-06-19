import { z } from "zod/v4";

export const User = z.object({
  user_id: z.string(),
  updated_at: z.coerce.date(),
  created_at: z.coerce.date(),
});

export type User = z.infer<typeof User>;
