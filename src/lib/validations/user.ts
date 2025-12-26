import { z } from "zod";

export const userRegistrationSchema = z.object({
  name: z.string().min(2, "Name kam se kam 2 characters ka hona chahiye"),
  username: z
    .string()
    .min(3, "Username 3 characters se bada hona chahiye")
    .toLowerCase(),
  email: z.string().email("Sahi email address dalein"),
  password: z
    .string()
    .min(8, "Password kam se kam 8 characters ka ho")
    .regex(/[a-z]/, "Ek lowercase letter zaroori hai")
    .regex(/[A-Z]/, "Ek uppercase letter zaroori hai")
    .regex(/[0-9]/, "Ek number zaroori hai")
    .regex(/[^a-zA-Z0-9]/, "Ek special character (@, #, $, etc.) zaroori hai"),
});
