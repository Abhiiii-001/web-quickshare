import { ErrorMessage, CommonConstants } from "@/constants";
import { z } from "zod";

const { DOWNLOAD_LIMIT, EXPIRIES_DURATION, PASSWORD_LENGTH } = CommonConstants;
export const sendFileSchema = z
  .object({
    expiry: z.enum(EXPIRIES_DURATION as unknown as string[]),
    downloads: z.number().min(DOWNLOAD_LIMIT.MIN).max(DOWNLOAD_LIMIT.MAX),
    usePassword: z.boolean(),
    password: z.string().optional(),
  })
  .refine(
    (data) => {
      if (
        data.usePassword &&
        (!data.password || data.password.length < PASSWORD_LENGTH.MIN)
      ) {
        return false;
      }
      return true;
    },
    {
      message: ErrorMessage.PASSWORD_MIN_LENGTH(PASSWORD_LENGTH.MIN),
      path: ["password"],
    }
  );

export const receiveFileSchema = z.object({
  receiveCode: z
    .string()
    .length(
      PASSWORD_LENGTH.MIN,
      ErrorMessage.PASSWORD_MIN_LENGTH(PASSWORD_LENGTH.MIN)
    ),
  receiveUsePassword: z.boolean(),
  receivePassword: z.string().optional(),
});
