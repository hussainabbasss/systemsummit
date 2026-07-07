"use server";

import { validateWebsiteRequest, type FormState } from "@/lib/validation";
import { persistLead } from "@/lib/leads";

/**
 * Server action for the Get-a-Website form. Validates with the shared rules
 * (the authority), persists via the lead seam, returns typed state for
 * useActionState. No UI logic here.
 */
export async function submitWebsiteRequest(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = validateWebsiteRequest({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    munName: String(formData.get("munName") ?? ""),
    phone: String(formData.get("phone") ?? ""),
  });

  if (!result.ok) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: result.fieldErrors,
    };
  }

  try {
    await persistLead(result.value);
  } catch {
    return {
      status: "error",
      message:
        "Something went wrong on our end. Please try again, or email us directly.",
    };
  }

  return {
    status: "success",
    message: "Thanks, your request is in. We'll be in touch shortly.",
  };
}
