import { join } from "node:path";
import { cwd } from "node:process";

export function getSettingsFilePath(fileName: string): string {
    if (!fileName.endsWith(".json")) {
        throw new TypeError(
            `Invalid settings file name: expected a name ending in ".json", received ${JSON.stringify(fileName)}`,
        );
    }

    return join(cwd(), ".pi", fileName);
}
