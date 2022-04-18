/**
 * @file LessPluginScopeModifyVar
 * @author dujianhao
 * @date 2022/04/15
 */


/**
 *
 * @param {array} options
 * @constructor
 */
function VarProcessor(options) {
  this.options = options || []
  // 存储已遍历过的文件
  this.fileMap = {}
}

VarProcessor.prototype = {
  process(str, processOption) {
    const options = this.options
    const filename = processOption.fileInfo.filename
    if (this.fileMap[filename]) {
      return str
    }

    for (const option of options) {
      const { pathReg, modifyVars } = option
      if (!pathReg.test(filename)) {
        continue
      }

      return Object.entries(modifyVars).reduce((result, [variable, value]) => {
        const reg = new RegExp(`@${variable}:\\s?[\\w-_]+;`)
        return result.replace(reg, `@${variable}: ${value};`)
      }, str)
    }

    return str
  }
}

/**
 *
 * @param {{[string]: {[string]: string}}} options
 * @returns {{install: install}}
 * @constructor
 */
function LessPluginScopeModifyVar(options) {
  return {
    install: function(less, pluginManager) {
      pluginManager.addPreProcessor(new VarProcessor(options))
    },
  }
}

module.exports = LessPluginScopeModifyVar
