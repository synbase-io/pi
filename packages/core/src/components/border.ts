import type { Theme } from "@earendil-works/pi-coding-agent";
import type { Component } from "@earendil-works/pi-tui";
import { list } from "radashi";

export class Border implements Component {
    constructor(private readonly theme: Theme) {}

    public invalidate(): void {
        return;
    }

    public render(width: number): string[] {
        return [`${list(1, width, this.theme.fg("border", "─")).join("")}`];
    }
}
