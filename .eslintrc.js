/* eslint-disable */

module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
        indent: ["error", 4, { SwitchCase: 1 }],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double", { avoidEscape: true }],
        semi: ["error", "never"],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-extra-semi": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/ban-types": "off",
    },
}
