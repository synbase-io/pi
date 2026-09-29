import {
    getSettingsListTheme,
    type Theme,
} from "@earendil-works/pi-coding-agent";
import {
    type Component,
    Container,
    SettingsList as PiSettingsList,
    type SettingItem,
    type TUI,
} from "@earendil-works/pi-tui";
import type { SettingsListOptions } from "@earendil-works/pi-tui/dist/components/settings-list";
import { min } from "radashi";
import { Border } from "@/components/border";

interface SettingsListProps {
    items: SettingItem[];
    maxVisible?: number;
    options?: SettingsListOptions;
    onChange: (id: string, newValue: string) => void;
    onCancel: () => void;
}

export class SettingsList implements Component {
    private container: Container;
    private border: Border;
    private settingsList: PiSettingsList;

    constructor(
        private readonly tui: TUI,
        theme: Theme,
        props: SettingsListProps,
    ) {
        const {
            items,
            maxVisible = min([items.length + 2, 15]),
            options,
            onChange,
            onCancel,
        } = props;

        this.container = new Container();
        this.border = new Border(theme);
        this.settingsList = new PiSettingsList(
            items,
            maxVisible,
            getSettingsListTheme(),
            onChange,
            onCancel,
            options,
        );

        this.container.addChild(this.border);
        this.container.addChild(this.settingsList);
        this.container.addChild(this.border);
    }

    public handleInput(data: string): void {
        this.settingsList.handleInput(data);
        this.tui.requestRender();
    }

    public invalidate(): void {
        this.container.invalidate();
    }

    public render(width: number): string[] {
        return this.container.render(width);
    }
}
