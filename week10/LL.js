const re = /([0-9]+)|([ \t]+)|([\r\n]+)|(\+)|(-)|(\*)|(\/)/g

const name = ['Number', 'WhiteSpace', 'LineTerminator', '+', '-', '*', '/']

const match = function* (str) {
  let result
  let lastIndex
  while (true) {
    lastIndex = re.lastIndex
    result = re.exec(str)
    if (!result) break
    if (re.lastIndex - lastIndex > result[0].length) break
    
    let token = {
      type: null,
      value: null
    }
    for (let i = 1;i <= name.length;i++) {
      if (result[i]) {
        token.type = name[i - 1]
        break
      }
    }
    token.value = result[0]
    yield token
  }
  yield {
    token: 'EOF'
  }
}

const source = []
for (const m of match('1 + 2 - 3')) {
  if (m.type !== 'WhiteSpace' && m.type !== 'LineTerminator')
    source.push(m)
}

/**
 * <MultiplicativeExpression> ::= <Number>
 *  | <MultiplicativeExpression> "*" <Number>
 *  | <MultiplicativeExpression> "/" <Number>
 * @param source
 */
const MultiplicativeExpression = (source) => {
  if (source[0].type === 'Number') {
    let node = {
      type: 'MultiplicativeExpression',
      children: [source[0]]
    }
    source[0] = node
    return MultiplicativeExpression(source)
  } else if(source[0].type === 'MultiplicativeExpression' && source[1].type && source[1].type.match(/\*|\//)) {
    let node = {
      type: 'MultiplicativeExpression',
      operator: source[1].type,
      children: []
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    node.children.push(source.shift())
    source.unshift(node)
    return MultiplicativeExpression(source)
  } else {
    return source[0]
  }
}

/**
 * <AdditiveExpression> ::= <MultiplicativeExpression>
 *  | <AdditiveExpression> "+" <MultiplicativeExpression>
 *  | <AdditiveExpression> "-" <MultiplicativeExpression>
 * @param source
 */
const AdditiveExpression = (source) => {
  if (source[0].type === 'MultiplicativeExpression') {
    let node = {
      type: 'AdditiveExpression',
      children: [source[0]]
    }
    source[0] = node
    return AdditiveExpression(source)
  } else if (source[0].type === 'AdditiveExpression' && source[1].type && source[1].type.match(/\+|-/)) {
    let node = {
      type: 'AdditiveExpression',
      operator: source[1].type,
      children: []
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    MultiplicativeExpression(source)
    node.children.push(source.shift())
    source.unshift(node)
    return AdditiveExpression(source)
  } else if (source[0].type === 'AdditiveExpression') {
    return source[0]
  }
  MultiplicativeExpression(source)
  return AdditiveExpression(source)
}

const Expression = (tokens) => {
  if (tokens[0].type === '' && tokens[1].type === 'EOF') {
    let node = {
      type: 'Expression',
      children: [tokens.shift(), tokens.shift()]
    }
    tokens.unshift(node)
    return node
  }
  AdditiveExpression(source)
  return Expression(source)
}

console.log(AdditiveExpression(source, null, 2))