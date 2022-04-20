/**
 * @file LessPluginScopeModifyVar
 * @author dujianhao
 * @date 2022/04/15
 */
const path = require('path')

const isWindows = process.platform === 'win32'

function slashReplace(p) {
  return p.replace(/\\/g, '/');
}

function normalizePath(p) {
  if (isWindows) {
    p = slashReplace(p)
  }
  return path.posix.normalize(p)
}

/**
 * VarProcessor
 * @param {[{pathReg: RegExp, modifyVars: Object.<string, string>}]} options
 * @constructor
 */
function VarProcessor(options) {
  this.options = options || []
  this.fileMap = {}
}

VarProcessor.prototype = {
  process(str, processOption) {
    const options = this.options
    const filename = normalizePath(processOption.fileInfo.filename)
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
 * LessPluginScopeModifyVar
 * @param {[{pathReg: RegExp, modifyVars: Object.<string, string>}]} options
 * @returns {{install: function}}
 * @constructor
 */
function LessPluginScopeModifyVar(options) {
  return {
    install: function(_less, pluginManager) {
      pluginManager.addPreProcessor(new VarProcessor(options))
    },
  }
}

module.exports = LessPluginScopeModifyVar
