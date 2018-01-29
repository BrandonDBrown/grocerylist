'use strict';

module.exports = function(app) {
  // Install a `/` route that returns server status
  // var router = server.loopback.Router();
  // router.get('/', server.loopback.status());
  // server.use(router);

  var mysqldb = app.dataSources.mysqldb;

  // first autoupdate the `Author` model to avoid foreign key constraint failure
  // mysqldb.automigrate('list', function(err) {
  //   if (err) throw err;
  //   console.log('\nAutoupdated table `list`.');
  // });
};


// "mysqldb": {
//   "host": "us-cdbr-iron-east-05.cleardb.net",
//   "port": 3306,
//   "database": "heroku_eb183e2b7bb2629",
//   "password": "54c4a575",
//   "name": "mysqldb",
//   "user": "b6b0fece3608ee",
//   "connector": "mysql"
// }
