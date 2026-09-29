import z from "zod";

export const booleanSettingSchema = z
    .boolean()
    .or(z.enum(["true", "false"]).transform((arg) => arg === "true"));
