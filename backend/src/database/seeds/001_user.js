const bcrypt = require("bcrypt");
const generateUniqueId = require("../../utils/generateUniqueID");
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      const hash = bcrypt.hashSync("12345", 8);
      const id = generateUniqueId();
      return knex("users").insert([
        {
          id,
          name: "root",
          email: "root@root.com.br",
          password: hash,
          level: 0,
        },
      ]);
    });
};
