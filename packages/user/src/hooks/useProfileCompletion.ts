import { useUser } from "./useUser";

export const useProfileCompletion = (): boolean[] => {
  const { user } = useUser();

  const profileCompletionEnabled = user?.isProfileCompleted !== undefined;

  const isProfileCompleted = !!user?.isProfileCompleted;

  return [profileCompletionEnabled, isProfileCompleted];
};
