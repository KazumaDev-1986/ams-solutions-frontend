export default {
  env: {
    jest: true,
    browser: true,
    node: true,
  },
  extends: ["./eslint.config.js"],
  rules: {
    "no-undef": "off",
  },
};
