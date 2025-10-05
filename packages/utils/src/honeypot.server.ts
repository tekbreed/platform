import { StatusCodes } from "http-status-codes";
import { Honeypot, SpamError } from "remix-utils/honeypot/server";

export const honeypot = new Honeypot({
  // randomizeNameFieldName: false,
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
