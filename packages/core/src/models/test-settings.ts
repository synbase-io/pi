import z from "zod";
import { booleanSettingSchema } from "@/models/boolean-setting";

export const testSettingsSchema = z.object({
    testString: z.coerce
        .string()
        .meta({
            title: "Test String",
            description: "This is a string with free input",
        })
        .default("default value"),
    testNumber: z.coerce
        .number()
        .meta({
            title: "Test Number",
            description: "This is a number field",
        })
        .default(3),
    testEnum: z
        .enum(["state1", "state2", "state3"])
        .meta({
            title: "Test Enum",
            description: "This is a string without free input",
        })
        .default("state1"),
    testBoolean: booleanSettingSchema
        .meta({
            title: "Test Boolean",
            description: "Can be enabled or disabled",
        })
        .default(false),
});

export type TestSettings = z.output<typeof testSettingsSchema>;
