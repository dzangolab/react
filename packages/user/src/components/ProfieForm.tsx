import { Provider } from "@dzangolab/react-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { editUserProfile } from "@/api/user";
import { getHomeRoute } from "@/helpers";
import { useConfig } from "@/hooks";

import { ProfileFormFields } from "./ProfileFormFields";
import { removeUserData, setUserData, useUser } from "..";

type UserProfileType = {
  email: string;
  givenName?: string;
  surname?: string;
};

export const ProfileForm = () => {
  const { user } = useUser();
  const appConfig = useConfig();
  const navigate = useNavigate();
  const homeRoute: string =
    getHomeRoute(user, appConfig?.layout, appConfig?.user) || "/";

  const navigateHome = () => {
    if (homeRoute === "profile") {
      navigate("/");
    } else {
      navigate(homeRoute);
    }
  };

  console.log("user from local storage", user);

  const handleSubmit = async (data: UserProfileType) => {
    editUserProfile(data, appConfig.apiBaseUrl).then((response) => {
      if ("data" in response) {
        toast.success("Profile changed successfully");
        removeUserData();
        setUserData(response.data);
        navigateHome();
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  const handleCancel = () => {
    navigateHome();
  };

  return (
    <Provider
      onSubmit={handleSubmit}
      defaultValues={{
        email: user?.email,
        givenName: user?.givenName,
        surname: user?.surname,
      }}
    >
      <ProfileFormFields handleCancel={handleCancel} />
    </Provider>
  );
};
