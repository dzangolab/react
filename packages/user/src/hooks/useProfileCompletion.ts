import { useConfig } from "./useConfig";
import { useUser } from "./useUser";

export const useProfileCompletion = () => {
  const config = useConfig();
  const { user } = useUser();

  const profileCompletionRequired =
    !!config.user.features?.signUp?.profileCompletionRequired;

  const profileCompleted = !!user?.givenName;

  return [profileCompletionRequired, profileCompleted];
};
