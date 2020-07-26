const EOF = Symbol('EOF')

const EOFToken = {
  type: 'EOF'
}

let currentToken = null
let currentAttr = {
  name: '',
  value: null
}
let currentTextNode = null

const stack = [{ nodeType: 'document', nodeName: 'document', children: [] }]

const emit = (token) => {
  if (token.type === 'DOCTYPE') {
    return
  }
  let top = stack[stack.length - 1]

  if (token.type === 'startTag') {
    let element = {
      nodeType: 'element',
      children: [],
      attributes: []
    }

    element.nodeName = token.tagName

    for (const p in token) {
      if (token.hasOwnProperty(p)) {
        if (p !== 'tagName' && p !== 'type') {
          element.attributes.push({
            name: p,
            value: token[p]
          })
        }
      }
    }

    top.children.push(element)
    // element.parentNode = top

    if (!token.isSelfClosing) {
      stack.push(element)
    }

    currentTextNode = null
  } else if (token.type === 'endTag') {
    if (top.nodeName !== token.tagName) {
      throw new Error('Tag doesn\'t match')
    } else {
      stack.pop()
    }

    currentTextNode = null
  } else if (token.type === 'text') {
    if (!currentTextNode) {
      currentTextNode = {
        nodeType: 'text',
        text: ''
      }
      top.children.push(currentTextNode)
    }
    currentTextNode.text += token.data
  }
  currentToken = null
  currentAttr = {
    name: '',
    value: null
  }
}

const data = (c) => {
  if (c === '&') {
    // &nbsp;
    return characterReference
  } else if (c === '<') {
    return tagOpen
  } else if (c === EOF) {
    emit(EOFToken)
    return data
  } else {
    // <div><a9090faosfojfadf</div>
    emit({
      type: 'text',
      data: c
    })
    return data
  }
}

const tagOpen = c => {
  if (c === '!') {
    return markupDeclarationOpen
  } else if (c === '/') {
    return endTagOpen
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: ''
    }
    return tagName(c)
  } else if (c === '?') {
    currentToken = {
      type: 'comment',
      data: ''
    }
    return bogusComment(c)
  } else if (c === EOF) {
    emit(EOFToken)
  } else {
    return data(c)
  }
}

const endTagOpen = c => {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(c)
  } else if (c === '>') {
    return data
  } else if (c === 'EOF') {
    emit(EOFToken)
    return data
  } else {
    currentToken = {
      type: 'comment',
      data: ''
    }
    return bogusComment(c)
  }
}

const tagName = c => {
  if (c.match(/^[\t\f\n\s]$/)) {
    return beforeAttributeName
  } else if (c === '/') {
    return selfClosingStartTag
  } else if (c === '>') {
    emit(currentToken)
    return data
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c.toLowerCase()
    return tagName
  } else if (c === EOF) {
    emit(EOFToken)
    return data
  } else {
    currentToken.tagName += c
    return tagName
  }
}

const selfClosingStartTag = c => {
  if (c === '>') {
    currentToken.isSelfClosing = true
    emit(currentToken)
    return data
  } else if (c === EOF) {
    emit(EOFToken)
    return
  } else {
    return beforeAttributeName(c)
  }
}

const beforeAttributeName = c => {
  if (c.match(/^[\t\f\n\s]$/)) {
    return beforeAttributeName
  } else if (c === '/' || c === '>' || c === EOF) {
    // <a /  <a >  <a EOF
    return afterAttributeName(c)
  } else if (c === '=') {
    currentAttr.name = c
    currentAttr.value = ''
    return attributeName
  } else {
    currentAttr.name = ''
    currentAttr.value = ''
    return attributeName(c)
  }
}

const afterAttributeName = c => {
  if (c.match(/^[\t\f\n\s]$/)) {
    return afterAttributeName
  } else if (c === '/') {
    return selfClosingStartTag
  } else if (c === '=') {
    return beforeAttributeValue
  } else if (c === '>') {
    emit(currentToken)
    return data
  } else if (c === EOF) {
    emit(EOFToken)
    return data
  } else {
    currentAttr.name = ''
    currentAttr.value = ''
    return attributeName(c)
  }
}

const attributeName = c => {
  if (c.match(/^[\t\f\n\s/\>]$/) || c === EOF) {
    return afterAttributeName(c)
  } else if (c === '=') {
    return beforeAttributeValue
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentAttr.name += c.toLowerCase()
    return attributeName
  } else if (c.match(/["'<]/)) {
    currentAttr.name += c
    return attributeName
  } else {
    currentAttr.name += c
    return attributeName
  }
}

const beforeAttributeValue = c => {
  if (c.match(/^[\t\f\n\s/>]$/)) {
    return beforeAttributeValue
  } else if (c === '"') {
    return attributeValueDoubleQuoted
  } else if (c === '\'') {
    return attributeValueSingleQuoted
  } else if (c === '<') {
    emit(currentToken)
    return data
  } else {
    return attributeValueUnquoted(c)
  }
}

const attributeValueDoubleQuoted = c => {
  if (c === '"') {
    currentToken[currentAttr.name] = currentAttr.value
    return afterAttributeValueQuoted
  } else if (c === '&') {
    return
  } else if (c === EOF) {
    currentToken[currentAttr.name] = currentAttr.value
    emit(EOFToken)
    return
  } else {
    currentAttr.value += c
    return attributeValueDoubleQuoted
  }
}

const attributeValueSingleQuoted = c => {
  if (c === '\'') {
    currentToken[currentAttr.name] = currentAttr.value
    return afterAttributeValueQuoted
  } else if (c === '&') {
    return
  } else if (c === EOF) {
    currentToken[currentAttr.name] = currentAttr.value
    emit(EOFToken)
    return
  } else {
    currentAttr.value += c
    return attributeValueSingleQuoted
  }
}

const attributeValueUnquoted = c => {
  if (c.match(/[\t\f\n\s]/)) {
    currentToken[currentAttr.name] = currentAttr.value
    return beforeAttributeName
  } else if (c === '&') {
    return
  } else if (c === '>') {
    currentToken[currentAttr.name] = currentAttr.value
    emit(currentToken)
    return data
  } else if (c === EOF) {
    currentToken[currentAttr.name] = currentAttr.value
    emit(EOFToken)
    return
  } else if (c.match(/["'\<`=]/)) {
    currentAttr.value += c
    return attributeValueUnquoted
  } else {
    currentAttr.value += c
    return attributeValueUnquoted
  }
}

const afterAttributeValueQuoted = c => {
  if (c.match(/[\t\f\n\s]/)) {
    return beforeAttributeName
  } else if (c === '/') {
    return selfClosingStartTag
  } else if (c === '>') {
    emit(currentToken)
    return data
  } else if (c === EOF) {
    emit(EOFToken)
    return
  } else {
    return beforeAttributeName(c)
  }
}

const markupDeclarationOpen = c => {
  if (c === '-') {
    currentToken = {
      type: 'comment',
      data: ''
    }
    return comment
  } else if (c.match(/[DOCTYPEdoctype]/)) {
    if (c === 'e' || c === 'E') {
      return doctype
    }
    return markupDeclarationOpen
  } else if (c.match(/[\[CDATA\[]/)) {
    // CDATA 可以直接包含未经转义的文本 <![CDATA[  < > & ]]>
    // 注意，CDATA 片段不应该在 HTML 中被使用；它只在 XML 中有效
    if (c === '[') {
      return CDATASection
    }
    currentToken = {
      type: 'comment',
      data: '[CDATA['
    }
    return bogusComment
  } else {
    currentToken = {
      type: 'comment',
      data: ''
    }
    return bogusComment
  }
}

const doctype = c => {
  if (c.match(/^[\t\f\n\s]$/)) {
    return beforeDOCTYPEName
  } else if (c === '>') {
    return beforeDOCTYPEName(c)
  } else if (c === EOF) {
    currentToken = {
      type: 'DOCTYPE',
      name: '',
      forceQuirksFlag: true
    }
    emit(currentToken)
    emit(EOFToken)
    return data
  } else {
    return beforeDOCTYPEName(c)
  }
}

const beforeDOCTYPEName = c => {
  if (c.match(/^[\t\f\n\s]$/)) {
    return beforeDOCTYPEName
  } else if (c.match(/[a-zA-Z]/)) {
    currentToken = {
      type: 'DOCTYPE',
      name: '',
    }
    currentToken.name += c.toLowerCase()
    return DOCTYPEName
  } else if (c === '>') {
    currentToken = {
      type: 'DOCTYPE',
      name: '',
      forceQuirksFlag: true
    }
    emit(currentToken)
    return data
  } else if (c === EOF) {
    currentToken = {
      type: 'DOCTYPE',
      name: '',
      forceQuirksFlag: true
    }
    emit(currentToken)
    emit(EOFToken)
    return data
  } else {
    currentToken = {
      name: c
    }
    return DOCTYPEName
  }
}

const DOCTYPEName = c => {
  if (c.match(/^[\t\f\n\s]$/)) {
    return afterDOCTYPEName
  } else if (c === '>') {
    emit(currentToken)
    return data
  } else if (c.match(/[a-zA-Z]/)) {
    currentToken.name += c.toLowerCase()
    return DOCTYPEName
  } else if (c === EOF) {
    currentToken.forceQuirksFlag = true
    emit(currentToken)
    emit(EOFToken)
    return data
  } else {
    currentToken.name += c
    return DOCTYPEName
  }
}

const afterDOCTYPEName = c => {
  if (c.match(/^[\t\f\n\s]$/)) {
    return afterDOCTYPEName
  } else if (c === '>') {
    emit(currentToken)
    return data
  } else if (c === EOF) {
    currentToken = {
      type: 'DOCTYPE',
      name: '',
      forceQuirksFlag: true
    }
    emit(currentToken)
    emit(EOFToken)
    return data
  } else {
    currentToken.forceQuirksFlag = true
    return BogusDOCTYPE(c)
  }
}

const BogusDOCTYPE = c => {
  if (c === '>') {
    emit(currentToken)
    return data
  } else if (c === EOF) {
    emit(currentToken)
    emit(EOFToken)
    return data
  } else {
    return BogusDOCTYPE
  }
}

const bogusComment = c => {

}

const comment = c => {
  if (c === '-') {
    // <!-
    return commentStartDash
  } else if (c === '>') {
    // <!->
    return data
  } else {
    // <!- anything else
    return comment
  }
}

const commentStartDash = c => {
  if (c === '-') {
    // <!--
    return commentEnd
  } else if (c === '>') {
    // <!->
    return data
  } else if (c === EOF) {
    return 
  } else {
    // <!- anything else
    return comment
  }
}

module.exports.parserHTML = function(html) {
  let state = data

  for (const c of html) {
    state = state(c)
  }

  return stack
}