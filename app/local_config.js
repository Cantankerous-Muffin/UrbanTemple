var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : 'ec2-107-20-178-83.compute-1.amazonaws.com',
    port: '5432',
    user     : 'feajqvicmbxvjt',
    password : 'iUdIrsYvXdAsOiOT-NmYx5A-5C',
    database : 'd7rq87le29s826',
    charset  : 'utf8',
    ssl: true
  }
});

module.exports = knex;