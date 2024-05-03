import { useConfig } from "./useConfig";
import { useUser } from "./useUser";

export const useProfileCompletion = (): boolean[] => {
  const config = useConfig();
  const { user } = useUser();

  const profileCompletionEnabled =
    !!config.user.features?.signUp?.profileCompletionEnabled;

  const isProfileCompleted = !!user?.givenName;

  return [profileCompletionEnabled, isProfileCompleted];
};
