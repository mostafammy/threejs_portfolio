// validationSchema.ts
import {z} from "zod";

const contactFormSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters long")
        .max(50, "Name cannot exceed 50 characters")
        .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

    email: z
        .string()
        .email("Invalid email address")
        .max(100, "Email too long"),

    message: z
        .string()
        .min(5, "Message must be at least 5 characters")
        .max(500, "Message is too long")
        .refine(
            (msg) => /^[^<>]*$/.test(msg),
            "Message cannot contain angle brackets or script tags"
        ),
});

export default contactFormSchema;
