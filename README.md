## A less plugin to modify vars in custom scope

## Usage

1. Installing 
   Using npm:
   `npm install less-plugin-scope-modifyvar`
   Using yarn:
   `yarn add less-plugin-scope-modifyvar`


2. Example

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
LessPluginScopeModifyVar requires an array as options.

Each item of the array contains `pathReg` to specify the files and `modifyVars` to replace the original variables.
