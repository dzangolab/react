import {
  AllUsersTable,
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

const allUsers = [
  {
    id: "user-1",
    email: "john@dzangolab.com",
    givenName: "John",
    roles: ["USER"],
    surname: "Doe",
    username: "johndoe",
    isActiveUser: true,
    invitedBy: null,
    signedUpAt: "2023-08-10T08:00:00Z",
  },
  {
    id: "invitation-123",
    email: "jane@dzangolab.com",
    givenName: "Jane",
    roles: ["ADMIN"],
    surname: "Smith",
    username: "janesmith",
    isActiveUser: false,
    invitedBy: {
      id: "user-2",
      email: "admin@dzangolab.com",
      givenName: "Admin",
      roles: ["USER"],
      surname: "User",
      username: "admin",
      isActiveUser: true,
    },
  },
  {
    id: "user-3",
    email: "alice@dzangolab.com",
    givenName: "Alice",
    roles: ["USER"],
    surname: "Johnson",
    username: "alicej",
    isActiveUser: true,
    invitedBy: null,
    signedUpAt: "2023-08-08T10:30:00Z",
  },
  {
    id: "invitation-456",
    email: "bob@dzangolab.com",
    givenName: "Bob",
    roles: ["ADMIN"],
    surname: "Williams",
    username: "bobw",
    isActiveUser: false,
    invitedBy: {
      id: "user-4",
      email: "charlie@dzangolab.com",
      givenName: "Charlie",
      roles: ["USER"],
      surname: "Brown",
      username: "charlieb",
      isActiveUser: true,
    },
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
    key: 6,
    title: "Invitation form with calender expiry date field ",
    component: (
      <InvitationForm
        expiryDateField={{
          display: true,
          mode: "calendar",
        }}
        onSubmitted={() => {}}
        onCancel={() => {}}
        roles={roles}
      />
    ),
  },
  {
    key: 7,
    title: "Invitation form with input expiry date field ",
    component: (
      <InvitationForm
        expiryDateField={{
          display: true,
          mode: "input",
        }}
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
        visibleColumns={[
          "email",
          "name",
          "roles",
          "lastSignedUpAt",
          "signedUpAt",
        ]}
        columnOptions={[
          {
            field: "email",
            filter: false,
          },
        ]}
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
  {
    key: 8,
    title: "All users table",
    component: <AllUsersTable users={allUsers} />,
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
