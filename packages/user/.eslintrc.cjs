module.exports = {
  root: true,
  extends: ["custom"],
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
  settings: {
    "import/resolver": {
      typescript: {
        project: ["./tsconfig.json"],
      },
    },
  },
};
