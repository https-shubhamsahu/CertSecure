"use server";

import { generateSecurityRules } from "@/ai/flows/generate-security-rules";
import { z } from "zod";

const FormSchema = z.object({
  roles: z.string().min(1, "At least one role is required."),
  certificateAccess: z.enum(["read", "write", "read-write"]),
});

export type State = {
  message?: string;
  rules?: string;
  issues?: string[];
};

export async function generateRulesAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    roles: formData.get("roles"),
    certificateAccess: formData.get("certificateAccess"),
  });

  if (!validatedFields.success) {
    return {
      issues: validatedFields.error.flatten().fieldErrors.roles,
      message: "Invalid form data.",
    };
  }

  const rolesArray = validatedFields.data.roles.split(",").map(role => role.trim()).filter(Boolean);
  
  if (rolesArray.length === 0) {
    return {
      issues: ["Please provide at least one valid role."],
      message: "Invalid roles."
    }
  }

  try {
    const result = await generateSecurityRules({
      roles: rolesArray,
      certificateAccess: validatedFields.data.certificateAccess,
    });
    return { rules: result.securityRules, message: "Successfully generated rules." };
  } catch {
    return { message: "Failed to generate security rules." };
  }
}
