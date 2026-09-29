import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { registerSettingsCommand } from "@/commands/settings";

export default async function extension(pi: ExtensionAPI): Promise<void> {
    registerSettingsCommand(pi);
}
