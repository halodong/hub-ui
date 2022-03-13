import ts from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import postCss from "rollup-plugin-postcss";
export default {
  input: "./src/index.ts",
  output: [
    {
      name: "hubui",
      file: "dist/index.js",
      format: "umd",
    },
  ],
  plugins: [ts({ declaration: false, module: "ES6" }), resolve(), postCss()],
};
