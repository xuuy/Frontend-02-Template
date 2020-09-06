const $ = Symbol('$')
class Trie {
  constructor() {
    this.root = Object.create(null)
  }
  
  insert(word) {
    let node = this.root
    for (const w of word) {
      if (!node[w])
        node[w] = Object.create(null)
      node = node[w]
    }
    
    if (!($ in node)) {
      node[$] = 0
    }
    node[$]++
  }
}

const randomWord = len => {
  let s = ''
  for (let i = 0; i < len; i++) {
    s += String.fromCharCode(Math.random() * 26 + 97)
  }
  return s
}

let trie = new Trie()
for (let i = 0; i < 10000; i++) {
  trie.insert(randomWord(4))
}

console.log(JSON.stringify(trie))

