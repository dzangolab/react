import { InvitationForm, InvitationModal } from "@dzangolab/react-user";

import ComponentList from "../../components/ComponentList";

const componentList = [
  {
    key: 1,
    title: "Invitation Form",
    component: <InvitationForm handleSubmit={() => {}} onCancel={() => {}} />,
  },
  {
    key: 2,
    title: "Invitation Modal",
    component: <InvitationModal />,
  },
];

const User = () => {
  return (
    <ComponentList
      componentList={componentList}
      title="header.menu.user"
      translationNameSpace={["user"]}
    />
  );
};

export default User;
