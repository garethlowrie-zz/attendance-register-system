const groupRoutes = require('./group_routes');
const learnerRoutes = require('./learner_routes');
const attendanceRoutes = require('./attendance_routes');

module.exports = function(app, db) {
    groupRoutes(app, db);
    learnerRoutes(app, db);
    attendanceRoutes(app, db);
  };