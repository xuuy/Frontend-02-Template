/**
 * 暴力匹配
 * 时间复杂度: O(MN)
 * */
function violenceMatch(pattern, string) {
  const M = pattern.length;
  const N = string.length;
  for (let i = 0; i <= N - M; i++) {
    for (var j = 0; j < M; j++) {
      if (pattern[j] !== string[i + j]) break;
    }
    // pattern 全都匹配了
    if (j === M) return i;
  }
  // string 中不存在 pattern 子串
  return -1;
}

/**
 * 基于next匹配
 * 时间复杂度: O(M+N)
 * @param {string} pattern 
 * @param {string} string 
 */
function KMPMatch(pattern, string) {
  const M = pattern.length
  const N = string.length
  
  // step1: 配置next数组
  const next = (function() {
    // next数组是由最大长度值表整体向右移动一位得到的
    // 初值赋为-1
    let next = [-1]
    // 前缀索引
    let k = -1
    // 后缀索引
    let j = 0
    while (j < M - 1) {
      // 不断的递归前缀索引k
      // pattern: abab  string: abacabab
      // 优化前匹配11次，优化后匹配10次
      // ab   -> k=0    j=1 [-1,0]
      // aba  -> k=-1,0 j=2 [-1,0,0]    优化前
      // abab -> k=1    j=3 [-1,0,0,1]  优化前
      
      // aba  -> k=-1,0 j=2 [-1,0,-1]   优化后
      // abab -> k=1    j=3 [-1,0,-1,0] 优化后
      if (k === -1 || pattern[j] === pattern[k]) {
        k++
        j++
        // 优化前:
        // next[j] = k

        // 优化后: 如果两个字符相同，则复用
        if (pattern[j] !== pattern[k]) {
          next[j] = k
        } else {
          next[j] = next[k]
        }
      } else {
        k = next[k]
      }
    }
    return next
  })()

  // 索引i不断向前推进
  let i = 0
  let j = 0
  // step2: 基于next搜索
  while (i < N && j < M) {
    if (j === -1 || string[i] === pattern[j]) {
      j++
      i++
    } else {
      // 匹配失败时，模式串pattern向右移动: 失配字符所在位置 - 失配字符对应的next值
      // 当j=6匹配失败，next[j]=4
      // 则j=4, 相当于pattern向右移动2位
      // abababx    -> j=6匹配失败
      // ababababx
      //   abababx  -> pattern向右移动2位
      j = next[j]
      // 防止匹配失败后，还会不断递归j直到j=-1才结束
      // 会造成多余的匹配次数
      if (i === N - 1) {
        i++
      }
    }
  }
  // 如果j等于pattern的长度则表示匹配成功
  return j === M ? i - j : -1
}

// export {
//   violenceMatch,
//   KMPMatch,
// }

exports.match = KMPMatch