module.exports.babelLoaderConfig = ({ latestBuild }) => {
  if (latestBuild === undefined) {
    throw Error("latestBuild not defined for babel loader config");
  }
  return {
    test: /\.m?js$/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          !latestBuild && [
            require("@babel/preset-env").default,
            { modules: false },
          ],
        ].filter(Boolean),
        plugins: [
          // Part of ES2018. Converts {...a, b: 2} to Object.assign({}, a, {b: 2})
          [
            "@babel/plugin-proposal-object-rest-spread",
            { loose: true, useBuiltIns: true },
          ],
          // Only support the syntax, Webpack will handle it.
          "@babel/syntax-dynamic-import",
          [
            require("@babel/plugin-proposal-decorators").default,
            { decoratorsBeforeExport: true },
          ],
          [
            require("@babel/plugin-proposal-class-properties").default,
            { loose: true },
          ],
        ],
      },
    },
  };
};
