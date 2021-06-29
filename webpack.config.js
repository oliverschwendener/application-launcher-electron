const { join } = require("path");
const { VueLoaderPlugin } = require("vue-loader");

const isProductionBuild = process.env.NODE_ENV === "production";

const mode = isProductionBuild ? "production" : "development";
const devtool = isProductionBuild ? undefined : "source-map";

console.log(`Build mode: ${mode}`);

const entryPoints = {
    main: join(__dirname, "src", "main", "Main.ts"),
    preload: join(__dirname, "src", "common", "Preload.ts"),
    renderer: {
        mainWindow: join(__dirname, "src", "renderer", "MainRenderer.ts"),
        settingsWindow: join(__dirname, "src", "renderer", "SettingsRenderer.ts"),
    },
};

const targets = {
    main: "electron-main",
    preload: "electron-preload",
    renderer: "electron-renderer",
};

const baseConfig = {
    output: {
        filename: "[name].js",
        path: join(__dirname, "bundle"),
    },
    mode,
    devtool,
};

const mainConfig = {
    entry: {
        Main: entryPoints.main,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    target: targets.main,
};

const preloadConfig = {
    entry: {
        Preload: entryPoints.preload,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    target: targets.preload,
};

const rendererBaseConfig = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: ["file-loader"],
            },
            {
                test: /\.png$/,
                use: ["file-loader"],
            },
        ],
    },
    resolve: {
        alias: {
            vue: "@vue/runtime-dom",
        },
        extensions: [".ts", ".js"],
    },
    plugins: [new VueLoaderPlugin()],
    target: targets.renderer,
};

const mainRendererConfig = {
    entry: {
        MainRenderer: entryPoints.renderer.mainWindow,
    },
};

const settingsRendererConfig = {
    entry: {
        SettingsRenderer: entryPoints.renderer.settingsWindow,
    },
};

module.exports = [
    Object.assign({}, baseConfig, mainConfig),
    Object.assign({}, baseConfig, preloadConfig),
    Object.assign({}, baseConfig, rendererBaseConfig, mainRendererConfig),
    Object.assign({}, baseConfig, rendererBaseConfig, settingsRendererConfig),
];
