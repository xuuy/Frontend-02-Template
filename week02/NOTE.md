## 编程语言的性质和分类

### 性质

- 动态：`Runtime`
- 静态：`Compiletime`

### 分类

用途
  - 数据描述语言：操作一些数据
  - 编程语言：能处理复杂的逻辑

表达方式
  - 声明式：只关注做什么而不是怎么做
  - 命令式：指令式编程，一步一个指令，最后生成结果，明确知道产生结果的每个步骤

## Grammer

- Literal
  - NullLiteral
    - `null`
  - BooleanLiteral
    - `true`
    - `false`
  - StringLiteral
    - `'h'`
    - `"h"`
  - NumericLiteral
    - `1`
    - `+1` `-1`
    - `1.` `.1`
    - `0b1`  `0B1`
    - `0o1`  `0O1`
    - `0x1f`  `0X1F`
  - RegExpLiteral
    - `/body/flag`
  - ArrayLiteral
    - `[]`
  - ObjectLiteral
    - `{}`
  - `Infinity`
- Variable
- Keywords
- Whitespace
- Line Termintor
- Comments

## Runtime

- Types
  - Number
  - String
  - Boolean
  - Null
  - Undefined
  - Object
  - Symbol
- Execution Context
  - running execution context（execution context stack）
  - Lexical Environment（以下会创建新的Lexical Environment）
    - `FunctionDeclaration`
    - `BlockStatement`
    - `Catch`
    - `TryStatement`


## Number

> 采用[双精度IEEE 754 64位浮点数](https://en.wikipedia.org/wiki/Double-precision_floating-point_format)类型

![64bit](IEEE754(64bit).PNG)

```plaintext
符号位(0正, 1负)：sign bit
指数偏移值(次方)：exponent
分数值(精度)：fraction


⚠️精度位有53位，由于二进制的有效数字总是为1.xxx的形式，fraction第一位默认为1，故存储时省略，这个1隐藏在exponent和fraction之间

Value = (-1)^sign * 2^(exponent - 1023) * 1.fraction

1 = (-1)^0 * 2^(1023 - 1023) * (1 + 0)
2 = (-1)^0 * 2^(1024 - 1023) * (1 + 0)

// 0 100000000011 010100000000...(省略的都是0)000
21 = (-1)^0 * 2^(2^10 + 2^1 + 2^0 - 1023) * (1 + 2^-2 + 2^-4)
   = 1 * 2^4 * (1 + 1/4 + 1/16)
   = 1 * 16 * (1 + 1/4 + 1/16)
   = 16 + 4 + 1

// 0 01111111011 1001100110011001100...10
0.1 ≈ (-1)^0 * 2^(1019 - 1023) * (1 + 2^-1 + 2^-4 + 2^-5 + 2^-8 + 2^-9 + ... + 2^-51)
    ≈ 1 * 2^-4 * (1 + ?不大于0.9)
    ≈ 0.062 * (1 + ?)
    ≈ 0.062 + 0.062*?
    ≈ 0.10000000000001

```

Grammar
  - DecimalLiteral(十进制字面量)
    - 0
    - 0\.
    - .2
    - 1e3
  - BinaryIntegerLiteral
    - 0b1
  - OctalIntegerLiteral
    - 0o10
  - HexIntegerLiteral
    - 0xFF

```javascript
0.toString(); // SyntaxError
0 .toString(); // "0"
0..toString(); // "0"
(0).toString(); // "0"
```

## String

> 1 byte = 8 bit

字符集
  - ASCII
    - 1 byte = 8 bit
    - `0 ~ 127`
  - Unicode
    - 兼容ASCII

编码方式
  - UTF-8
    - 用`1～4个字节`表示一个符号，可以根据不同的符号改变字节的长度，更利于存储
      - 1 byte: [`0x00 ~ 0xff`] [`0 ~ 127`]
      - 2 byte: [`0x80 ~ 0x7ff`] [`128 ~ 2047`]
      - 3 byte: [`0x800 ~ 0xffff`] [`2048 ~ 65535`]
      - 4 byte: [`0x10000 ~ 0x10ffff`] [`65536 ~ 1114111`]
  - UTF-16
    - 用`2～4个字节`表示一个符号

## Object

> 任何对象都是唯一的，对象决定了状态，即对象发生了行为，就产生了状态。而不是状态决定对象
> 
> 设计对象的基本原则：**行为改变状态**

### **对象的三要素**
  - **State** 状态
  - **Behavior** 行为
  - **Identifier** 标识

### **原型**

> Each constructor is a function that has a property named "prototype" that is used to implement prototype-based inheritance and shared properties
>
> Every object created by a constructor has an implicit reference (called the object's prototype) to the value of its constructor's "prototype" property.
> 
> Furthermore, a prototype may have a non-null implicit reference to its prototype, and so on; this is called the prototype chain
> 

每个对象拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性。
**原型对象也可能拥有原型**，并从中继承方法和属性，一层一层、以此类推。
这种被称为原型链。

⚠️：构造函数上的原型对象是函数**独有**的一个**属性`prototype`**，通过`new Function`创建的对象
上的原型对象是一个内部的**私有属性**，无法访问，只能通过宿主环境(浏览器)提供的`访问器属性__proto__`（或者使用`getPrototypeOf`）来访问`[[Prototype]]`，
以链接的方式指向了构造函数的`prototype`

```javascript
var Foo = function(name, age) {
  this.name = name
  this.age = age
}
Foo.p = 1
Foo.bar = function() {}
Foo.prototype.q = 1

var f1 = new Foo('A', 12)
var f2 = new Foo('B', 13)

// new之后在原型上添加方法，f1、f2还是能访问到
Foo.prototype.say = function() {}
```

```
1. Foo的显式原型属性指向FooP(对象): Foo.prototype.constructor === Foo
2. f1、f2的隐式原型链接到FooP，即Foo的显式原型属性: f1.__proto__ === Foo.prototype
3. Foo上的p、bar属性不会共享给 f1、f2、FooP
4. FooP上的q、say属性会共享给f1、f2，但Foo访问不到，因为不在Foo的隐式原型上

/\
|| 这种箭头代表 <隐式原型链接>,在浏览器中通过 <__proto__>，在js引擎中通过 <[[Prototype]]>

---> 这这箭头代表 <显式原型属性>         null  
                                      /\
     Function                         ||
       /\                             ||
       ||                           Object
       ||                             /\
       ||                             ||
-----------------             FooP    ||
|      Foo      |        ----------------------
|   prototype----------->|   constructor(Foo) | 
|       p       |        |          q         | 
|      bar      |        |         say        |
-----------------        ---------------------- 
                          /\          /\
                          ||          ||
                          ||          ||
                      --------     --------
                      |  f1  |     |  f2  |  
                      | name |     | name |
                      |  age |     |  age |
                      --------     --------
```