import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

type ExtensionRegistration = (pi: ExtensionAPI) => void | Promise<void>;

// Keep feature registration in this package-level factory so Pi loads one extension.
const registrations: readonly ExtensionRegistration[] = [];

export default async function extension(pi: ExtensionAPI): Promise<void> {
    for (const register of registrations) {
        await register(pi);
    }
}
