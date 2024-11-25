import type { UserType } from "../types";

const USER_KEY = "user";

const setUserData = (data: UserType) => {
  localStorage.setItem(USER_KEY, JSON.stringify(data));
};

const getUserData = (): UserType | null => {
  const savedUser = localStorage.getItem(USER_KEY);

  return savedUser ? JSON.parse(savedUser) : null;
};

const removeUserData = () => {
  localStorage.removeItem(USER_KEY);
};

export { getUserData, removeUserData, setUserData };
