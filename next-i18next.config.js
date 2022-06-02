const path = require("path");
module.exports = {
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en"],
    localeDetection: true,
    localePath: path.resolve("./public/locales"),
  },
};
