var path = require('path');
var fs = require('fs');

module.exports = {
  description: 'Generate a Sass stylesheet and import it into app.scss',
  afterInstall: function(options) {
    var appStylePath = path.join(options.project.root, 'app', 'styles', 'app.scss');
    fs.appendFileSync(appStylePath, '@import "' + options.entity.name + '";\n');
  }
};
