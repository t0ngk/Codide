import { z } from "zod";

const User = z.object({
  username: z.string().min(4).max(20),
  displayName: z.string().min(4).max(20),
  password: z.string().min(8).max(100),
});

export default User;
