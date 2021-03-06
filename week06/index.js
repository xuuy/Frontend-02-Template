/**
 * - [x] 支持complex selector、compound selector
 * - [x] 支持任意的Attribute特性
 * - [ ] 支持selector list
 * - [ ] 支持Tree-Structural pseudo-classes
 */

class CSS {
  constructor() {
    this.MatchType = {
      Unknown: 0,
      Tag: 1,               // Example: div
      Id: 2,                // Example: #id
      Class: 3,             // Example: .class
      PseudoClass: 4,       // Example:  :nth-child(2)
      PseudoElement: 5,     // Example: ::first-line
      AttributeExact: 6,    // Example: div[foo="bar"]
      AttributeSet: 7,      // Example: div[foo]
      AttributeHyphen: 8,   // Example: div[foo|="bar"]
      AttributeList: 9,     // Example: div[foo~="bar"]
      AttributeContain: 10,  // css3: div[foo*="bar"]
      AttributeBegin: 11,    // css3: div[foo^="bar"]
      AttributeEnd: 12,      // css3: div[foo$="bar"]
    }
    this.RelationType = {
      None: 0,              // No combinator
      Descendant: 1,        // "Space" combinator
      Child: 2,             // > combinator
      DirectAdjacent: 3,    // + combinator
      IndirectAdjacent: 4,  // ~ combinator
    }
    // 只考虑TreeStructural的伪类，其他都是些用户操作或浏览相关的伪类，对匹配没有什么影响
    this.TreeStructuralPseudoClasses = ['root', 'empty', 'nth-child', 'nth-last-child', 'first-child', 'last-child', 'only-child',
    'nth-of-type', 'nth-last-of-type', 'first-of-type', 'last-of-type', 'only-of-type']
    
    // 处理TreeStructural伪类需要使用到当前的选择器
    this.currentSelectors = []
  }

  getAttributeType(operator, attrValue) {
    const {MatchType} = this
    if (operator) {
      return /\|/.test(operator)
        ? MatchType.AttributeHyphen
        : /~/.test(operator)
          ? MatchType.AttributeList
          : /\*/.test(operator)
            ? MatchType.AttributeContain
            : /\^/.test(operator)
              ? MatchType.AttributeBegin
              : MatchType.AttributeEnd
    } else if (attrValue) {
      return MatchType.AttributeExact
    }
    return MatchType.AttributeSet
  }
  
  getRelation(combinator) {
    const {RelationType} = this
    return /^ +$/.test(combinator)
      ? RelationType.Descendant
      : /^\s*>\s*/.test(combinator)
        ? RelationType.Child
        : /^\s*\+\s*/.test(combinator)
          ? RelationType.DirectAdjacent
          : /^\s*~\s*/.test(combinator)
            ? RelationType.IndirectAdjacent
            : RelationType.None
  }
  
  isTreeStructuralPseudoClasses(pseudoClass) {
    return this.TreeStructuralPseudoClasses.includes(pseudoClass)
  }
  
  hasRootPseudoClass(parts) {
    return parts.some(part => part.selectors.some(s => {
      if(s.type === this.MatchType.PseudoClass) { return s.value === 'root' }
    }))
  }
  
  handleRootPseudoClass(parts) {
    // TODO: 处理Root伪类
    const html = document.getElementsByTagName('html')[0]
    return true
  }
  
  handleTreeStructuralPseudoClasses(pseudoClass) {
    // TODO: 处理伪类部分
    console.log('handleTreeStructuralPseudoClasses -> ', pseudoClass)
    return false
  }
  
  /**
   * 处理选择器
   * @param {string} selector
   * @returns {{type: number, value: string}[]}
   */
  handleSelector(selector) {
    const {MatchType} = this
    const reg = /(?<tagName>[a-zA-Z1-6]+)|(?:(?<operator>[#.])(?<opValue>[a-zA-Z0-9\-_]+)|(?<attr>\[(?<attrName>[a-zA-Z]+)(?:(?<attrOperator>[\^$~*|])?=(\\?["'])?(?<attrValue>[a-zA-Z0-9:_.\- \\]+)(\7) *(?<attrFlag>[iIsS])?)?])|(?<pseudoOperator>:{1,2})(?<pseudoValue>[a-z]+(?:-[a-z]+)?(?<pseudoParam>\([a-z0-9+*]*\))?))/g
    const result = []
    for (const m of selector.matchAll(reg)) {
      const {groups} = m
      const {tagName, operator, opValue, attr, attrName, attrOperator, attrValue, attrFlag, pseudoOperator, pseudoValue, pseudoParam} = groups
      if (tagName) {
        result.push({
          type: MatchType.Tag,
          value: tagName.toLowerCase()
        })
      } else if (operator && opValue) {
        if (operator === '#') {
          result.push({
            type: MatchType.Id,
            value: opValue
          })
        } else {
          result.push({
            type: MatchType.Class,
            value: opValue
          })
        }
      } else if (attr) {
        result.push({
          type: this.getAttributeType(attrOperator, attrValue),
          name: attrName,
          value: attrValue,
          flag: attrFlag
        })
      } else if (pseudoOperator && pseudoValue) {
        if (pseudoOperator === ':') {
          result.push({
            type: MatchType.PseudoClass,
            value: pseudoValue
          })
        } else {
          result.push({
            type: MatchType.PseudoElement,
            value: pseudoValue
          })
        }
      }
    }
    return result
  }
  
  findAttribute(attrs, name) {
    return attrs.find(attr => attr.name === name)
  }

  createRegExp(body, flag) {
    flag = flag === undefined ? '' : flag.match(/i/i) ? 'i' : ''
    return new RegExp(body, flag)
  }

  /**
   * @param {HTMLElement} element
   * @param {{type: number, value: string}[]} selectors
   * @returns {boolean}
   */
  findElement(element, selectors) {
    const {MatchType} = this
    const attributes = [...element.attributes]
    let found = false
    for (const selector of selectors) {
      if (selector.type === MatchType.Tag) {
        found = element.tagName.toLowerCase() === selector.value
        if (!found) {
          break
        }
      } else if (selector.type === MatchType.Id) {
        const item = this.findAttribute(attributes, 'id')
        found = item && item.value === selector.value
        if (!found) {
          break
        }
      } else if (selector.type === MatchType.Class) {
        const item = this.findAttribute(attributes, 'class')
        found = item && item.value.split(/\s+/).some(v => v === selector.value)
        if (!found) {
          break
        }
      } else if (selector.type === MatchType.AttributeExact) {
        // div[foo="bar"] key和value对上即可
        const item = this.findAttribute(attributes, selector.name)
        const reg = this.createRegExp('^' + selector.value + '$', selector.flag)
        found = item && item.value.match(reg)
        if (!found) {
          break
        }
      } else if (selector.type === MatchType.AttributeSet) {
        // div[foo] 能找到key即可
        found = this.findAttribute(attributes, selector.name)
        if (!found) {
          break
        }
      } else if (selector.type === MatchType.AttributeHyphen) {
        // div[foo|="bar"] 允许的值bar、bar-、bar-后面任意字符
        const item = this.findAttribute(attributes, selector.name)
        const reg = this.createRegExp('^' + selector.value + '(-.*)', selector.flag)
        found = item && item.value.match(reg)
        if (!found) {
          break
        }
      } else if (selector.type === MatchType.AttributeList) {
        // div[foo~="bar"] 先把value通过空格分隔开，在去匹配
        const item = this.findAttribute(attributes, selector.name)
        const reg = this.createRegExp('(?<![^ ])' + selector.value + '(?![^ ])', selector.flag)
        found = item && item.value.split(/\s+/).some(v => v.match(reg))
        if (!found) {
          break
        }
      } else if (selector.type === MatchType.AttributeContain) {
        // div[foo*="bar"] 含有bar即可
        const item = this.findAttribute(attributes, selector.name)
        const reg = this.createRegExp(selector.value, selector.flag)
        found = item && item.value.match(reg)
        if (!found) {
          break
        }
      } else if (selector.type === MatchType.AttributeBegin) {
        // div[foo^="bar"] 以bar开头即可
        const item = this.findAttribute(attributes, selector.name)
        const reg = this.createRegExp('^' + selector.value, selector.flag)
        found = item && item.value.match(reg)
        if (!found) {
          break
        }
      } else if (selector.type === MatchType.AttributeEnd) {
        // div[foo$="bar"] 以bar结尾即可
        const item = this.findAttribute(attributes, selector.name)
        const reg = this.createRegExp(selector.value + '$', selector.flag)
        found = item && item.value.match(reg)
        if (!found) {
          break
        }
      } else if (selector.type === MatchType.PseudoClass) {
        if (this.isTreeStructuralPseudoClasses(selector.value)) {
          found = this.handleTreeStructuralPseudoClasses()
          if (!found) {
            break
          }
        } else { // do nothing 只要命中了以上这些规则即可
        }
      } else if (selector.type === MatchType.PseudoElement) {
        // do nothing 伪元素对匹配的结果不影响
      }
    }
    return !!found
  }
  
  /**
   * 匹配当前元素是否命中选择器规则
   * @param {HTMLElement|NodeList|HTMLCollection} element
   * @param {string} selector
   * @returns {boolean}
   */
  match(element, selector) {
    if (!selector || !element) {
      return false
    }
    
    // NodeList HTMLCollection
    if (element.length >= 0) {
      // 都是通过同一个条件搜索出来的，虽然可能父元素、子元素结构不同，但不考虑，取出第一个作为判断
      element = element[0]
      if (!element) return false
    }
    
    if (selector.match(/^\s*\*\s*$/)) return true

    const {RelationType} = this
    const parts = this.parseComplexSelector(selector)
    
    // 单独处理:root
    if (this.hasRootPseudoClass(parts)) {
      return this.handleRootPseudoClass(parts)
    }
    
    let found = false
    for (const part of parts) {
      this.currentSelectors = part.selectors
      if (part.relation === RelationType.None) {
        found = this.findElement(element, part.selectors)
        if (!found) {
          break
        }
      } else if (part.relation === RelationType.Descendant) {
        if (element == null || element.tagName == null) {
          found = false
          break
        }
        element = element.parentNode
        while(element.tagName) {
          // 循环当前元素的父元素，直到document或者found=true
          found = this.findElement(element, part.selectors)
          if (found) {
            break
          }
          element = element.parentNode
        }
      } else if (part.relation === RelationType.Child) {
        if (element == null || element.tagName == null) {
          found = false
          break
        }
        element = element.parentNode
        found = this.findElement(element, part.selectors)
        if (!found) {
          break
        }
      } else if (part.relation === RelationType.DirectAdjacent) {
        if (element == null || element.tagName == null) {
          found = false
          break
        }
        const children = [...element.parentNode.children]
        const self = children.findIndex(c => c === element)
        element = children[self - 1]
        found = element && this.findElement(element, part.selectors)
        if (!found) {
          break
        }
      } else if (part.relation === RelationType.IndirectAdjacent) {
        if (element == null || element.tagName == null) {
          found = false
          break
        }
        const children = [...element.parentNode.children]
        const self = children.findIndex(c => c === element)
        let current = 0
        while (current < children.length) {
          if (current === self) {
            current++
            continue
          }
          element = children[current]
          found = element && this.findElement(element, part.selectors)
          if (found) {
            break
          }
          current++
        }
      }
    }

    console.log('selector ->', selector)
    console.log('matched ->', !!found, parts)
    return !!found
  }
  
  /**
   * 解析complex selector
   * @param {string} rule
   * @returns {{ relation: number, selectors: { type: number, value: string }[] }[]}
   */
  parseComplexSelector(rule) {
    // can split these string
    // div.a1 > div~ div.b2+div#c1[foo^=   bar     I]:first-child + .a2:nth-of-child(1) .a7 a[href="http://www.w3.org/"] i:hover
    // [class = "a1 b1 c1   d1    "] a[href = "http://www.w3.org/"]
    const reg = /(?: *[+>] *| *~ *(?!=)|(?<![\[="' ]) +(?!([ ^$|*="']|[iIsS] *]|(["'])?([\w.] *)* *(["'])? *])))/g
    let combinators = []
    for (const m of rule.matchAll(reg)) {
      combinators.push(m[0])
    }
    const selectorParts = rule.split(reg).reverse().filter(f => f)
    combinators.reverse()
    return selectorParts.map((parts, i) => {
      const selectors = this.handleSelector(parts)
      return {
        relation: this.getRelation(combinators[i - 1]),
        selectors
      }
    })
  }
}

// TODO: 大目标是解析出这种 css.parseComplexSelector("div#id.class[attr~=1]:nth-child(1):first-child:hover::before")
export const css = new CSS()
