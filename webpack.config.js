module.exports = {
  entry: {
    index: "./src/index.ts",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist"
  },
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json", ".scss"]
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.s?css$/,
        use: [
          "style-loader/url",
          { loader: "file-loader", options: { name: "[name].css" } },
          "sass-loader",
        ],
      },
    ]
  }
};
