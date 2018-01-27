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
  //   console.log('\nAutoupdated table `Author`.');
  // });
};
