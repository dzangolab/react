import useConfig from "./useConfig";
import useUser from "./useUser";

const useEmailVerification = () => {
  const config = useConfig();
  const { user } = useUser();

  const emailVerificationEnabled =
    !!config.user.features?.signUp?.emailVerification;

  const userEmailVerified =
    typeof user?.isEmailVerified === "boolean"
      ? user.isEmailVerified
      : undefined;

  return { emailVerificationEnabled, userEmailVerified };
};

export default useEmailVerification;
