const fs = require('fs');
const path = require('path');
const SwaggerParser = require('swagger-parser');
const _ = require('lodash');
const mkdirp = require('mkdirp');

const yamlFile = path.join(__dirname, '..', 'swagger.yaml');
const parsePromise = SwaggerParser.dereference(yamlFile);
const resolvePromsie = SwaggerParser.resolve(yamlFile);

const outputDir = path.join(__dirname, '../output/exp/');
mkdirp(outputDir);

Promise.all([parsePromise, resolvePromsie]).then(values => {
  // console.dir(api);
  const { host, paths, basePath } = values[0];
  Object.keys(paths).forEach(route => {
    const methods = Object.keys(paths[route]);
    methods.forEach(method => {
      const api = paths[route][method];
      const data = fs.readFileSync(path.join(__dirname, '..', 'templates/route.jst'), 'utf8');
      const template = _.template(data);
      const params = {
        route,
        method,
        schema: '',
      };

      console.info(api.parameters);
      const filePath = path.join(outputDir, `${api.operationId}Route.js`);

      const { responses } = api;
      const resp200 = responses[200];
      if (resp200) {
        const { schema } = resp200;
        params.schema = JSON.stringify(schema);
      }

      const compiled = template(params);
      fs.writeFileSync(filePath, compiled);
    });
  });
});
