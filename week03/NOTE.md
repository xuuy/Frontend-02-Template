## 运算符和表达式

### Priority

[运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence '优先级')

> 运算符的优先级决定了表达式中运算执行的先后顺序，优先级高的运算符最先被执行

- `+` `-`
- `*` `/`
- `()`
- ...

### Expressions

#### 2.1 Member Expression

优先级最高，除了`圆括号()`

- `a.b`
- `a[b]`
- ``` foo`string` ```
- `super.b`
- `super[b]`
- `new.target`
- `new Foo()`

#### 2.2 New Expression

优先级低于Member

- `new Foo` (! 注意这里不带括号)

```js
new a()() // 先执行 new a(),再执行()
new new a() // 先执行后面的new a(),再执行前面的new
```

#### 2.3 Call Expression

优先级低于New

- `foo()`
- `super()`
- `foo()['b']`
- `foo().b`
- ```foo()`abc` ```

```js
new a()['b'] // 先执行new a()，再执行['b']
```

#### 2.4 Left-Hand side & Right-Hand side

##### 2.4.1 Update

- `a++`
- `a--`
- `--a`
- `++a`

##### 2.4.2 Unary

- `delete a.b`
- `void foo()`
- `typeof a`
- `+a`
- `-a`
- `~a`
- `!a`
- `await a`

##### 2.4.3 Exponental

- `**` (` 3 ** 2 ** 3 `)

##### 2.4.4 Multiplicative

- `*`
- `/`
- `%`

##### 2.4.5 Additive

- `+`
- `-`

##### 2.4.6 Shift

- `<<`
- `>>`
- `>>>`

##### 2.4.6 Relationship

- `<`
- `>`
- `<=`
- `>=`
- `instanceof`
- `in`

##### 2.4.7 Equality

- `==`
- `!=`
- `===`
- `!==`

##### 2.4.8 Bitwise

- `&`
- `|`
- `^`

##### 2.4.9 Logical
 
- `&&` 具有短路原则，左边`false`会发生短路
- `||` 具有短路原则，左边`true`会发生短路

##### 2.4.10 Conditional

- `?:` 具有短路原则


## 类型转换

表格如下

|  | Number | String | Boolean | Undefined | Null | Object | Symbol |
|--|----|----|----|----|----|----|----|
| Number |  | 转换成十进制数字符串 | 0:false | x | x | Boxing | x |
| String | NaN、 十进制数字 | | '':false | x | x | Boxing | x |
| Boolean | true 1 false 0 | 'true' 'false' | | x | x | Boxing | x |
| Undefined | NaN | 'undefined' | false | | x | x | x |
| Null | 0 | 'null' | false | x | | x | x |
| Object | valueOf | valueOf toString | true | x | x | | x |
| Symbol | x | x | x| x | x | Boxing | |

### 拆箱转换

将对象转换成基本类型

[ToPrimitive](https://www.ecma-international.org/ecma-262/#sec-toprimitive 'ToPrimitive操作')

分两种情况

第一种情况跟**运算符**一起用时

- `Symbol.toPrimitive` (优先等级**1**)
- `valueOf` (优先等级**2**)
- `toString` (优先等级**3**)

第二种情况作为一个对象的属性时

- `Symbol.toPrimitive` (优先等级**1**)
- `toString` (优先等级**2**)
- `valueOf` (优先等级**3**)

```js
var o = {
  valueOf() {
    console.log('valueOf')
    return {}
  },
  toString() {
    console.log('toString')
    return '1'
  },
  [Symbol.toPrimitive]() {
    console.log('Symbol.toPrimitive')
    return 's'
  }
}

o + '' // -> Symbol.toPrimitive
// 如果[Symbol.toPrimitive]返回非基础类型值，不会去执行valueOf，则会抛出错误 TypeError: Cannot convert object to primitive value
```

```js
var o = {
  valueOf() {
    console.log('valueOf')
    return 1
  },
  toString() {
    console.log('toString')
    return '1'
  },
}

o + '' // -> valueOf

// 1. valueOf如果返回非基础类型值，那么就会去调用toString
// 2. toString返回非基础类型值，则抛出错误TypeError: Cannot convert object to primitive value

var x = {}
// 此时把对象o作为x的属性
x[o] = 1 // -> toString

// 1. toString返回非基础类型值，调用valueOf
// 2. valueOf返回非基础类型值，则抛出错误
```

### 装箱转换

将基础类型转换成对象

1. Number: new Number(input) 

  - 基础类型
    - `number`: 转换为十进制
    - `string`: 能识别则转换为十进制，不能识别则为`NaN`
    - `null`: `0`
    - `undefined`: `NaN`
    - `symbol`: 报错
  - 普通对象
    - `{}`: `NaN`
  - 数组
    - `[]`: `0`
    - `[1]`: `1`，取出第一个值按照参数input再来一次递归
    - `[1, 2, ...]`: `NaN`，只要超出两个就是`NaN`
  - 函数、class、正则表达式
    - `NaN`，不管普通函数箭头函数

2. String: new String(input)

  - 基础类型
    - `number`: 转换为十进制，如果超出字符的最大长度则返回`Infinity`
    - `string`: 原样返回
    - `null`: `'null'`
    - `undefined`: `'undefined'`
    - `symbol`: 报错
  - 普通对象
    - `{}`: `'[object Object]'`
  - 数组
    - `[]`: `''`
    - `[1]`: `'1'`，调用`Array.toString`
    - `[1, 2, null]`: `'1,2,'`，忽略掉`null、undefined`
  - 函数、class、正则表达式
    - `function(){}`: `'function(){}'`
    - `()=>{}`: `'()=>{}'`
    - `class{}`: `'class{}'`
    - `/a/g`: `'/a/g'`

3. Boolean: new Boolean(input)
  - `0(任何进制的0)、null、undefined`: `false`
  - 其他都是`true`

4. Symbol: new Object(Symbol(input))

  - 基础类型
    - `number`: `Symbol(十进制数)`
    - `string`: `Symbol(string)`
    - `null`: `Symbol(null)`
    - `undefined`: `Symbol()`
    - `symbol`: 报错
  - 普通对象
    - `{}`: `Symbol([object Object])`
  - 数组
    - `[]`: `Symbol()`
    - `[1]`: `Symbol(1)`
    - `[1, 2, null]`: `Symbol(1,2,)`
  - 函数、class、正则表达式
    - `function(){}`: `Symbol(function(){})`
    - `()=>{}`: `Symbol(()=>{})`
    - `class{}`: `Symbol(class{})`
    - `/a/g`: `Symbol(/a/g)`



## 运行时

### Completion Record

[The Completion Record Specification Type](https://www.ecma-international.org/ecma-262/#sec-completion-record-specification-type 'Completion Record')

用于解释值和控制流的在运行时传播的过程。

控制流：可以理解为控制权，每当新建并执行一个Lexical Environment内的代码时，控制权就会交给当前的Env环境内，当代码执行时遇到return、throw、continue、break时，就会结束当前代码的执行并记录完成的类型`[[type]]`和值`[[value]]`，如果有`[[target]]`则记录`label`，没有就是`empty`

- `[[type]]`
  - `normal`
  - `break`
  - `continue`
  - `return`
  - `throw`
- `[[value]]`
  - **ECMAScript Language Types**: `Undefined, Null, Boolean, String, Symbol, Number, BigInt, Object`
- `[[target]]`
  - `string类型`: 即`label`[语法是`标识符: 语句`]
  - `empty`: 即语句前面不带label
 
```js
labelName: var a = 1; // [[target]]: labelName
labelName: if() {}
labelName: for() {}
labelName: try() {}
var a = 1; // [[target]]: empty
```

#### [[type]]: break continue

IterationStatement  
LabelledStatement  
ContinueStatement  
BreakStatement  
SwitchStatement

### 简单语句

- ExpressionStatement
  - `const a = 1;`
- EmptyStatement
  - `;`
- DebuggerStatement
  - `debugger`
- ThrowStatement
  - `throw 'error';`
- ContinueStatement
  - 跳过本次循环 `continue`
- BreakStatement
  - 结束循环 `break`
- ReturnStatement
  - 必须放在函数体内 `return 1;`

### 复合语句

- BlockStatement
- IfStatement
- SwitchStatement
- IterationStatement
- WithStatement
- LabelledStatement
- TryStatement

#### LabelledStatement

```js
// LabelledStatement的使用
// 跳过当前的循环体的循环
left: for(let i = 1;i<=3;i++) {
  right: for(let j = 1; j <= 3; j++) {
		if(j === 2) {
      // continue默认是跳过当前的循环，即right
      // 等价于 continue right
      continue
    }
    console.log(i + ':' + j)
  }
}

// 1:1
// 1:3
// 2:1
// 2:3
// 3:1
// 3:3

// 跳过left的循环
left: for(let i = 1;i<=3;i++) {
  right: for(let j = 1; j <= 3; j++) {
		if(j === 2) {
      // continue后面跟上外层循环的label名称，即可跳过
      continue left
    }
    console.log(i + ':' + j)
  }
}

// 1:1
// 2:1
// 3:1
```

#### TryStatement

- `[[type]]: return`
- `[[value]]: --`
- `[[target]]: label`

```js
function foo() {
  label: try {
    var a = 1;
    console.log(1)
    return 3;// 打断性的操作
  } catch(error) {
    // 捕获代码执行错误
    console.log(error)
  } finally {
    // 不管try中是否有return，语句成功还是失败都会进入这里
    console.log(2)
  }
}

foo()
// 1
// 2
// 3
```

## 声明

- FunctionDeclaration
  - `function foo() {}`
- GeneratorDeclaration
  - `function* foo() {}`
- AsyncFunctionDeclaration
  - `async function foo() {}`
- AsyncGeneratorDeclaration
  - `async function* foo() {}`
- VariableStatement
- ClassDeclaration
  - `class {}`
- LexicalDeclaration 
  - `let`
  - `const`

### 预处理pre-process

所有的变量声明都是有预处理的，区别是`var`先赋值后声明不会报错，而`let`、`const`先赋值后声明会抛出错误。

### 作用域

局部作用域
 - `let`、`const`只会作用在它所声明的块内
 - `var`能将声明提升到局部的顶部


## JS运行时

### 宏任务、微任务

- 宏任务（传给JS引擎的任务）
- 微任务（Promise）（JS引擎内部的任务）
 
宏任务和微任务决定了代码的执行顺序
在同一个微任务里，代码并非顺次执行，函数调用会使代码来来回回的跳转执行


### 函数调用

```js
// module foo.js
export function foo() {
  // foo在Module内的环境，变量i并没在该环境内被定义，所以会抛出ReferenceError
  console.log(i)
}

// index.js
import { foo } from 'foo'
var i = 0
console.log(i)
foo()
```

### Execution Context

> 定义: 执行一个语句的时候，会把语句内的**需要的所有信息**都保存在Execution Context中，保存Execution Context的数据结构，我们把它称为Execution Context Stack，其中有一个栈顶元素，就是我们当前环境能访问到的所有变量，我们把它称作Running Execution Context 

ECMAScript Code Execution Context: 

- code evaluation state
  - 用于async和generator函数，定位代码执行的位置
- Function
- Script or Module
- Realm
  - 保存着所有内置对象的领域
- LexicalEnvironment
  - 访问执行代码的环境的变量
- VariableEnvironment
  - var声明到哪的环境

Generator Execution Contexts
- 包含了上面的6个
- Generator
  - 只有Generator函数创建的上下文才会有Generator字段

### LexicalEnvironment

- this
- super
- new.target
- 变量

### VariableEnvironment

是个历史遗留的包袱，仅仅用于处理var声明

### Environment Record

Environment Records
  - Declarative Environment Records
    - Function Environment Records
    - module Environment Records
  - Global Environment Records
  - Object Environment Records

### Function - Closure

> 每一个函数都会生成一个闭包
>
> 闭包的定义：包含两部分，代码部分(Code)和环境部分(Environment Record)，由一个object和一个变量的序列来组成。会带上它定义时所在的Environment Records，保存到自己的函数对象上，变成一个属性

```js
var x = 1
function foo() {
  var y = 2
  console.log(x, y)
}
foo()
```

```plaintext
---------------------------------
|  Function: foo                |
|   -------------------------   |
|   |  Environment Record   |   |
|   |         x: 1          |   |
|   |         y: 2          |   |
|   -------------------------   |
|                               |
|   -------------------------   |
|   |         Code          |   |
|   |   console.log(x, y)   |   |
|   -------------------------   |
|                               |
---------------------------------
```

### Realm

规定了在一个JS引擎的实例里面所有的内置对象都放进Realm中，在不同的Realm实例之间，它们是完全互相独立的，

在JS中，函数表达式和对象直接量会创建对象

使用.做隐式转换也会创建对象

这些对象也是有原型的，如果我们没有Realm，就不知道它们的原型是什么