module.exports = {
  presets: [
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }],
    // "@babel/preset-typescript" // only if using TS
  ],
};
