# 产生式

之前还不太理解，这周通过代码的形式彻底懂了产生式的递归作用了

```
<MultiplicativeExpression> ::= <Number>
 | <MultiplicativeExpression> "*" <Number>
 | <MultiplicativeExpression> "/" <Number>

<AdditiveExpression> ::= <MultiplicativeExpression>
  | <AdditiveExpression> "+" <MultiplicativeExpression>
  | <AdditiveExpression> "-" <MultiplicativeExpression>
```

# Trie 

字典树，哈希树的变种
应用场景：文本词频统计

# Wildcard

通配符

*匹配0至多个任意字符
？匹配单个任意字符

