const css = require('css')

class CSS {
  constructor() {
    this.rules = []
  }
  
  parse(content) {
    const ast = css.parse(content)
    this.rules = ast.stylesheet.rules
  }
  
  /**
   * 处理复合选择器，递归调用
   * 为什么采用递归？因为正则表达式的捕获组 `/(\d){3}/`只会得到最后一个匹配的值
   * @param selector
   * @param result
   * @returns {{type: string, value: string}[]}
   */
  handleCompoundSelector(selector, result) {
    // 复合选择器内如果包含类型选择器和通用选择器，则必须出现在首位，且只出现一次
    // 某些选择器只做了大概的匹配，未跟标准对其
    const reg = /(?<tagName>[a-z1-6]+)?(?:(?<operator>[#.])(?<opValue>[a-zA-Z0-9-_]+)|(?<attribute>\[[a-z]+(?:[\^$~*|]?=[a-zA-Z0-9:_'"\\]+\s*(?:[iIsS])?)?])|(?<pseudoOperator>:{1,2})(?<pseudo>[a-z]+(?:-[a-z]+)?(?:\([a-z0-9+*]*\))?))/
    const ret = reg.exec(selector)
    if (ret == null) return result
    const { groups } = ret
    const { tagName, operator, opValue, attribute, pseudoOperator, pseudo } = groups
    if (tagName) {
      result.push({
        type: 'element',
        value: tagName
      })
      selector = selector.replace(tagName, '')
      return this.handleCompoundSelector(selector, result)
    } else if (operator && opValue) {
      if (operator === '#') {
        result.push({
          type: 'id',
          value: opValue
        })
      } else {
        result.push({
          type: 'class',
          value: opValue
        })
      }
      selector = selector.replace(operator + opValue, '')
      return this.handleCompoundSelector(selector, result)
    } else if (attribute) {
      result.push({
        type: 'attribute',
        value: attribute
      })
      selector = selector.replace(attribute, '')
      return this.handleCompoundSelector(selector, result)
    } else if (pseudoOperator && pseudo) {
      if (pseudoOperator === ':') {
        result.push({
          type: 'pseudo-class',
          value: pseudo
        })
      } else {
        result.push({
          type: 'pseudo-element',
          value: pseudo
        })
      }
      selector = selector.replace(pseudoOperator + pseudo, '')
      return this.handleCompoundSelector(selector, result)
    }
  }
  
  /**
   * 处理选择器，来判断简单选择器 or 复合选择器
   * @param selector
   * @returns {{type: string, value: string}[]}
   */
  handleSelector(selector) {
    // type selector
    const reg$1 = /^([a-z1-6]+)$/
    // id selector
    const reg$2 = /^#([a-z0-9-_]+)$/
    // class selector
    const reg$3 = /^.([a-zA-Z0-9-_]+)$/
    // attribute selector
    const reg$4 = /^(\[[a-z]+(?:[\^$~*|]?=[a-zA-Z0-9:_'"\\]+\s*(?:[iIsS])?)?])$/
    // pseudo-element 不是标准的，只是匹配了大概的语法
    const reg$5 = /^::([a-z]+(?:-[a-z]+)?(?:\([a-z0-9+*]*\))?)$/
    // pseudo-class 不是标准的，只是匹配了大概的语法
    const reg$6 = /^:([a-z]+(?:-[a-z]+){0,2}(?:\([a-z0-9+]*\))?)$/
    if (reg$1.test(selector)) {
      return [{type: 'element', value: RegExp.$1}]
    } else if (reg$2.test(selector)) {
      return [{type: 'id', value: RegExp.$1}]
    } else if (reg$3.test(selector)) {
      return [{type: 'class', value: RegExp.$1}]
    } else if (reg$4.test(selector)) {
      return [{type: 'attribute', value: RegExp.$1}]
    } else if (reg$5.test(selector)) {
      return [{type: 'pseudo-element', value: RegExp.$1}]
    } else if (reg$6.test(selector)) {
      return [{type: 'pseudo-class', value: RegExp.$1}]
    } else {
      // 其他未匹配到的就是复合选择器
      // 因为我们不知道是由几种几个组成，单独使用正则是无法捕获每一个的
      // 所以采取的办法是利用正则递归调用，每捕获一个选择器，则将input对应的值replace，得到的返回值重新调用
      // ep: div.a1.b2#c3[class~="bili"]:nth-of-type(2n+1)::after
      // => [{ type: 'element', value: 'div' }, { type: 'attribute', value: '[class~="bili"]' },
      // { type: 'pseudo-class', value: 'nth-of-type(2n+1)' },{ type: 'pseudo-element', value: 'after' }]
      return this.handleCompoundSelector(selector, [])
    }
  }
  
  specificity(selectors) {
    const weight = [0, 0, 0, 0]
    // TODO: 这里只是简单的截取了组合器的逻辑，但有个问题属性选择器中也有～，这块暂时没搞
    const selectorParts = selectors.split(/[ ~+>]/).reverse().filter(f => f)
    for (const selector of selectorParts) {
      if (selector === '*') continue
      const parts = this.handleSelector(selector)
      for (const part of parts) {
        if (part.type === 'id') weight[1] += 1
        if (part.type === 'class') weight[2] += 1
        if (part.type === 'attribute') weight[2] += 1
        // 有些伪类有特殊的行为，内部有专属的计算逻辑，太复杂了，这里就默认都+1
        if (part.type === 'pseudo-class') weight[2] += 1
        if (part.type === 'pseudo-element') weight[3] += 1
        if (part.type === 'element') weight[3] += 1
      }
    }
    return weight
  }
  
  compare(newProp, oldProp) {
    const [n1, n2, n3, n4] = newProp
    const [o1, o2, o3, o4] = oldProp
    if (n1 > o1) return true
    if (n2 > o2) return true
    if (n3 > o3) return true
    return n4 > o4
  }
  
  match(element, selector) {
    if (!selector || !element.attributes) {
      return false
    }

    if (selector === '*') return true
    const parts = this.handleSelector(selector)
    // 这里只需要check id、class、element即可
    // TODO: 暂未支持组合器
    for (const part of parts) {
      if (part.type === 'element') {
        return element.tagName === part.value
      }
      if (part.type === 'id') {
        const item = element.attributes.find(attr => attr.name === 'id')
        if (item && item.value === part.value) return true
      }
      if (part.type === 'class') {
        const item = element.attributes.find(attr => attr.name === 'class')
        if (item && item.value.split(/\s+/).some(v => v === part.value)) return true
      }
    }
    return false
  }
  
  computedCss(stack, element) {
    const elements = stack.slice().reverse()
    if (!element.computedStyle) element.computedStyle = {}
    for (const rule of this.rules) {
      for (const selector of rule.selectors) {
        const selectorParts = selector.split(/[ ~+>]/).reverse().filter(f => f)
        // console.log(selector, selectorParts)
        if (!this.match(element, selectorParts[0])) {
          continue
        }
        let matched = false
        let j = 1
        for (const element of elements) {
          if (!selectorParts[j]) {
            matched = true
            break
          }
          if (this.match(element, selectorParts[j])) {
            j++
          }
        }
        if (matched) {
          const sp = this.specificity(selector)
          rule.declarations.forEach(d => {
            if (!element.computedStyle[d.property]) {
              element.computedStyle[d.property] = {}
            }
            const currentProp = element.computedStyle[d.property]
            
            if (!currentProp.specificity) {
              currentProp.value = d.value
              currentProp.specificity = sp
            } else if (this.compare(sp, currentProp.specificity)) {
              currentProp.value = d.value
              currentProp.specificity = sp
            }
          })
          // console.log(element.tagName, element.computedStyle)
        }
      }
    }
  }
}

module.exports = new CSS()
