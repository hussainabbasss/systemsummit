export type WebsiteRequest = {
  name: string;
  email: string;
  munName: string;
  phone: string;
};

export type FieldErrors = Partial<Record<keyof WebsiteRequest, string>>;

export type FormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; fieldErrors?: FieldErrors };

export const FIELD_LABELS: Record<keyof WebsiteRequest, string> = {
  name: "Name",
  email: "Email",
  munName: "MUN name",
  phone: "Phone number",
};

// Deliberately lenient — real-world names, conferences, and phone formats vary.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

export type ValidationResult =
  | { ok: true; value: WebsiteRequest }
  | { ok: false; fieldErrors: FieldErrors };

/** Single source of truth — used by the client (instant UX) and the server (authority). */
export function validateWebsiteRequest(input: Partial<WebsiteRequest>): ValidationResult {
  const value: WebsiteRequest = {
    name: (input.name ?? "").trim(),
    email: (input.email ?? "").trim(),
    munName: (input.munName ?? "").trim(),
    phone: (input.phone ?? "").trim(),
  };
  const fieldErrors: FieldErrors = {};

  if (value.name.length < 2) {
    fieldErrors.name = "Please enter your name.";
  } else if (value.name.length > 80) {
    fieldErrors.name = "That name is a little long.";
  }

  if (!value.email) {
    fieldErrors.email = "We need an email to reply to.";
  } else if (!EMAIL_RE.test(value.email) || value.email.length > 120) {
    fieldErrors.email = "That doesn't look like a valid email.";
  }

  if (value.munName.length < 2) {
    fieldErrors.munName = "What's your conference called?";
  } else if (value.munName.length > 120) {
    fieldErrors.munName = "That name is a little long.";
  }

  if (!value.phone) {
    fieldErrors.phone = "A phone number helps us reach you fast.";
  } else if (!PHONE_RE.test(value.phone)) {
    fieldErrors.phone = "Use digits, spaces, and + ( ) - only.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }
  return { ok: true, value };
}

/** Validate a single field (client-side blur feedback). */
export function validateField(
  field: keyof WebsiteRequest,
  value: string,
): string | undefined {
  const result = validateWebsiteRequest({ [field]: value });
  return result.ok ? undefined : result.fieldErrors[field];
}
