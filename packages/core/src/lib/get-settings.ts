import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import type z from "zod";
import { getSettingsFilePath } from "@/lib/get-settings-file-path";

export async function getSettings(fileName: string, schema: z.ZodObject) {
    const filePath = getSettingsFilePath(fileName);

    if (!existsSync(filePath)) {
        const { success, data: defaultSettings } = schema.safeParse({});

        if (!success) {
            throw new Error(
                `Cannot initialize settings file ${JSON.stringify(fileName)}: ` +
                    "the schema must parse an empty object; provide defaults for all required settings.",
            );
        }

        await writeFile(filePath, JSON.stringify(defaultSettings), {
            encoding: "utf-8",
        });
    }

    const fileContent = await readFile(filePath, { encoding: "utf-8" });

    const settings = schema.parse(JSON.parse(fileContent));

    // TODO: We have to fix the settings file if it doesn't parse correctly

    return settings;
}
