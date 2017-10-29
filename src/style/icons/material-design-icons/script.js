const fs = require('fs')
const path = require('path')

var contents = fs.readFileSync('iconList.js', 'utf-8');
var contentsArr = contents.split('\n')
var contentsObj = contentsArr.map( (fileName) => {
  const pathNamer = path.resolve('../../../../node_modules/' + fileName);
  console.log('reading:', pathNamer)
  return {
    key: fileName.substring(fileName.indexOf('ic_'), fileName.length - 6),
    name: fileName,
    svg: fs.readFileSync(pathNamer, 'utf-8')
  }
} );
fs.writeFileSync('iconListObj.js', 'module.exports=' + JSON.stringify(contentsObj, null, '    '))