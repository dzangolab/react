const SUPERTOKENS_API_BASE_PATH_DEFAULT = "/auth";

enum ROUTES {
  LOGIN = "/login",
  FORGET_PASSWORD = "/forget-password",
  SIGNUP = "/signup",
}

const ROLE_LIST = [
  { id: 1, name: "ADMIN" },
  { id: 2, name: "USER" },
];

export { SUPERTOKENS_API_BASE_PATH_DEFAULT, ROUTES, ROLE_LIST };
