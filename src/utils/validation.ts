import { z } from "zod";

interface User {
  userName: string;
  emailId: string;
  password: string;
}
export const Validation = (reqData: User) => {
  const requireBody = z.object({
    userName: z.string().min(3).max(10),
    emailId: z.string().min(5).max(20).email(),
    password: z.string().min(5).max(20),
  });

  const parseWithSuccess = requireBody.safeParse(reqData);
  return parseWithSuccess;
};
