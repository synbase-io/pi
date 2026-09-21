import { defineConfig } from "tsup";

export default defineConfig({
    clean: true,
    dts: true,
    entry: {
        extension: "src/extension.ts",
        index: "src/index.ts",
    },
    outDir: "dist",
    format: ["esm"],
    sourcemap: true,
    splitting: true,
    target: "node22",
});
