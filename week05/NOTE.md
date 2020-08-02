# 输入URL到界面显示

1. 输入地址后，客户端发起http请求，服务端接受请求并响应，返回HTML
    - [TCP/IP网络模型的各个层处理]（待了解）
    - [DNS的解析]（待了解）
    - 客户端require net库，创建一个TCP连接，发送HTTP请求报文信息
    - 服务端启动一个HTTP服务，并监听数据传输，接收到完整数据后经过处理，以HTTP Response报文形式将HTML返回给客户端（HTTP1.1、HTTP2.0待深入）
    - 客户端在TCP层接收到服务端的数据并还原，开始解析Response报文，不同的请求会以不同的编码方式进行传输，根据对应的编码进行解码操作
    - 经过解码之后，生成了最终的结果，交给下一道程序
    
2. 解析HTML，生成DOM
    - 拿到response.body后，通过状态机处理HTML文本
    - 状态机的作用就是每一个状态机只消费一个字符，得到下一个状态，流转或者继续消费，直到状态结束（只写了一部分状态机）
    - 当遇到一个<link><script><img>有连接时，又会向服务器发起一次请求(这里没有做)
    - 最终每一个元素节点、文本节点、注释节点、属性节点等会生成到一个Document Tree中，可以通过DOM来访问
    
3. 解析CSS
    - 通过词法分析，语法分析解析每一条css规则，并生成一个CSSOM（这一步使用了css库）
    - 将CSSOM应用到对应元素上面，该步骤是与解析HTML是同步进行的
    - 分析每一条规则的选择器，判断是属于复杂选择器、复合选择器、简单选择器，进行不同的处理（这一步待完善）
    - 每一个属性得到对应的优先级，去判断是否需要覆盖上一个解析的规则，最终HTML解析完毕，CSS则全部分配到了对应的元素上面
    
4. 排版
    - 由DOM + CSSOM 得到了 RenderOM，浏览器开始自上而下的识别每一个元素及元素上面的css规则
    - 根据不同的layout模式，进行对应的算法逻辑（这步只使用flexbox layout）
    - 根据viewport，经layout算法处理后，得到最终的计算值
    - NOTE：在第二步解析HTML时，遇到外链会发起请求，假设此时接收到了JS的脚本并完成了对应的解码，中止排版开始执行脚本
    - NOTE：此时脚本内部更改了某个元素的css规则（布局、box-model等），则会引发layout计算，并重新排版，即「重排」
    - NOTE：大量的「重排」会造成性能（CPU、内存）问题，减少「重排」[查看哪些css属性会引发重排](https://csstriggers.com/)
5. 绘制
    - 绘制会使用图形环境，即GPU。（由浏览器内部去调用GPU接口操作，当然webGL可以由用户操作GPU）
    - 根据排版绘制每一个像素点
    - NOTE：依旧是JS脚本，更改了某些css规则（颜色、图片、字体等），导致绘制成功的像素区域，引发了重新绘制，即「重绘」
    - NOTE：大量的「重绘」也会造成性能（GPU）问题。

# css rule

## selector

css选择器可以指**简单选择器、复合选择器、复杂选择器、选择器列表**

### simple selector

> 简单选择器是在一个元素上存在一个单一的条件

- type selector
    - [<wq-name>](https://drafts.csswg.org/selectors-4/#typedef-wq-name) `|` [<ns-prefix>](https://drafts.csswg.org/selectors-4/#typedef-ns-prefix) `?` `*`
- universal selector
    - `*`
- id selector
    - [<hash-token>](https://drafts.csswg.org/css-syntax-3/#hash-token-diagram)
- class selector
    - `.`[<ident-token>](https://drafts.csswg.org/css-syntax-3/#ident-token-diagram)
- attribute selector
    - `[`[<wq-name>](https://drafts.csswg.org/selectors-4/#typedef-wq-name) `]` `|` `[`[<wq-name>](https://drafts.csswg.org/selectors-4/#typedef-wq-name) [<attr-matcher>](https://drafts.csswg.org/selectors-4/#typedef-attr-matcher) `[`[<string-token>](https://drafts.csswg.org/css-syntax-3/#string-token-diagram) `|` [<ident-token>]() `]` [<attr-modifier>?](https://drafts.csswg.org/selectors-4/#typedef-attr-modifier) `]`
- pseudo-class selector
    - `:`[<ident-token>](https://drafts.csswg.org/css-syntax-3/#ident-token-diagram) `|` `:`[function-token](https://drafts.csswg.org/css-syntax-3/#function-token-diagram) [any-value](https://drafts.csswg.org/css-syntax-3/#typedef-any-value) `)`
- pseudo-element selector(CSS3+ use double-colon)
    - `: <pseudo-class-selector>`

### compound selector

> 复合选择器是一系列简单选择器并且它们不被组合器分隔开，它表示在单个元素上面同时存在一组条件
>
> 复合选择器中如果包含type selector或universal selector，那么该选择器必须位于序列的第一位，且序列中只允许一个type selector或universal selector
>
> NOTE：由于空格(whitespace)代表后代组合器(descendant combinator)，因此复合选择器中的简单选择器之间不允许有空格

```css
/* <div class="a" id="b" attr="c"></div> */
div.a#b[attr=c] {
  color: red;
}

/* If there is whitespace, just like */
/*
  <div class="a">
    <div id="b" attr="c"></div>
  </div> 
*/
div.a #b[attr=c] {
  color: red;
}
```

### complex selector

复杂选择器是由一个或多个由组合器分隔的复合选择器的序列


```css
/*
  <div class="a">
    <div class="b"></div> // color
  </div> 
*/
div.a > div.b {
  color: red;
}
/*
  <div class="a"></div>
  <div class="b"></div> // color
*/
div.a + div.b {
  color: red;
}
```

### selector list

选择器列表是以逗号分隔的简单、复合、复杂选择器列表

```css
div, p, h1 {
  color: red;
}
div.a, div#b {
  color: red;
}
div.a + div.b, div#c div#d {
  color: red;
}
```

### combinator

- Descendant combinator( )
    - `div p`
- Child combinator(>)
    - `div > p`
- Next-sibling combinator(+)
    - `div + p`
- Subsequent-sibling combinator(~)
    - `div ~ p`

## specificity

计算选择器的specificity，指的是[简单选择器](#simple-selector)
如果是选择器列表，则遍历每一个选择器

- `id` selectors (`=a`)
- `class` selectors, `attribute` selectors, `pseudo-classes` (`=b`)
- `type` selectors, `pseudo-elements` (`=c`)
- ignore `universal` selector

```text
*               /* a=0 b=0 c=0 */
li              /* a=0 b=0 c=1 */
ul li           /* a=0 b=0 c=2 */
ul ol+li        /* a=0 b=0 c=3 */
h1 + *[rel=up]  /* a=0 b=1 c=1 */
ul ol li.red    /* a=0 b=1 c=3 */
li.red.level    /* a=0 b=2 c=1 */
#x34y           /* a=1 b=0 c=0 */

visit https://drafts.csswg.org/selectors-4/#specificity-rules
#s12:not(#foo)   /* a=1 b=0 c=1 */
.foo :is(.bar, #baz)
                /* a=1 b=1 c=0 */
```

# flexbox layout

> [flexbox](https://drafts.csswg.org/css-flexbox/)
