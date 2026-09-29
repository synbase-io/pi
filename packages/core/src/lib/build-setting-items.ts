import { Input, type SettingItem } from "@earendil-works/pi-tui";
import { isBoolean, isNumber, isString } from "radashi";
import z from "zod";
import { getSettings } from "@/lib/get-settings";

export async function buildSettingItems(
    fileName: string,
    schema: z.ZodObject,
): Promise<SettingItem[]> {
    const settingItems: SettingItem[] = [];

    const settings = await getSettings(fileName, schema);

    for (const [fieldName, field] of Object.entries(schema.shape)) {
        const fieldSchema: z.ZodType =
            field instanceof z.ZodDefault ? field.unwrap() : field;
        const fieldMeta = fieldSchema.meta();
        const fieldValue = settings[fieldName];

        const id = fieldName;
        const label = fieldMeta?.title ?? fieldName;
        const description = fieldMeta?.description;

        if (isString(fieldValue) && fieldSchema instanceof z.ZodEnum) {
            settingItems.push({
                id,
                label,
                description,
                currentValue: isString(fieldValue) ? fieldValue : "",
                values: fieldSchema.options.map(String),
            });

            continue;
        }

        if (isString(fieldValue)) {
            settingItems.push({
                id,
                label,
                description,
                currentValue: fieldValue,
                submenu: (currentValue, done) => {
                    const input = new Input();
                    input.setValue(currentValue);

                    input.onSubmit = (value) => done(value);
                    input.onEscape = () => done();

                    return input;
                },
            });

            continue;
        }

        if (isNumber(fieldValue)) {
            settingItems.push({
                id,
                label,
                description,
                currentValue: fieldValue.toString(),
                submenu: (currentValue, done) => {
                    const input = new Input();
                    input.setValue(currentValue);

                    input.onSubmit = (value) => done(value);
                    input.onEscape = () => done();

                    return input;
                },
            });

            continue;
        }

        if (isBoolean(fieldValue)) {
            settingItems.push({
                id,
                label,
                description,
                currentValue: fieldValue ? "true" : "false",
                values: ["true", "false"],
            });

            continue;
        }

        throw new Error(
            `Unsupported settings field "${fieldName}" in "${fileName}": ` +
                `expected string, number, boolean, or enum schema; received ${fieldSchema.def.type}.`,
        );
    }

    return settingItems;
}
