const surveyRoutes = require('./survey_routes');
module.exports = function(app, db) {
  surveyRoutes(app, db);
  // Other route groups could go here, in the future
};