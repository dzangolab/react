import {
  InvitationForm,
  InvitationModal,
  InvitationsTable,
  UsersTable,
} from "@dzangolab/react-user";

import ComponentList from "../../components/ComponentList";

const roles = [
  {
    id: 1,
    name: "ADMIN",
  },
  {
    id: 2,
    name: "SUPERADMIN",
  },
];
const apps = [
  {
    id: 1,
    name: "Admin",
    origin: "admin-origin",
    supportedRoles: roles,
  },
  {
    id: 2,
    name: "User",
    origin: "admin-origin",
    supportedRoles: [
      {
        id: 2,
        name: "USER",
      },
    ],
  },
];

const componentList = [
  {
    key: 1,
    title: "Invitation form with app field",
    component: (
      <InvitationForm onSubmitted={() => {}} onCancel={() => {}} apps={apps} />
    ),
  },
  {
    key: 5,
    title: "Invitation form with only roles field",
    component: (
      <InvitationForm
        onSubmitted={() => {}}
        onCancel={() => {}}
        roles={roles}
      />
    ),
  },
  {
    key: 2,
    title: "Invitation Modal",
    component: <InvitationModal onSubmitted={() => {}} />,
  },
  {
    key: 3,
    title: "Users Table",
    component: (
      <UsersTable
        users={[]}
        fetchUsers={() => {}}
        onInvitationAdded={() => {}}
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
        onInvitationAdded={() => {}}
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
