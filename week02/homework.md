### 2

> 编写带括号的四则运算产生式

```
<MultiplicativeExpression> ::= <Number>
 | <Number> "*" [<MultiplicativeExpression> | <BracketsExpression>]
 | <Number> "/" [<MultiplicativeExpression> | <BracketsExpression>]

<AdditiveExpression> ::= <MultiplicativeExpression>
  | [<BracketsExpression> | <AdditiveExpression>] "+" <MultiplicativeExpression>
  | [<BracketsExpression> | <AdditiveExpression>] "-" <MultiplicativeExpression>

<BracketsExpression> ::= "(" <AdditiveExpression> ")" | "(" <MultiplicativeExpression> ")"

```

### 4

> 尽可能寻找你知道的计算机语言，尝试把它们分类

**winter老师总结的部分**

形式语言-用途

- 数据描述语言： JSON 、HTML、XAML、SQL、CSS 
- 编程语言： C++、C、Java、C#、Python、Ruby、Perl、Lisp、T-SQL、Clojure、Haskel、JavaScript、

形式语言-表达方式 

- 声明式语言：JSON 、HTML、XAML、SQL、CSS 、Lisp、Clojure、Haskel
- 命令型语言： C、C++、Java、C#、Python、Ruby、Perl、JavaScript

**新增自己了解的**

- 声明式语言：Kotlin、Scala
- 命令型语言：Swift、PHP、Go、Objective-C、Dart

### 8

> 写一段 JS 的函数，把一个 string 它代表的字节给它转换出来，用 UTF8 对 string 进行遍码。

~~网上的补码操作看不懂，太难理解了，没用使用补码的转换，使用的比较死的办法，直接替换对应位的值~~

改进版

```javascript
const UTF8_Encoding = str => {
  if (str == null) {
    throw TypeError()
  }
  const string = String(str)
  const size = string.length
  // 空字符串直接返回undefined
  if (size === 0) {
    return undefined
  }
  let index = 0
  let result = []
  while(index < size) {
    // 1. 将字符转换成unicode
    const unicode = string.charCodeAt(index)
    // 2. 判断1～4字节
    // 1个字节：[0x00, 0x7f]
    // 2个字节：[0x80, 0x7ff]
    // 3个字节：[0x800, 0xffff]
    // 4个字节：[0x10000, 0x10ffff]
    if (unicode >= 0x00 && unicode <= 0x7F) {
      result.push(unicode)
    } else if (unicode >= 0x80 && unicode <= 0x7FF) {
      // 110xxxxx 10xxxxxx
      result.push(unicode >> 6 & 31 | 192)
      result.push(unicode & 63 | 128)
    } else if (unicode >= 0x800 && unicode <= 0xFFFF) {
      // 1110xxxx 10xxxxxx 10xxxxxx
      result.push(unicode >> 12 & 15 | 224)
      result.push(unicode >> 6 & 63 | 128)
      result.push(unicode & 63 | 128)
    } else if (unicode >= 0x10000 && unicode <= 0x10FFFF){
      // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
      result.push(unicode >> 18 & 7 | 240)
      result.push(unicode >> 12 & 63 | 128)
      result.push(unicode >> 6 & 63 | 128)
      result.push(unicode & 63 | 128)
    }
    index++
  }
  return result
}

// console.log(UTF8_Encoding(null))
console.log(UTF8_Encoding(''))
console.log(UTF8_Encoding('魑魅魍魉'))
console.log(UTF8_Encoding('1234567890abcd\n\b\t\f'))
console.log(UTF8_Encoding('一二'))
```

### 10

> 用 JavaScript 去设计狗咬人的代码

```javascript
class Dog {
  constructor(name) {
    this.name = name
  }

  run() {}
  bite(target) {}
}
class Human {
  constructor(name) {
    this.name = name
    this.state = {
      blood: 100,
      fear: 0,
      pain: 0
    }
  }
  walk() {}
  hurt(source, mode) {
    if (source instanceof Dog && mode === 'bite') {
      this.state.blood--
      this.state.fear++
      this.state.pain++
    }
  }
  attack(target) {}
}

const dog = new Dog('小黑')
const human = new Human('小白')

// 小白走向回家的路上 
// [小白状态：步行中]
human.walk()
// 小黑正在垃圾堆里找吃的，小黑听见了脚步声，小黑转头看向了小白，突然间向小白冲了过去
// [小黑状态：跑步中]
dog.run()
// 小白此时脑海还在想工作上的事情，一会儿，小黑已然接近了小白，张开小嘴巴咬住了小白的小腿
// 小白反应过来后，大声的呼喊了并拼命的挣扎
// [小白状态：害怕、痛苦、流血] [小黑状态：无]
dog.bite(human)
human.hurt(dog, 'bite')
// 小白用尽力气将小黑努力挣脱，一拳打在了小黑身上，小黑松开嘴嗷叫了一下跑走了
// [小白状态：痛苦、流血] [小黑状态：跑步中]
human.attack(dog)
dog.run()
```

### 11

> 找出 JavaScript 标准里面所有具有特殊行为的对象

我理解的特殊行为就是 通过对象暴露的属性/方法来获取或调用内部的私有属性/方法

```
Object
  [[Prototype]]:  __proto__  Object.getPrototypeOf
  [[GetPrototypeOf]]: getPrototypeOf，内部调用 O.[[Prototype]]
  [[SetPrototypeOf]]: setPrototypeOf，修改对象的原型
  [[IsExtensible]]: isExtensible，访问O.[[Extensible]]
  [[PreventExtensions]]: preventExtensions
  [[GetOwnProperty]]: getOwnPropertyDescriptor
  [[DefineOwnProperty]]: defineProperty
  [[Get]]: getter
  [[Set]]: setter
Function
  [[Call]]: 函数调用
  [[Construct]]: new
Map
  [[HasProperty]]: has
  [[Get]]: get
  [[Set]]: set
  [[delete]]: delete
Proxy
  [[HasProperty]]: has
  [[Get]]: get
  [[Set]]: set
  [[Delete]]: deleteProperty
  [[OwnPropertyKeys]]: ownKeys
  [[Call]]: apply
  [[Construct]]: construct
浏览器:
  [[Scopes]]
```