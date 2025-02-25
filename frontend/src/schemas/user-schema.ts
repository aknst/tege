import { z } from "zod";
import { pbIdSchema } from "./pb-schema";

export const userSchema = z.object({
  id: pbIdSchema,
  avatar: z.string(),
  email: z.string().email("Invalid email"),
  name: z.string().min(2, "Too short").optional().or(z.literal("")),
  verified: z.boolean(),
});

export type User = z.infer<typeof userSchema>;
