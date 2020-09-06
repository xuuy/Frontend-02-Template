const find = (pattern, source) => {
  let starCount = 0
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === '*')
      starCount++
  }
  
  if (starCount === 0) {
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] !== source[i] && pattern[i] !== '?')
        return false
    }
    return true
  }
  
  let i, lastIndex = 0
  
  for (i = 0; pattern[i] !== '*'; i++) {
    if (pattern[i] !== source[i] && pattern[i] !== '?')
      return false
  }
  
  lastIndex = i
  
  for (let j = 0; j < starCount - 1; j++) {
    i++
    let subPattern = ''
    while (pattern[i] !== '*') {
      subPattern += pattern[i]
      i++
    }
    
    let re = new RegExp(subPattern.replace(/\?/g, '[\\s\\S]'), 'g')
    re.lastIndex = lastIndex
    
    console.log(re.exec(source))
    
    lastIndex = re.lastIndex
  }
  
  console.log(lastIndex)
  
  // a*b *av  ab avsdvasv
  for (let j = 0; j <= source.length - lastIndex && pattern[pattern.length - j] !== '*'; j++) {
    if (pattern[pattern.length - j] !== source[source.length - j] && pattern[pattern.length - j] !=='?')
      return false
  }
  
  return true
}

console.log(find('a*b*av', 'abavsdvasv'))