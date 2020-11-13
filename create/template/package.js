module.exports = function (name) {
  const template = `
{
  "name": "${name}",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {},
  "devDependencies": {
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "dayjs": "^1.8.33"
  }
}
  `;
  return { isdir: false, hasFiles: false, template, dir: "", name: "package.json" };
};