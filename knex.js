const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: ':memory:',
  },
  useNullAsDefault: true,
});

async function createTables() {
  return knex.schema
    .createTableIfNotExists('students', function (table) {
      table.increments();
      table.string('name');
    })
    .then(function () {
      return knex('students').insert([{ name: 'Robert' }]);
    });
}

async function queryStudents() {
  await createTables();

  const students = await knex.raw('select * from students where name = ?', [
    'Robert',
  ]);

  console.log({ students });
  process.exit();
}

queryStudents();
