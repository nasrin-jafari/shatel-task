const { sub } = require("date-fns");

const users = [
  {
    id: "1",
    username: "admin",
    password: "1",
    role: "admin",
    firstname: "john",
    lastname: "doe",
    gender: "male",
  },
  {
    id: "2",
    username: "client",
    password: "1",
    role: "client",
    firstname: "jane",
    lastname: "doe",
    gender: "female",
  },
];

const posts = [
  {
    id: "1",
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    userId: "",
  },
  {
    id: "2",
    title: "Slices...",
    content: "The more I say slice, the more I want pizza.",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    userId: "1",
  },
];

const authors = [
  { id: "0", name: "Dude Lebowski" },
  { id: "1", name: "Neil Young" },
  { id: "2", name: "Dave Gray" },
];

module.exports = {
  posts,
  authors,
  users,
};
