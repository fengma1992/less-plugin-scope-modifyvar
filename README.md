# A less plugin to modify vars in custom scope

Enables run-time modification of Less variables in specific less files

## Installing 

Using npm: 

```
npm install less-plugin-scope-modifyvar
```
 
Using yarn: 

```
yarn add less-plugin-scope-modifyvar
```

## Programmatic usage

```js
const LessPluginScopeModifyVar = require('less-plugin-scope-modifyvar')

lessOption: {
  plugins: [
    LessPluginScopeModifyVar([
      // antd as an example
      {
        pathReg: /antd\/es\/style\/themes\/(default|variable)/,
        modifyVars: {
          'primary-color': '#aabbcc',
          'ant-prefix': 'antcustom'
        }
      },
    ]),
  ]
}
```

### options
```
@param {[{pathReg: RegExp, modifyVars: Object.<string, string>}]} options
```
LessPluginScopeModifyVar requires an array as options.

Each item of the array contains `pathReg` to specify the files and `modifyVars` to replace the original variable values.


## Command line usage (lessc)

Command line usage (lessc) usage is not supported at this time.

## Browser usage

Browser usage is not supported at this time.
