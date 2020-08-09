/**
 * 伪类暂不支持
 * TODO: 属性选择器有几个还有点问题，等后面有时间慢慢修复
 */

import { css } from "."

// 添加测试节点
document.body.innerHTML = `
<div id="root">
  <div class="a1">
    <div class="b1 c1 d1" age="1 . 13 .  1  ">div[age~="13"]</div>
    <div class="b2 c1" name="z--\\n">div[name|="z-"]</div>
    <div id="c1" foo="   bar  ">div[foo*="bar"]<span>5555</span></div>
    <div class="a2">
      <div class="a3">
        <div class="a4">
          <div class="a5">
            <div class="a6">
              <div class="a7">
                <div class="a8">
                  <div class="a9">
                    <div class="a10">
                      <div class="a11">
                        嵌套dom
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="a2">
    <i></i>
  </div>
</div>
`

const html = document.getElementsByTagName('html')[0]
html.setAttribute('lang', 'zh-Hans')
html.setAttribute('id', 'xy')

const Class_A1 = document.getElementsByClassName('a1')
const Class_A7 = document.getElementsByClassName('a7')
const Class_A11 = document.getElementsByClassName('a11')
const Class_B1 = document.getElementsByClassName('b1')
const Class_B2 = document.getElementsByClassName('b2')
const I = document.getElementsByTagName('i')[0]
const Id_Root = document.getElementById('root')
const Id_C1 = document.getElementById('c1')

describe('week06', () => {
  describe('CSS', () => {
    describe('simple selector', () => {
      describe('* selector', () => {
        it('match * for <div class="a1">', () => {
          expect(css.match(Class_A1, '*')).toEqual(true)
        })
        it('match * for <div class="a7">', () => {
          expect(css.match(Class_A7, '*')).toEqual(true)
        })
        it('match * for <div id="1">', () => {
          expect(css.match(Id_C1, '*')).toEqual(true)
        })
      })
  
      describe('type selector', () => {
        it('match div for <div>', () => {
          expect(css.match(Class_A7, 'div')).toEqual(true)
        })
        it('match DIV for <div>', () => {
          expect(css.match(Class_A7, 'DIV')).toEqual(true)
        })
        it('match span for <div>', () => {
          expect(css.match(Class_A7, 'span')).toEqual(false)
        })
        it('match HTML for <html>', () => {
          expect(css.match(html, 'HTML')).toEqual(true)
        })
        it('match i for <i>', () => {
          expect(css.match(I, 'i')).toEqual(true)
        })
      })
  
      describe('id selector', () => {
        it('match #root for <div id="root">', () => {
          expect(css.match(Id_Root, '#root')).toEqual(true)
        })
        it('match #root for <div id="c1">', () => {
          expect(css.match(Id_C1, '#root')).toEqual(false)
        })
        it('match #root for <div class="a1">', () => {
          expect(css.match(Class_A1, '#root')).toEqual(false)
        })
      })
  
      describe('class selector', () => {
        it('match .a1 for <div class="a1">', () => {
          expect(css.match(Class_A1, '.a1')).toEqual(true)
        })
        it('match .a1 for <div class="a7">', () => {
          expect(css.match(Class_A7, '.a1')).toEqual(false)
        })
        it('match .a1 for <div id="c1">', () => {
          expect(css.match(Id_C1, '.a1')).toEqual(false)
        })
        it('match .c1 for <div class="b1 c1 d1">', () => {
          expect(css.match(Class_B1, '.c1')).toEqual(true)
        })
        it('match .c2 for <div class="b1 c1 d1">', () => {
          expect(css.match(Class_B1, '.c2')).toEqual(false)
        })
        it('match .d1 for <div class="b1 c1 d1">', () => {
          expect(css.match(Class_B1, '.d1')).toEqual(true)
        })
      })
  
      describe('attribute selector', () => {
        it('match [age] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[age]')).toEqual(true)
        })
        it('match [age i] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[age i]')).toEqual(false)
        })
        it('match [foo] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[foo]')).toEqual(false)
        })
        it('match [class="b1 c1 d1"] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[class="b1 c1 d1"]')).toEqual(true)
        })
        it('match [class="A1" i] for <div class="a1">', () => {
          expect(css.match(Class_A1, '[class="A1" i]')).toEqual(true)
        })
        it('match [class="c1"] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[class="c1"]')).toEqual(false)
        })
        it('match [class|=\'c1\'] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[class|=\'c1\']')).toEqual(false)
        })
        it('match [name|=\'z\'] for <div class="b2 c1" name="z--\\n">', () => {
          expect(css.match(Class_B2, '[name|=\'z\']')).toEqual(true)
        })
        it('match [name|=\'z-\'] for <div class="b2 c1" name="z--\\n">', () => {
          expect(css.match(Class_B2, '[name|=\'z-\']')).toEqual(true)
        })
        it('match [name|=\'Z-\'  i] for <div class="b2 c1" name="z--\\n">', () => {
          expect(css.match(Class_B2, '[name|=\'Z-\'  i]')).toEqual(true)
        })
        it('match [name|=\'z--\'] for <div class="b2 c1" name="z--\\n">', () => {
          expect(css.match(Class_B2, '[name|=\'z--\']')).toEqual(false)
        })
        it('match [class~="c1"] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[class~="c1"]')).toEqual(true)
        })
        it('match [class~="b1"] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[class~="b1"]')).toEqual(true)
        })
        it('match [class~="B1"  i] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[class~="B1"  i]')).toEqual(true)
        })
        it('match [class~="d1"] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[class~="d1"]')).toEqual(true)
        })
        it('match [age~="13"] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[age~="13"]')).toEqual(true)
        })
        it('match [class~="b"] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[class~="b"]')).toEqual(false)
        })
        it('match [age~="1  "] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[age~="1  "]')).toEqual(false)
        })
        it('match [age~="1"] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[age~="1"]')).toEqual(true)
        })
        it('match [age*="1"] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[age*="1"]')).toEqual(true)
        })
        it('match [class*="C" i] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[class*="C" i]')).toEqual(true)
        })
        it('match [age*="1 ."] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[age*="1 ."]')).toEqual(true)
        })
        it('match [age*=" .  1  "] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[age*=" .  1  "]')).toEqual(true)
        })
        it('match [age*="1 .1"] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[age*="1 .1"]')).toEqual(false)
        })
        it('match [age^="1"] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[age^="1"]')).toEqual(true)
        })
        it('match [class^="B" i] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[class^="B" i]')).toEqual(true)
        })
        it('match [age^="1 ."] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[age^="1 ."]')).toEqual(true)
        })
        it('match [age^="1 .1"] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[age^="1 .1"]')).toEqual(false)
        })
        it('match [age$="1"] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[age$="1"]')).toEqual(false)
        })
        it('match [class$="D1" i] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[class$="D1" i]')).toEqual(true)
        })
        it('match [class$="1"] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[class$="1"]')).toEqual(true)
        })
        it('match [age$="1  "] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[age$="1  "]')).toEqual(true)
        })
        it('match [age$="1   "] for <div class="b1 c1 d1" age="1 . 13 .  1  ">', () => {
          expect(css.match(Class_B1, '[age$="1   "]')).toEqual(false)
        })
      })
  
      describe('pseudo-class selector', () => {
        // 伪类只考虑树结构类型的，其他不考虑，太过复杂了
        // 树结构中除了:root可以单独使用的，其他都是false
        // 'root', 'empty', 'nth-child', 'nth-last-child', 'first-child', 'last-child', 'only-child',
        //  'nth-of-type', 'nth-last-of-type', 'first-of-type', 'last-of-type', 'only-of-type'
        it('match :root for <div class="a1">', () => {
          expect(css.match(Class_A1, ':root')).toEqual(true)
        })
        it('match :empty for <div class="a1">', () => {
          expect(css.match(Class_A1, ':empty')).toEqual(false)
        })
        it('match :nth-child for <div class="a1">', () => {
          expect(css.match(Class_A1, ':nth-child')).toEqual(false)
        })
        it('match :nth-last-child for <div class="a1">', () => {
          expect(css.match(Class_A1, ':nth-last-child')).toEqual(false)
        })
        it('match :only-child for <div class="a1">', () => {
          expect(css.match(Class_A1, ':only-child')).toEqual(false)
        })
        it('match :nth-last-of-type for <div class="a1">', () => {
          expect(css.match(Class_A1, ':nth-last-of-type')).toEqual(false)
        })
        it('match :first-of-type for <div class="a1">', () => {
          expect(css.match(Class_A1, ':first-of-type')).toEqual(false)
        })
        it('match :last-of-type for <div class="a1">', () => {
          expect(css.match(Class_A1, ':last-of-type')).toEqual(false)
        })
      })
  
      describe(':root pseudo-class', () => {
        it('match html:root', () => {
          expect(css.match(Class_A1, 'html:root')).toEqual(true)
        })
        it('match HTML:root', () => {
          expect(css.match(Class_A1, 'HTML:root')).toEqual(true)
        })
        it('match [lang]:root', () => {
          expect(css.match(Class_A1, '[lang]:root')).toEqual(true)
        })
        it('match [lang|="zh"]:root', () => {
          expect(css.match(Class_A1, '[lang|="zh"]:root')).toEqual(true)
        })
        it('match [lang|="zh-"]:root', () => {
          expect(css.match(Class_A1, '[lang|="zh-"]:root')).toEqual(false)
        })
        it('match [lang^="zh"]:root', () => {
          expect(css.match(Class_A1, '[lang^="zh"]:root')).toEqual(true)
        })
        it('match [id]:root', () => {
          expect(css.match(Class_A1, '[id]:root')).toEqual(true)
        })
        it('match [id^="xy"]:root', () => {
          expect(css.match(Class_A1, '[id^="xy"]:root')).toEqual(true)
        })
        it('match :root', () => {
          expect(css.match(Class_A1, ':root')).toEqual(true)
        })
        it('match #root:root for class', () => {
          expect(css.match(Class_A1, '#root:root')).toEqual(false)
        })
        it('match #root:root for id', () => {
          expect(css.match(Id_C1, '#root:root')).toEqual(false)
        })
        it('match :root ', () => {
          expect(css.match(Id_C1, '#root:root')).toEqual(false)
        })
      })
  
      describe('pseudo-element selector', () => {
        // 伪元素不能单独使用，所以都返回false
        it('match ::before for <div class="a1">', () => {
          expect(css.match(Class_A1, '::before')).toEqual(false)
        })
        it('match ::after for <div class="a1">', () => {
          expect(css.match(Class_A1, '::after')).toEqual(false)
        })
        it('match ::first-line for <div class="a1">', () => {
          expect(css.match(Class_A1, '::first-line')).toEqual(false)
        })
        it('match ::first-letter for <div class="a1">', () => {
          expect(css.match(Class_A1, '::first-letter')).toEqual(false)
        })
      })
    })
  
    describe('compound selector', () => {
      // *、type必须在首位且只有一个，伪类伪元素必须在末尾可以有多个
      describe('Two kinds of selectors', () => {
        it('match *.a1 for <div class="a1">', () => {
          expect(css.match(Class_A1, '*.a1')).toEqual(true)
        })
        it('match *#c1 for <div id="c1">', () => {
          expect(css.match(Id_C1, '*#c1')).toEqual(true)
        })
        it('match *[id] for <div id="c1">', () => {
          expect(css.match(Id_C1, '*[id]')).toEqual(true)
        })
        it('match *[foo] for <div id="c1">', () => {
          expect(css.match(Id_C1, '*[foo]')).toEqual(true)
        })
        it('match *[id=c1] for <div id="c1">', () => {
          expect(css.match(Id_C1, '*[id=c1]')).toEqual(true)
        })
        // it('match *:root for <div id="c1">', () => {
        //   // 如果元素上有对应的样式了，则不会覆盖
        //   expect(css.match(Id_C1, '*:root')).toEqual(true)
        // })
        // it('match *:root for <div id="c1">', () => {
        //   // 会命中所有元素
        //   expect(css.match(Id_C1, '*:first-child')).toEqual(true)
        // })
        it('match div[id] for <div id="c1">', () => {
          expect(css.match(Id_C1, 'div[id]')).toEqual(true)
        })
        it('match div[foo] for <div id="c1">', () => {
          expect(css.match(Id_C1, 'div[foo]')).toEqual(true)
        })
        it('match div#c1 for <div id="c1">', () => {
          expect(css.match(Id_C1, 'div#c1')).toEqual(true)
        })
        it('match div#c2 for <div id="c1">', () => {
          expect(css.match(Id_C1, 'div#c2')).toEqual(false)
        })
        it('match div.a1 for <div class="a1">', () => {
          expect(css.match(Class_A1, 'div.a1')).toEqual(true)
        })
      })
  
      describe('Three kinds of selectors', () => {
      
      })
  
      describe('multiple selectors', () => {
    
      })
    })
  
    describe('complex selector', () => {
      describe('Descendant combinator', () => {
        it('match div div', () => {
          expect(css.match(Class_A1, 'div div')).toEqual(true)
        })
        it('match div div.b2[name|=\'z-\']', () => {
          expect(css.match(Class_B2, 'div div.b2[name^=\'z-\']')).toEqual(true)
        })
        it('match div div div', () => {
          expect(css.match(Class_A1, 'div div div')).toEqual(false)
        })
        it('match div div .a1  .a4 .a5 .a7', () => {
          expect(css.match(Class_A7, 'div div .a1  .a4 .a5 .a7')).toEqual(false)
        })
        it('match div div .a1 .a2 .a3 .a4 .a5 .a6 .a7 .a8 .a9 .a10 .a11', () => {
          expect(css.match(Class_A11, 'div .a1 .a2 .a3 .a4 .a5 .a6 .a7 .a8 .a9 .a10 .a11')).toEqual(true)
        })
        it('match div div .a1 .a2 .a3 .a4 .a6 .a6 .a7 .a8 .a9 .a10 .a11', () => {
          expect(css.match(Class_A11, 'div div .a1 .a2 .a3 .a4 .a6 .a6 .a7 .a8 .a9 .a10 .a11')).toEqual(false)
        })
        it('match div div .a1 .a7 .a11', () => {
          expect(css.match(Class_A11, 'div .a1 .a7 .a11')).toEqual(true)
        })
      })
  
      describe('Child combinator', () => {
        it('match div div .a1 .a7 .a11', () => {
          expect(css.match(Class_A11, 'div div .a1 > .a7 .a11')).toEqual(false)
        })
        it('match div > .a1 > .a2 > .a3 > .a4 ... > .a11', () => {
          expect(css.match(Class_A11, 'div > .a1 > .a2 > .a3 > .a4 > .a5 > .a6 > .a7 > .a8 > .a9 > .a10 > .a11')).toEqual(true)
        })
        it('match div ... > .a4 > .a6 > .a6 ... > .a11', () => {
          expect(css.match(Class_A11, 'div > .a1 > .a2 > .a3 > .a4 > .a6 > .a6 > .a7 > .a8 > .a9 > .a10 > .a11')).toEqual(false)
        })
        it('match div > div.b1[age~="13"]', () => {
          expect(css.match(Class_B1, 'div > div.b1[age~="13"]')).toEqual(true)
        })
      })
  
      describe('hybrid combinator', () => {
        it('match hybrid1', () => {
          expect(css.match(Id_C1, 'div > .b1[age~=13] ~ div#c1[foo*=bar]')).toEqual(true)
        })
        it('match hybrid2', () => {
          expect(css.match(Class_A7, 'div.a1 > div ~ div.b2 + div#c1[foo*=bar  ] + .a2 .a7')).toEqual(true)
        })
        it('match hybrid3', () => {
          expect(css.match(Class_A7, 'div.a1 > div ~ div.b2 + div#c1[foo*=bar    ] + .a2 .a7')).toEqual(false)
        })
        it('match hybrid4', () => {
          expect(css.match(Class_A7, 'div.a1 > div ~ div.b2 + div#c1[foo*=\'bar\'     ] + .a2 .a7')).toEqual(true)
        })
        it('match hybrid5', () => {
          expect(css.match(Class_A7, 'div.a1 > div ~ div.b2 + div#c1[foo*="bar  "     ] + .a2 .a7')).toEqual(true)
        })
        it('match hybrid6', () => {
          expect(css.match(Class_A7, 'div.a1 > div ~ div.b2 + div#c1[foo*="BAr  "     ] + .a2 .a7')).toEqual(false)
        })
        it('match hybrid7', () => {
          expect(css.match(Class_A7, 'div.a1 > div ~ div.b2 + div#c1[foo*="BAr  "     I] + .a2 .a7')).toEqual(true)
        })
        it('match hybrid8', () => {
          expect(css.match(Class_A7, 'div.a1 > div ~ div.b2 + div#c1[foo^="bar  "     I] + .a2 .a7')).toEqual(false)
        })
        it('match hybrid9', () => {
          expect(css.match(Class_A7, 'div.a1 > div ~ div.b2 + div#c1[foo^="   bar"     I] + .a2 .a7')).toEqual(true)
        })
        it('match hybrid10', () => {
          expect(css.match(Class_A7, 'div.a1 > div ~ div.b2 + div#c1[foo$="bar  "     I] + .a2 .a7')).toEqual(true)
        })
        // it('match hybrid11', () => {
        //   expect(css.match(Class_A7, 'div.a1 > div ~ div.b2[name|="z-"] + div#c1[foo*="BAr  "     I] + .a2 .a7')).toEqual(true)
        // })
      })
    })
  })
})
