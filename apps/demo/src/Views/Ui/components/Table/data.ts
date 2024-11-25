const data = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    age: 28,
    city: "New York",
  },
  {
    id: 2,
    name: "Jane Elizabeth Smith",
    email: "jane.smith@example.com",
    age: 32,
    city: "Los Angeles",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "bob.j@example.com",
    age: 25,
    city: "Chicago",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice.brown@example.com",
    age: 22,
    city: "San Francisco Bay Area",
  },
  {
    id: 5,
    name: "Charles William Wilson Jr.",
    email: "charlie.w@example.com",
    age: 35,
    city: "Houston",
  },
  {
    id: 6,
    name: "Evangeline Martinez",
    email: "eva.martinez@example.com",
    age: 30,
    city: "Miami Beach",
  },
  {
    id: 7,
    name: "David Lawrence",
    email: "david.lee@example.com",
    age: 27,
    city: "Seattle",
  },
  {
    id: 8,
    name: "Sophia Turner",
    email: "sophie.t@example.com",
    age: 29,
    city: "Atlanta",
  },
  {
    id: 9,
    name: "Michael Anthony Adams",
    email: "michael.a@example.com",
    age: 31,
    city: "Dallas-Fort Worth",
  },
  {
    id: 10,
    name: "Olivia Charlotte Carter",
    email: "olivia.carter@example.com",
    age: 26,
    city: "Denver",
  },
  {
    id: 11,
    name: "Ryan Alexander Cooper",
    email: "ryan.cooper@example.com",
    age: 34,
    city: "Boston",
  },
  {
    id: 12,
    name: "Emily Davis",
    email: "emily.d@example.com",
    age: 33,
    city: "Phoenix",
  },
  {
    id: 13,
    name: "Daniel William White",
    email: "daniel.white@example.com",
    age: 28,
    city: "Philadelphia",
  },
  {
    id: 14,
    name: "Ava Rose Moore",
    email: "ava.m@example.com",
    age: 24,
    city: "Austin",
  },
  {
    id: 15,
    name: "Nicholas Harrison",
    email: "nicholas.h@example.com",
    age: 27,
    city: "San Diego",
  },
  {
    id: 16,
    name: "Emma Grace Turner",
    email: "emma.t@example.com",
    age: 29,
    city: "Portland",
  },
  {
    id: 17,
    name: "William Lewis Jr.",
    email: "william.l@example.com",
    age: 32,
    city: "Detroit",
  },
  {
    id: 18,
    name: "Grace Margaret Murphy",
    email: "grace.murphy@example.com",
    age: 26,
    city: "Minneapolis",
  },
  {
    id: 19,
    name: "Matthew Wright",
    email: "matthew.w@example.com",
    age: 30,
    city: "Charlotte",
  },
  {
    id: 20,
    name: "Lily Alexandra Adams",
    email: "lily.adams@example.com",
    age: 31,
    city: "Nashville",
  },
];

const formatDemoData = [
  {
    id: 1001,
    amount: 1_234_567.89,
    quantity: 420,
    date: null,
    datetime: null,
    description: "Purchase of equipment",
  },
  {
    id: 1002,
    amount: 987_654.32,
    quantity: 175,
    date: new Date("2023-12-01T12:30:00"),
    datetime: "2023-12-01T11:00:00",
    description: "Office rent payment",
  },
  {
    id: 1003,
    amount: 54321.0,
    quantity: 7890,
    date: new Date("2023-12-15T08:45:00"),
    datetime: new Date("2023-12-15T08:45:00"),
    description: "Marketing campaign expenses",
  },
  {
    id: 1004,
    amount: 654_321.12,
    quantity: 2950,
    date: new Date(),
    datetime: new Date(),
    description: "Product development costs",
  },
  {
    id: 1005,
    amount: 789_012.34,
    quantity: 53210,
    date: new Date("2023-12-05T09:15:00"),
    datetime: "2023-12-05T09:15:00",
    description: "Travel and accommodation",
  },
  {
    id: 1006,
    amount: 12345.67,
    quantity: 6430,
    date: new Date("2023-12-20T14:00:00"),
    datetime: new Date("2023-12-05T09:15:00"),
    description: "Employee salaries",
  },
  {
    id: 1007,
    amount: 234_567.89,
    quantity: 98760,
    date: new Date(),
    datetime: new Date(),
    description: "Product inventory replenishment",
  },
  {
    id: 1008,
    amount: 876_543.21,
    quantity: 123_450,
    date: new Date("2023-12-10T18:45:00"),
    datetime: new Date("2023-12-10T18:45:00"),
    description: "New marketing materials",
  },
  {
    id: 1009,
    amount: 13579.24,
    quantity: 45670,
    date: new Date("2023-12-25T11:30:00"),
    datetime: new Date("2023-12-25T11:30:00"),
    description: "Holiday season promotions",
  },
  {
    id: 1010,
    amount: 24680.36,
    quantity: 78901,
    date: new Date(),
    datetime: new Date(),
    description: "Office furniture upgrade",
  },
];

const VERTICAL_CSS_CODE = `.dz-table-container.vertical .table-wrapper > table > tbody > tr,
.dz-table-container.vertical .table-wrapper > table > tbody > tr > td,
.dz-table-container.vertical .table-wrapper > table > thead tr > th {
  border: none;
}

.dz-table-container.vertical .table-wrapper > table > tbody > tr > td,
.dz-table-container.vertical .table-wrapper > table > thead tr > th {
  border-left: var(--dz-table-border);
  border-right: var(--dz-table-border);
}`;

const HORIZONTAL_CSS_CODE = `.dz-table-container.horizontal .table-wrapper > table > tbody > tr > td,
.dz-table-container.horizontal .table-wrapper > table > thead tr > th {
  border: none;
}`;

export { data, formatDemoData, HORIZONTAL_CSS_CODE, VERTICAL_CSS_CODE };
