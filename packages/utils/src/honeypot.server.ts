import { StatusCodes } from "http-status-codes";
import {
  Honeypot,
  SpamError,
  type HoneypotInputProps,
} from "remix-utils/honeypot/server";

export type { HoneypotInputProps };

export const honeypot = new Honeypot({
  nameFieldName: "name__confirm",
  validFromFieldName: "from__confirm",
  encryptionSeed: "somesecret",
});

export async function checkHoneypot(formData: FormData) {
  try {
    await honeypot.check(formData);
  } catch (error) {
    if (error instanceof SpamError) {
      throw new Response("Form not submitted properly", {
        status: StatusCodes.BAD_REQUEST,
      });
    }
    throw error;
  }
}
