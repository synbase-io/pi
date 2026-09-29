import { writeFile } from "node:fs/promises";
import { set } from "radashi";
import type z from "zod";
import { getSettings } from "@/lib/get-settings";
import { getSettingsFilePath } from "@/lib/get-settings-file-path";

export async function saveSetting(
    fileName: string,
    schema: z.ZodObject,
    id: string,
    value: string,
): Promise<void> {
    const filePath = getSettingsFilePath(fileName);
    const settings = await getSettings(fileName, schema);

    const newSettings = schema.parse(set(settings, id, value));

    await writeFile(filePath, JSON.stringify(newSettings), {
        encoding: "utf-8",
    });
}
