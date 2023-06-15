const path = require("path");

require("dotenv").config();

module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
  webpack: (config) => {
    /**
     * Enable these when you want to work with Tina locally
     */
    // config.resolve.alias["@tinacms"] = path.resolve(
    //   "../../../tinacms/packages/@tinacms"
    // );
    // config.resolve.alias["tinacms"] = require.resolve("tinacms");
    // config.resolve.alias["react-dom"] = require.resolve("react-dom");
    // config.resolve.alias["react"] = require.resolve("react");
    // config.optimization.minimize = false;

    return config;
  },
};
