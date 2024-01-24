import { Provider } from "@dzangolab/react-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { editUserProfile } from "@/api/user";
import { useConfig } from "@/hooks";

import { ProfileFormFields } from "./ProfileFormFields";
import { getUserData, removeUserData, setUserData, useUser } from "..";

type UserProfileType = {
  email: string;
  givenName?: string;
  surname?: string;
};

export const ProfileForm = () => {
  const { user } = useUser();
  const appConfig = useConfig();
  const navigate = useNavigate();
  const [data, setData] = useState(user);

  console.log("User", user);
  console.log("LocalStorage user", getUserData());

  //   useEffect(() => {
  //     setUserData(da)
  //   }, [data]);

  const handleSubmit = async (data: UserProfileType) => {
    editUserProfile(data, appConfig.apiBaseUrl).then((response: any) => {
      toast.success("Profile changed successfully");
      removeUserData();
      setUserData(response);
      setData(response);
    });
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
      <ProfileFormFields />
    </Provider>
  );
};
