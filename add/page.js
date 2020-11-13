module.exports = function (name) {
  const htmlTemplate = 
  `<!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${name}</title>
    </head>
    <body>
        <p>这是${name}页面</p>
    </body>
  </html>
  `
  const jsTemplate = `
/**
 * ${name}页面
*/
import './${name}.scss'
`
  const cssTemplate = `
  /**
   * ${name}页面
  */
  `
  return {
    isdir: true, hasFiles: true, template:'', dir: '', name, files: [
      { name: `${name}.js`, template: jsTemplate },
      { name: `${name}.html`, template: htmlTemplate },
      { name: `${name}.scss`, template: cssTemplate }
    ]
  }
}