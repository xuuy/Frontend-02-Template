/**
 * 基于next匹配
 * 时间复杂度: O(M+N)
 * @param {string} pattern
 * @param {string} source
 */
function KMP(pattern, source) {
  const M = pattern.length
  const N = source.length
  let next = new Array(pattern.length).fill(0)
  let _next
  
  {
    let i = 1, j = 0
    while (i <= pattern.length) {
      if (pattern[j] === pattern[i] && pattern[i]) {
        ++i, ++j
        next[i] = j
      } else {
        if (j > 0) {
          j = next[j]
        } else {
          ++i
        }
      }
    }
  }
  
  {
    let i = 0, j = 0
    while (i < source.length && j < pattern.length) {
      if (pattern[j] === source[i]) {
        ++i, ++j
      } else {
        if (j > 0)
          j = next[j]
        else
          ++i
      }
    }
    // 如果j等于pattern的长度则表示匹配成功
    console.log(j === M ? i - j : -1)
  }
  
  {
    // next数组是由最大长度值表整体向右移动一位得到的
    // 初值赋为-1
    _next = [-1]
    // 前缀索引
    let k = -1
    // 后缀索引
    let j = 0
    while (j < M - 1) {
      if (k === -1 || pattern[j] === pattern[k]) {
        k++
        j++
        if (pattern[j] !== pattern[k]) {
          _next[j] = k
        } else {
          _next[j] = _next[k]
        }
      } else {
        k = _next[k]
      }
    }
  }
  
  {
    let i = 0, j = 0
    while (i < N && j < M) {
      if (j === -1 || source[i] === pattern[j]) {
        j++
        i++
      } else {
        j = _next[j]
        if (i === N - 1) {
          i++
        }
      }
    }
    // 如果j等于pattern的长度则表示匹配成功
    console.log(j === M ? i - j : -1)
  }
}

KMP('aba?babx', 'abababaababx')