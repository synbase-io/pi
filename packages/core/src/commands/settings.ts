import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import type { SettingItem } from "@earendil-works/pi-tui";
import { SettingsList } from "@/components/settings-list";
import { buildSettingItems } from "@/lib/build-setting-items";
import { saveSetting } from "@/lib/save-setting";
import { testSettingsSchema } from "@/models/test-settings";

export function registerSettingsCommand(pi: ExtensionAPI) {
    pi.registerCommand("syn", {
        description: "Open settings menu for synbase.io extensions",
        handler: async (_args, ctx) => {
            if (ctx.mode !== "tui") {
                ctx.ui.notify("/syn requires `pi` to run in TUI mode", "error");
                return;
            }

            await ctx.ui.custom(async (tui, theme, _keybindings, done) => {
                const fileName = "test.json";
                const schema = testSettingsSchema;

                const items: SettingItem[] = await buildSettingItems(
                    fileName,
                    schema,
                );

                const settingsList = new SettingsList(tui, theme, {
                    items,
                    onChange: async (id, newValue) =>
                        await saveSetting(fileName, schema, id, newValue),
                    onCancel: () => {
                        done(undefined);
                    },
                    options: { enableSearch: true },
                });

                return settingsList;
            }, {});
        },
    });
}
