export const roles = [
  {
    id: 1,
    name: "ADMIN",
  },
  {
    id: 2,
    name: "SUPERADMIN",
  },
];

export const apps = [
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

export const allUsers = [
  {
    id: "user-1",
    email: "john@prefabs.tech.com",
    givenName: "John",
    roles: ["USER"],
    surname: "Doe",
    username: "johndoe",
    isActiveUser: true,
    invitedBy: null,
    signedUpAt: "2023-08-10T08:00:00Z",
    disabled: false,
    name: "John Doe",
  },
  {
    id: "invitation-123",
    email: "jane@prefabs.tech.com",
    givenName: "Jane",
    roles: ["ADMIN"],
    surname: "Smith",
    username: "janesmith",
    isActiveUser: false,
    invitedBy: {
      id: "user-2",
      email: "admin@prefabs.tech.com",
      givenName: "Admin",
      roles: ["USER"],
      surname: "User",
      username: "admin",
      isActiveUser: true,
    },
    disabled: true,
    name: "Jane Smith",
  },
  {
    id: "user-3",
    email: "alice@prefabs.tech.com",
    givenName: "Alice",
    roles: ["USER"],
    surname: "Johnson",
    username: "alicej",
    isActiveUser: true,
    invitedBy: null,
    signedUpAt: "2023-08-08T10:30:00Z",
    disabled: false,
    name: "Alice Johnson",
  },
  {
    id: "invitation-456",
    email: "bob@prefabs.tech.com",
    givenName: "Bob",
    roles: ["ADMIN"],
    surname: "Williams",
    username: "bobw",
    isActiveUser: false,
    disabled: false,
    invitedBy: {
      id: "user-4",
      email: "charlie@prefabs.tech.com",
      givenName: "Charlie",
      roles: ["USER"],
      surname: "Brown",
      username: "charlieb",
      isActiveUser: true,
    },
    name: "Bob Williams",
  },
  {
    id: "user-6",
    email: "george@prefabs.tech.com",
    givenName: "george",
    roles: ["USER"],
    surname: "williams",
    username: "george",
    isActiveUser: true,
    invitedBy: null,
    signedUpAt: "2023-10-10T08:00:00Z",
    disabled: true,
    name: "George Williams",
  },
];

export const invitations = [
  {
    id: 456,
    appId: 2,
    createdAt: new Date("2024-01-05").getTime(),
    expiresAt: new Date("2024-02-04").getTime(),
    email: "bob@prefabs.tech.com",
    payload: null,
    invitedById: "user-4",
    revokedAt: new Date("2024-01-14").getTime(),
    acceptedAt: null,
    role: "USER",
    updatedAt: new Date("2024-01-14").getTime(),
    invitedBy: {
      id: "user-4",
      email: "charlie@prefabs.tech.com",
      givenName: "Charlie",
      roles: ["USER"],
      surname: "Brown",
      username: "charlieb",
      isActiveUser: true,
      disabled: false,
    },
  },
  {
    id: 123,
    appId: 3,
    createdAt: new Date("2024-01-05").getTime(),
    expiresAt: new Date("2024-02-04").getTime(),
    email: "jane@prefabs.tech.com",
    givenName: "Jane",
    payload: null,
    invitedById: "user-2",
    revokedAt: null,
    acceptedAt: null,
    role: "ADMIN",
    updatedAt: new Date("2024-01-24").getTime(),
    invitedBy: {
      id: "user-2",
      email: "admin@prefabs.tech.com",
      givenName: "Admin",
      roles: ["USER"],
      surname: "User",
      username: "admin",
      isActiveUser: true,
      disabled: false,
    },
  },
  {
    id: 789,
    appId: 2,
    createdAt: new Date("2024-01-05").getTime(),
    expiresAt: new Date().getTime() + 4 * 24 * 60 * 60 * 1000,
    payload: null,
    email: "june@prefabs.tech.com",
    invitedById: "user-8",
    revokedAt: null,
    acceptedAt: new Date("2024-02-24").getTime(),
    role: "USER",
    updatedAt: new Date("2024-01-24").getTime(),
    invitedBy: {
      id: "user-8",
      email: "jonny@prefabs.tech.com",
      givenName: "jonny",
      roles: ["USER"],
      surname: "smith",
      username: "admin",
      isActiveUser: true,
      disabled: true,
    },
  },
  {
    id: 789,
    appId: 2,
    createdAt: new Date("2024-01-05").getTime(),
    expiresAt: new Date().getTime() + 4 * 24 * 60 * 60 * 1000,
    payload: null,
    email: "janet@prefabs.tech.com",
    invitedById: "user-8",
    revokedAt: null,
    acceptedAt: null,
    role: "ADMIN",
    updatedAt: new Date("2024-01-24").getTime(),
    invitedBy: {
      id: "user-8",
      email: "jolly@prefabs.tech.com",
      givenName: "jolly",
      roles: ["USER"],
      surname: "doe",
      username: "admin",
      isActiveUser: true,
      disabled: true,
    },
  },
  {
    id: 890,
    appId: 2,
    createdAt: new Date("2024-01-10").getTime(),
    expiresAt: new Date().getTime() + 4 * 24 * 60 * 60 * 1000,
    payload: null,
    email: "alexander.smith1234@prefabs.tech.com",
    invitedById: "user-15",
    revokedAt: null,
    acceptedAt: null,
    role: "ADMIN",
    updatedAt: new Date("2024-01-24").getTime(),
    invitedBy: {
      id: "user-15",
      email: "michelle.williams@prefabs.tech.com",
      givenName: "Michelle Alexandra",
      roles: ["USER"],
      surname: "Williams-Smithson",
      username: "admin",
      isActiveUser: true,
      disabled: true,
    },
  },
  {
    id: 891,
    appId: 2,
    createdAt: new Date("2024-03-01").getTime(),
    expiresAt: new Date("2024-05-01").getTime(),
    payload: null,
    email: "george.harrison@prefabs.tech.com",
    invitedById: "user-22",
    revokedAt: null,
    acceptedAt: null,
    role: "USER",
    updatedAt: new Date("2024-03-03").getTime(),
    invitedBy: {
      id: "user-22",
      email: "robert.johnson@prefabs.tech.com",
      givenName: "Robert James",
      roles: ["USER"],
      surname: "Johnson-Longstreet",
      username: "moderator_robert",
      isActiveUser: true,
      disabled: false,
    },
  },
  {
    id: 892,
    appId: 2,
    createdAt: new Date("2024-01-15").getTime(),
    expiresAt: new Date("2024-03-15").getTime(),
    payload: null,
    email: "lucas.martins@prefabs.techech.com",
    invitedById: "user-34",
    revokedAt: null,
    acceptedAt: null,
    role: "USER",
    updatedAt: new Date("2024-01-18").getTime(),
    invitedBy: {
      id: "user-34",
      email: "david.jones@prefabs.tech.com",
      givenName: "David William",
      roles: ["ADMIN", "MODERATOR"],
      surname: "Jones-Smith",
      username: "admin_david_jones",
      isActiveUser: true,
      disabled: true,
    },
  },
  {
    id: 893,
    appId: 2,
    createdAt: new Date("2024-02-18").getTime(),
    expiresAt: new Date("2024-04-20").getTime(),
    payload: null,
    email: "olivia.clark@prefabs.tech.com",
    invitedById: "user-18",
    revokedAt: null,
    acceptedAt: null,
    role: "USER",
    updatedAt: new Date("2024-02-21").getTime(),
    invitedBy: {
      id: "user-18",
      email: "luke.martin@prefabs.tech.com",
      givenName: "Luke Robert",
      roles: ["USER"],
      surname: "Martin",
      username: "user_luke",
      isActiveUser: true,
      disabled: false,
    },
  },
  {
    id: 894,
    appId: 2,
    createdAt: new Date("2024-03-05").getTime(),
    expiresAt: new Date("2024-05-05").getTime(),
    payload: null,
    email: "jackson.davis@prefabs.tech.com",
    invitedById: "user-27",
    revokedAt: null,
    acceptedAt: null,
    role: "ADMIN",
    updatedAt: new Date("2024-03-07").getTime(),
    invitedBy: {
      id: "user-27",
      email: "emma.white@prefabs.tech.com",
      givenName: "Emma Nicole",
      roles: ["ADMIN", "MODERATOR"],
      surname: "White",
      username: "superadmin_emma",
      isActiveUser: true,
      disabled: false,
    },
  },
  {
    id: 895,
    appId: 2,
    createdAt: new Date("2024-02-05").getTime(),
    expiresAt: new Date("2024-04-06").getTime(),
    payload: null,
    email: "sophia.brown@prefabs.tech.com",
    invitedById: "user-10",
    revokedAt: null,
    acceptedAt: null,
    role: "USER",
    updatedAt: new Date("2024-02-12").getTime(),
    invitedBy: {
      id: "user-10",
      email: "michael.green@prefabs.tech.com",
      givenName: "Michael Christopher",
      roles: ["ADMIN", "USER"],
      surname: "Green",
      username: "admin_michael",
      isActiveUser: true,
      disabled: false,
    },
  },
  {
    id: 896,
    appId: 2,
    createdAt: new Date("2024-01-28").getTime(),
    expiresAt: new Date("2024-03-28").getTime(),
    payload: null,
    email: "madeline.james@prefabs.tech.com",
    invitedById: "user-20",
    revokedAt: null,
    acceptedAt: null,
    role: "USER",
    updatedAt: new Date("2024-02-01").getTime(),
    invitedBy: {
      id: "user-20",
      email: "brandon.kelly@prefabs.tech.org",
      givenName: "Brandon Nathaniel",
      roles: ["USER"],
      surname: "Kelly",
      username: "admin_bkelly",
      isActiveUser: true,
      disabled: true,
    },
  },
  {
    id: 897,
    appId: 2,
    createdAt: new Date("2024-03-10").getTime(),
    expiresAt: new Date("2024-05-10").getTime(),
    payload: null,
    email: "ethan.miller@prefabs.tech.com",
    invitedById: "user-5",
    revokedAt: null,
    acceptedAt: null,
    role: "USER",
    updatedAt: new Date("2024-03-12").getTime(),
    invitedBy: {
      id: "user-5",
      email: "hannah.morris@prefabs.tech.com",
      givenName: "Hannah",
      roles: ["ADMIN"],
      surname: "Morris",
      username: "admin_hannah",
      isActiveUser: true,
      disabled: false,
    },
  },
  {
    id: 898,
    appId: 2,
    createdAt: new Date("2024-02-25").getTime(),
    expiresAt: new Date("2024-04-25").getTime(),
    payload: null,
    email: "benjamin.martinez@prefabs.tech.com",
    invitedById: "user-12",
    revokedAt: null,
    acceptedAt: null,
    role: "ADMIN",
    updatedAt: new Date("2024-02-28").getTime(),
    invitedBy: {
      id: "user-12",
      email: "lucy.rodriguez@prefabs.tech.net",
      givenName: "Lucy Isabella",
      roles: ["ADMIN"],
      surname: "Rodriguez",
      username: "superadmin_lucy",
      isActiveUser: true,
      disabled: false,
    },
  },
  {
    id: 899,
    appId: 2,
    createdAt: new Date("2024-01-30").getTime(),
    expiresAt: new Date("2024-03-30").getTime(),
    payload: null,
    email: "claire.morgan@prefabs.tech.com",
    invitedById: "user-16",
    revokedAt: null,
    acceptedAt: null,
    role: "USER",
    updatedAt: new Date("2024-02-02").getTime(),
    invitedBy: {
      id: "user-16",
      email: "jacob.smith@prefabs.tech.com",
      givenName: "Jacob",
      roles: ["USER"],
      surname: "Smith",
      username: "user_jacobsmith",
      isActiveUser: true,
      disabled: false,
    },
  },
];
