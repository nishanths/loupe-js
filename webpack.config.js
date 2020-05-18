// This is a really good resource:
// https://marcobotto.com/blog/compiling-and-bundling-typescript-libraries-with-webpack/

module.exports = {
  entry: {
    index: "./src/index.ts",
  },
  output: {
    filename: "[name].window.js",
    path: __dirname + "/dist",
    libraryTarget: "window",
    library: "loupe",
    umdNamedDefine: true,
  },
  optimization: { minimize: false },
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json", ".scss"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader", exclude: /node_modules/ },
    ]
  }
};
