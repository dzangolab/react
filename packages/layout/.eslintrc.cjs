module.exports = {
  root: true,
  extends: ["@12deg/eslint-config/react"],
  rules: {
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
          camelCase: true,
        },
      },
    ],
  },
};
