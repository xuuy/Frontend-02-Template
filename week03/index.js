const hexMap = {
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
};

/** 判断是几进制 */
const isWhichRadix = (number) => {
  return /0b|0B/.test(number)
    ? 2
    : /0o|0O/.test(number)
      ? 8
      : /0x|0X/.test(number)
        ? 16
        : 10;
};

/**
 * 检查字符串是否是规范的数字
 * 无法转换的则返回NaN
 * @returns {{
 *   flag: '0' | '1' | 'NaN' | 'Infinity' | 'Number',
 *   radix: 0 | 2 | 8 | 10 | 16,
 *   json: {}
 * }} flag: 1-number类型
 * */
const checkSpecNumber = (string) => {
  // unll、''直接返回0
  if (string === "" || string === null) {
    return {
      flag: "0",
      radix: 0,
      json: {},
    };
  }

  // number类型，则返回输入
  if (typeof string === "number") {
    return {
      flag: "1",
      radix: 0,
      json: {},
    };
  }

  // 非string类型直接返回NaN
  if (typeof string !== "string") {
    return {
      flag: "NaN",
      radix: 0,
      json: {},
    };
  }

  // 规范的可以转换成数字的字符(boxBOX a-f A-F 0123456789 e Infinity . + -)
  // 1. Infinity /^Infinity$/
  // 2. 二、八、十六进制 /^((?:0b|0B)(?:[0-1]+)(?![0-1])|(?:0o|0O)(?:[0-7]+)(?![0-7])|(?:0x|0X)(?:[0-9a-f-A-F]+)(?![0-9a-f-A-F]))$/
  // 3. 十进制包含科学计数法 /^([+-])?((\.[0-9]+|([1-9]+[0-9]*|0)(\.[0-9]*|\.)?)([eE][+-]{0,1}[0-9]+)?|(0+[0-9]*))(?![_$a-zA-Z0-9])$/
  const reg$1 = /^([+-])?Infinity$/;
  const reg$2 = /^([+-])?((0b|0B)([0-1]+)(?![0-1])|(0o|0O)([0-7]+)(?![0-7])|(0x|0X)([0-9a-f-A-F]+)(?![0-9a-f-A-F]))$/;
  const reg$3 = /^([+-])?((\.[0-9]+|([1-9]+[0-9]*|0)(\.[0-9]*|\.)?)([eE][+-]{0,1}[0-9]+)?|(0+[0-9]*))(?![_$a-zA-Z0-9])$/;

  if (reg$1.test(string)) {
    const json = groupNormalize();
    return {
      flag: "Infinity",
      radix: 0,
      json,
    };
  } else if (reg$2.test(string)) {
    const json = groupNormalize();
    return {
      flag: "number",
      radix: isWhichRadix(string),
      json,
    };
  } else if (reg$3.test(string)) {
    const json = groupNormalize(10);
    return {
      flag: "number",
      radix: 10,
      json,
    };
  }
  return {
    flag: "NaN",
    radix: 0,
    json: {},
  };
};

/** 将reg匹配到的组normalize */
const groupNormalize = (radix) => {
  if (radix === 10) {
    const operator = RegExp.$1;
    const int = RegExp.$4; // 整数
    const fraction = RegExp.$5; // 小数
    const e = RegExp.$6; // 科学计数
    const zeroNumber = RegExp.$7; //以0开头的整数

    return { operator, int, fraction, e, zeroNumber };
  }
  const operator = RegExp.$1;
  const binaryPerfix = RegExp.$3;
  const binary = RegExp.$4;
  const octalPerfix = RegExp.$5;
  const octal = RegExp.$6;
  const hexPerfix = RegExp.$7;
  const hex = RegExp.$8;

  // console.log('match group =>', operator, binaryPerfix, binary, octalPerfix, octal, hexPerfix, hex)

  return {
    operator,
    binaryPerfix,
    binary,
    octalPerfix,
    octal,
    hexPerfix,
    hex,
  };
};

/** 其他进制 转换为 十进制 */
const toDecimal = (string, radix) => {
  // 先分割成数组，然后顺序反转 011 => 110
  const strs = string.split("").reverse();
  return strs.reduce((sum, current, index) => {
    // 二进制 -> 十进制: 1 * 2 ** 0 + 1 * 2 ** 1 + 0 * 2 ** 2
    sum += (hexMap[current] || current) * radix ** index;
    return sum;
  }, 0);
};

/** 通过+-转换为正负数字 */
const toNumberByOperator = (string, operator) => {
  if (!operator || operator === "+") {
    return string;
  }
  return `-${string}`;
};

export const StringToNumber = (string) => {
  const { flag, radix, json } = checkSpecNumber(string);

  // console.log(flag, radix, json)
  if (flag === "0" || flag === "NaN") {
    return eval(flag);
  }

  if (flag === "1") {
    return string;
  }

  const {
    operator,
    binaryPerfix,
    binary,
    octalPerfix,
    octal,
    hexPerfix,
    hex,
    int,
    fraction,
    e,
    zeroNumber,
  } = json;

  if (flag === "Infinity") {
    const result = toNumberByOperator(flag, operator);
    return new Number(result).valueOf();
  }
  // 二进制、八进制、十六进制
  if (radix && radix !== 10) {
    // 其实这里可以使用~~，或者 * 1，因为最后的结果已经是十进制数了，不会在发生转换
    // 当然最好使用new Number，~~会发生两次二进制运算
    const result = toNumberByOperator(
      toDecimal(binary || octal || hex, radix),
      operator
    );
    return new Number(result).valueOf();
  }

  // 十进制
  if (radix && radix === 10) {
    // 科学计数法
    if (e) {
      // 获取指数
      const exponent = e.split(/[eE]/)[1];
      // 记录小数和小数的位数
      let m;
      let n;
      if (fraction !== "") {
        n = fraction.split(".")[1];
        m = n.length;
      }
      // 先将小数位数乘以整数再除，是防止IEEE754的浮点数偏移问题。例如：1.11 / 10，正确方式是 111 / 1000
      const result = toNumberByOperator(
        m
          ? (int * 10 ** m + n * 1) / 10 ** (m + Math.abs(exponent))
          : int * 10 ** exponent,
        operator
      );
      return new Number(result).valueOf();
    }
    const result = zeroNumber ? toNumberByOperator(zeroNumber, operator) : toNumberByOperator(`${int}${fraction}`, operator);
    return new Number(result).valueOf();
  }
};


const numMapHex = {
  10: 'a',
  11: 'b',
  12: 'c',
  13: 'd',
  14: 'e',
  15: 'f',
}

const prefix = radix => {
  return radix === 2
    ? '0b'
    : radix === 8
      ? '0o'
      : radix === 16
        ? '0x'
        : ''
}

/** %是否为0 */
const isModZero = (number, radix) => number % radix === 0

/** 十进制 转换为 其他进制 */
const toRadixNumber = (number, radix, needPrefix = true) => {
  if (number < radix) {
    return needPrefix 
      ? prefix(radix) + (numMapHex[number] || number)
      : numMapHex[number] || number
  }
  let arr = []
  while(number !== 0) {
    if (isModZero(number, radix)) {
      number /= radix
      arr.push(0)
    } else {
      const n = number % radix
      number = (number - n) / radix
      arr.push(n)
    }
  }
  if (radix === 16) {
    arr = arr.map(n => numMapHex[n] || n)
  }
  return needPrefix
    ? prefix(radix) + arr.reverse().join('')
    : arr.reverse().join('')
};

/** 将小数部分转换成对应的进制整数 */
const fractionToInt = (fraction, radix) => {
  const arr = []
  const reg = /([01])\.?(\d+)?/;
  // count的作用是防止无限循环，比如0.1，所以只记录32位吧
  let count = 0
  while(fraction !== 0 && count <= 32) {
    const ret = fraction * radix;
    const group = reg.exec(ret);
    arr.push(group[1])
    count++
    fraction = group[2] == undefined ? 0 : `0.${group[2]}`
  }
  return `.${arr.join('')}`
}

/**
 * 
 * @param {number} number 
 * @param {2 | 8 | 10 | 16} radix
 */
export const NumberToString = (number, radix = 10) => {
  // unll、''直接返回0
  if (number === "" || number === null) {
    return "0";
  }

  if (typeof number !== "number") {
    return "NaN";
  }

  const reg$1 = /^([+-])?Infinity$/;
  const reg$3 = /^([+-])?((\.[0-9]+|([1-9]+[0-9]*|0)(\.[0-9]*|\.)?)([eE][+-]{0,1}[0-9]+)?|(0+[0-9]*))(?![_$a-zA-Z0-9])$/;

  if (!Number.isFinite(number)) {
    if (Number.isNaN(number)) return "NaN";
    reg$1.test(number)
    return RegExp.$1 ? "-Infinity" : "Infinity"
  }

  // 不管number是什么进制数，先转换成10进制，通过10进制统一转指定的radix
  number = StringToNumber(number)
  if (radix === 10) {
    return '' + number
  }

  let operator
  if (reg$3.test(number)) {
    if (RegExp.$1) {
      // 若为负数，则取绝对值，并记录+-
      number = Math.abs(number)
      operator = RegExp.$1
    }
  }

  // 判断是否有小数，且不是科学计数法
  if (RegExp.$5 && !RegExp.$6) {
    const operator = RegExp.$1
    const int = RegExp.$4;
    const fraction = RegExp.$5;
    const _int = toRadixNumber(int, radix, false);
    const _fraction = fractionToInt(`0${fraction}`, radix)
    // 不清楚二八十六进制的字面量如何表示，所以直接返回转换后的数字
    return toNumberByOperator(_int + _fraction, operator)
  }


  return toNumberByOperator(toRadixNumber(number, radix), operator)
}