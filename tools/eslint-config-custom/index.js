module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["import", "prettier", "unicorn"],
  root: true,
  rules: {
    "import/order": [
      1,
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
      },
    ],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
    "prettier/prettier": "error",
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
      },
    ],
    "unicorn/numeric-separators-style": [
      "error",
      {
        number: {
          minimumDigits: 6,
          groupLength: 3,
        },
      },
    ],
    "unicorn/prevent-abbreviations": [
      "error",
      {
        allowList: {
          db: true,
          docs: true,
          env: true,
          err: true,
          i: true,
          param: true,
          req: true,
          res: true,
        },
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {
        extensions: [".ts", ".tsx", ".d.ts", ".js", ".jsx", ".json", ".node"],
      },
    },
  },
};
