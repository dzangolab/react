import {
  InvitationForm,
  InvitationModal,
  InvitationModalButton,
  InvitationsTable,
  UsersTable,
} from "@dzangolab/react-user";

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
    component: <InvitationModalButton handleSubmit={() => {}} />,
  },
  {
    key: 3,
    title: "Users Table",
    component: (
      <UsersTable
        users={[]}
        fetchUsers={() => {}}
        handleInvitationSubmit={() => {}}
      />
    ),
  },
  {
    key: 4,
    title: "Invitations Table",
    component: (
      <InvitationsTable
        invitations={[]}
        fetchInvitations={() => {}}
        handleInvitationSubmit={() => {}}
        modalVisible={true}
        setModalVisible={() => {}}
      />
    ),
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
