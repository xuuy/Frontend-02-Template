import { StringToNumber, NumberToString } from ".";

describe('week03', () => {
  describe('stringToNumber', () => {
    describe("undefined", () => {
      it("input undefined", () => {
        expect(StringToNumber(undefined)).toBe(NaN);
      });
    });

    describe("null, empty string", () => {
      it("input null", () => {
        expect(StringToNumber(null)).toBe(0);
      });
    
      it("input empty string", () => {
        expect(StringToNumber('')).toBe(0);
      });
    });

    describe('number', () => {
      it("input 0", () => {
        expect(StringToNumber(0)).toBe(0);
      });
    
      it("input 1e1", () => {
        expect(StringToNumber(1e1)).toBe(10);
      });
    
      it("input 1.1231", () => {
        expect(StringToNumber(1.1231)).toBe(1.1231);
      });

      it("input 0b1", () => {
        expect(StringToNumber(0b1)).toBe(1);
      });

      it("input 0o10", () => {
        expect(StringToNumber(0o10)).toBe(8);
      });

      it("input 0x7f", () => {
        expect(StringToNumber(0x7f)).toBe(127);
      });
    })
    
    describe("Reference", () => {
      it("input object", () => {
        expect(StringToNumber({})).toBe(NaN);
      });
    
      it("input array", () => {
        expect(StringToNumber([])).toBe(NaN);
      });
    
      it("input function", () => {
        expect(StringToNumber((function () { }))).toBe(NaN);
      });
    });
    
    describe("word, chinese, emoji, contain number, radix prefix", () => {
      it('input word', () => {
        expect(StringToNumber('hello')).toBe(NaN)
      })
    
      it('input chinese', () => {
        expect(StringToNumber('你好')).toBe(NaN)
      })
    
      it('input emoji', () => {
        expect(StringToNumber('😈')).toBe(NaN)
      })
    
      it('input word contain number', () => {
        expect(StringToNumber('123hello')).toBe(NaN)
      })
    
      it('input word contain binary', () => {
        expect(StringToNumber('0b1hello')).toBe(NaN)
        expect(StringToNumber('0B1hello')).toBe(NaN)
      })
    
      it('input word contain ortal', () => {
        expect(StringToNumber('0o12hello')).toBe(NaN)
        expect(StringToNumber('0O12hello')).toBe(NaN)
      })
    
      it('input word contain hex', () => {
        expect(StringToNumber('0x12hello')).toBe(NaN)
        expect(StringToNumber('0X12hello')).toBe(NaN)
      })
    
      it('input binary radix prefix', () => {
        expect(StringToNumber('0b')).toBe(NaN)
        expect(StringToNumber('0B')).toBe(NaN)
      })
    
      it('input octal radix prefix', () => {
        expect(StringToNumber('0o')).toBe(NaN)
        expect(StringToNumber('0O')).toBe(NaN)
      })
    
      it('input hex radix prefix', () => {
        expect(StringToNumber('0x')).toBe(NaN)
        expect(StringToNumber('0X')).toBe(NaN)
      })
    
      it('input +', () => {
        expect(StringToNumber('+')).toBe(NaN)
      })
    
      it('input 1+', () => {
        expect(StringToNumber('1+')).toBe(NaN)
      })
    
      it('input -', () => {
        expect(StringToNumber('-')).toBe(NaN)
      })
    
      it('input 1-', () => {
        expect(StringToNumber('1-')).toBe(NaN)
      })
    
      it('input .', () => {
        expect(StringToNumber('.')).toBe(NaN)
      })
    
      it('input .0.', () => {
        expect(StringToNumber('.0.')).toBe(NaN)
      })

      it('input Infinitys', () => {
        expect(StringToNumber('Infinitys')).toBe(NaN)
      })
    })
    
    describe("binary", () => {
      it('input 0b112', () => {
        // 不合法的二进制
        expect(StringToNumber('0b112')).toBe(NaN)
      })
    
      it('input 0b11', () => {
        expect(StringToNumber('0b11')).toBe(3)
        expect(StringToNumber('0B11')).toBe(3)
      })
    
      it('input +0b11', () => {
        expect(StringToNumber('+0b11')).toBe(3)
        expect(StringToNumber('+0B11')).toBe(3)
      })
    
      it('input -0b11', () => {
        expect(StringToNumber('-0b11')).toBe(-3)
        expect(StringToNumber('-0B11')).toBe(-3)
      })
    })
    
    describe("octal", () => {
      it('input 0o2348', () => {
        // 不合法的八进制
        expect(StringToNumber('0o1128')).toBe(NaN)
        expect(StringToNumber('0O1128')).toBe(NaN)
      })
    
      it('input 0o2347', () => {
        expect(StringToNumber('0o2347')).toBe(1255)
        expect(StringToNumber('0O2347')).toBe(1255)
      })
    
      it('input +0o2347', () => {
        expect(StringToNumber('+0o2347')).toBe(1255)
        expect(StringToNumber('+0O2347')).toBe(1255)
      })
    
      it('input -0o2347', () => {
        expect(StringToNumber('-0o2347')).toBe(-1255)
        expect(StringToNumber('-0O2347')).toBe(-1255)
      })
    })
    
    describe("decimal", () => {
      it('input 1234', () => {
        expect(StringToNumber('1234')).toBe(1234)
      })
    
      it('input 001', () => {
        expect(StringToNumber('001')).toBe(1)
      })

      it('input 001.', () => {
        expect(StringToNumber('001.')).toBe(NaN)
      })
    
      it('input 00.1', () => {
        expect(StringToNumber('00.1')).toBe(NaN)
      })
    
      it('input 0.1', () => {
        expect(StringToNumber('0.1')).toBe(0.1)
      })
    
      it('input 10.1231', () => {
        expect(StringToNumber('10.1231')).toBe(10.1231)
      })
    
      it('input +10.1231', () => {
        expect(StringToNumber('+10.1231')).toBe(10.1231)
      })
    
      it('input -10.1231', () => {
        expect(StringToNumber('-10.1231')).toBe(-10.1231)
      })
    })
    
    describe("hex", () => {
      it('input 0x2348G', () => {
        // 不合法的十六进制
        expect(StringToNumber('0x2348G')).toBe(NaN)
        expect(StringToNumber('0x2348g')).toBe(NaN)
      })
    
      it('input 0x234', () => {
        expect(StringToNumber('0x234')).toBe(564)
        expect(StringToNumber('0X234')).toBe(564)
      })
    
      it('input 0x00234', () => {
        expect(StringToNumber('0x00234')).toBe(564)
        expect(StringToNumber('0X00234')).toBe(564)
      })
    
      it('input 0x234abcDef', () => {
        expect(StringToNumber('0x234abcDef')).toBe(9473609199)
        expect(StringToNumber('0X234abcDef')).toBe(9473609199)
      })
    
      it('input 0x00234abCDeF', () => {
        expect(StringToNumber('0x00234abCDeF')).toBe(9473609199)
        expect(StringToNumber('0X00234abCDeF')).toBe(9473609199)
      })
    
      it('input +0x234f', () => {
        expect(StringToNumber('+0x234f')).toBe(9039)
        expect(StringToNumber('+0X234f')).toBe(9039)
      })
    
      it('input -0x234f', () => {
        expect(StringToNumber('-0x234f')).toBe(-9039)
        expect(StringToNumber('-0X234f')).toBe(-9039)
      })
    })
    
    describe("Infinity", () => {
      it('input Infinity', () => {
        expect(StringToNumber('Infinity')).toBe(Infinity)
      })
    
      it('input +Infinity', () => {
        expect(StringToNumber('+Infinity')).toBe(Infinity)
      })
    
      it('input -Infinity', () => {
        expect(StringToNumber('-Infinity')).toBe(-Infinity)
      })
    })
    
    describe("科学计数法", () => {
      it('input 1e0', () => {
        expect(StringToNumber('1e0')).toBe(1)
        expect(StringToNumber('1E0')).toBe(1)
      })
    
      it('input 1e+0', () => {
        expect(StringToNumber('1e+0')).toBe(1)
        expect(StringToNumber('1E+0')).toBe(1)
      })
    
      it('input 1e-0', () => {
        expect(StringToNumber('1e-0')).toBe(1)
        expect(StringToNumber('1E-0')).toBe(1)
      })
    
      it('input 1e2', () => {
        expect(StringToNumber('1e2')).toBe(100)
      })
    
      it('input 1e-2', () => {
        expect(StringToNumber('1e-2')).toBe(0.01)
      })
    
      it('input 0e-2', () => {
        expect(StringToNumber('0e-2')).toBe(0)
      })
    
      it('input 0.1e-2', () => {
        expect(StringToNumber('0.1e-2')).toBe(0.001)
      })
    
      it('input +1.123341e-2', () => {
        expect(StringToNumber('+1.123341e-2')).toBe(0.01123341)
      })
    
      it('input -0.1e-2', () => {
        expect(StringToNumber('-0.1e-2')).toBe(-0.001)
      })

      it('input 9e999', () => {
        expect(StringToNumber('9e999')).toBe(Infinity)
      })
    })
  })

  describe('numberToString', () => {
    describe("undefined", () => {
      it("input undefined", () => {
        expect(NumberToString(undefined)).toBe('NaN');
      });
    });

    describe("null, empty string", () => {
      it("input null", () => {
        expect(NumberToString(null)).toBe('0');
      });
    
      it("input empty string", () => {
        expect(NumberToString('')).toBe('0');
      });
    });

    describe("Reference", () => {
      it("input object", () => {
        expect(NumberToString({})).toBe('NaN');
      });

      it("input array", () => {
        expect(NumberToString([])).toBe('NaN');
      });

      it("input function", () => {
        expect(NumberToString(() => {})).toBe('NaN');
      });
    });

    describe('binary', () => {
      it('input 0', () => {
        expect(NumberToString(0, 2)).toBe('0b0')
      })
  
      it('input 1', () => {
        expect(NumberToString(1, 2)).toBe('0b1')
      })

      it('input 2', () => {
        expect(NumberToString(2, 2)).toBe('0b10')
      })

      it('input 7', () => {
        expect(NumberToString(7, 2)).toBe('0b111')
      })

      it('input +127', () => {
        expect(NumberToString(+127, 2)).toBe('0b1111111')
      })

      it('input -127', () => {
        expect(NumberToString(-127, 2)).toBe('-0b1111111')
      })
    })

    describe('octal', () => {
      it('input 0', () => {
        expect(NumberToString(0, 8)).toBe('0o0')
      })
  
      it('input 7', () => {
        expect(NumberToString(7, 8)).toBe('0o7')
      })

      it('input 8', () => {
        expect(NumberToString(8, 8)).toBe('0o10')
      })

      it('input 28', () => {
        expect(NumberToString(28, 8)).toBe('0o34')
      })

      it('input +127', () => {
        expect(NumberToString(+127, 8)).toBe('0o177')
      })

      it('input -127', () => {
        expect(NumberToString(-127, 8)).toBe('-0o177')
      })
    })

    describe('decimal', () => {
      it('input 0', () => {
        expect(NumberToString(0)).toBe('0')
      })
  
      it('input 7', () => {
        expect(NumberToString(7)).toBe('7')
      })

      it('input 8.', () => {
        expect(NumberToString(8.)).toBe('8')
      })

      it('input .8', () => {
        expect(NumberToString(.8)).toBe('0.8')
      })

      // 有个空格
      it('input 8 ', () => {
        expect(NumberToString(8 )).toBe('8')
      })

      it('input 0.8', () => {
        expect(NumberToString(0.8)).toBe('0.8')
      })

      it('input 9.0', () => {
        expect(NumberToString(9.0)).toBe('9')
      })

      it('input +127', () => {
        expect(NumberToString(+127)).toBe('127')
      })

      it('input -127', () => {
        expect(NumberToString(-127)).toBe('-127')
      })
    })

    describe('hex', () => {
      it('input 15', () => {
        expect(NumberToString(15, 16)).toBe('0xf')
      })
  
      it('input 16', () => {
        expect(NumberToString(16, 16)).toBe('0x10')
      })

      it('input +127', () => {
        expect(NumberToString(+127, 16)).toBe('0x7f')
      })

      it('input -127', () => {
        expect(NumberToString(-127, 16)).toBe('-0x7f')
      })
    })

    describe('NaN', () => {
      it('input NaN -> 2', () => {
        expect(NumberToString(NaN, 2)).toBe('NaN')
      })

      it('input NaN -> 8', () => {
        expect(NumberToString(NaN, 8)).toBe('NaN')
      })

      it('input NaN -> 10', () => {
        expect(NumberToString(NaN)).toBe('NaN')
      })

      it('input NaN -> 16', () => {
        expect(NumberToString(NaN, 16)).toBe('NaN')
      })

      it('input +NaN -> 2', () => {
        expect(NumberToString(+NaN, 2)).toBe('NaN')
      })

      it('input +NaN -> 8', () => {
        expect(NumberToString(+NaN, 8)).toBe('NaN')
      })

      it('input +NaN -> 10', () => {
        expect(NumberToString(+NaN)).toBe('NaN')
      })

      it('input +NaN -> 16', () => {
        expect(NumberToString(+NaN, 16)).toBe('NaN')
      })

      it('input -NaN -> 2', () => {
        expect(NumberToString(-NaN, 2)).toBe('NaN')
      })

      it('input -NaN -> 8', () => {
        expect(NumberToString(-NaN, 8)).toBe('NaN')
      })

      it('input -NaN -> 10', () => {
        expect(NumberToString(-NaN)).toBe('NaN')
      })

      it('input -NaN -> 16', () => {
        expect(NumberToString(-NaN, 16)).toBe('NaN')
      })
    })

    describe('Infinity', () => {
      it('input Infinity -> 2', () => {
        expect(NumberToString(Infinity, 2)).toBe('Infinity')
      })

      it('input Infinity -> 8', () => {
        expect(NumberToString(Infinity, 8)).toBe('Infinity')
      })

      it('input Infinity -> 10', () => {
        expect(NumberToString(Infinity)).toBe('Infinity')
      })

      it('input Infinity -> 16', () => {
        expect(NumberToString(Infinity, 16)).toBe('Infinity')
      })

      it('input +Infinity -> 2', () => {
        expect(NumberToString(+Infinity, 2)).toBe('Infinity')
      })

      it('input +Infinity -> 8', () => {
        expect(NumberToString(+Infinity, 8)).toBe('Infinity')
      })

      it('input +Infinity -> 10', () => {
        expect(NumberToString(+Infinity)).toBe('Infinity')
      })

      it('input +Infinity -> 16', () => {
        expect(NumberToString(+Infinity, 16)).toBe('Infinity')
      })

      it('input -Infinity -> 2', () => {
        expect(NumberToString(-Infinity, 2)).toBe('-Infinity')
      })

      it('input -Infinity -> 8', () => {
        expect(NumberToString(-Infinity, 8)).toBe('-Infinity')
      })

      it('input -Infinity -> 10', () => {
        expect(NumberToString(-Infinity)).toBe('-Infinity')
      })

      it('input -Infinity -> 16', () => {
        expect(NumberToString(-Infinity, 16)).toBe('-Infinity')
      })
    })

    describe('maxinum safe integer', () => {
      it('input MAX_SAFE_INTEGER -> 2', () => {
        expect(NumberToString(Number.MAX_SAFE_INTEGER, 2)).toBe('0b11111111111111111111111111111111111111111111111111111')
      })

      it('input MAX_SAFE_INTEGER -> 8', () => {
        expect(NumberToString(Number.MAX_SAFE_INTEGER, 8)).toBe('0o377777777777777777')
      })

      it('input MAX_SAFE_INTEGER -> 10', () => {
        expect(NumberToString(Number.MAX_SAFE_INTEGER)).toBe('9007199254740991')
      })

      it('input MAX_SAFE_INTEGER -> 16', () => {
        expect(NumberToString(Number.MAX_SAFE_INTEGER, 16)).toBe('0x1fffffffffffff')
      })
    })

    describe('minimum safe integer', () => {
      it('input MIN_SAFE_INTEGER -> 2', () => {
        expect(NumberToString(Number.MIN_SAFE_INTEGER, 2)).toBe('-0b11111111111111111111111111111111111111111111111111111')
      })

      it('input MIN_SAFE_INTEGER -> 8', () => {
        expect(NumberToString(Number.MIN_SAFE_INTEGER, 8)).toBe('-0o377777777777777777')
      })

      it('input MIN_SAFE_INTEGER -> 10', () => {
        expect(NumberToString(Number.MIN_SAFE_INTEGER)).toBe('-9007199254740991')
      })

      it('input MIN_SAFE_INTEGER -> 16', () => {
        expect(NumberToString(Number.MIN_SAFE_INTEGER, 16)).toBe('-0x1fffffffffffff')
      })
    })

    describe('max value', () => {
      it('input MAX_VALUE -> 2', () => {
        expect(NumberToString(Number.MAX_VALUE, 2)).toBe('0b1111111111111111111111111111111111111111111111111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000')
      })

      it('input MAX_VALUE -> 8', () => {
        expect(NumberToString(Number.MAX_VALUE, 8)).toBe('0o177777777777777777400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000')
      })

      it('input MAX_VALUE -> 10', () => {
        expect(NumberToString(Number.MAX_VALUE)).toBe('1.7976931348623157e+308')
      })

      it('input MAX_VALUE -> 16', () => {
        expect(NumberToString(Number.MAX_VALUE, 16)).toBe('0xfffffffffffff800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000')
      })
    })

    // 小数
    describe('float', () => {
      it('input 0.1 -> 2', () => {
        expect(NumberToString(0.1, 2)).toBe('0.000110011001100110011001100110011')
      })

      it('input 127.625 -> 2', () => {
        expect(NumberToString(127.625, 2)).toBe('1111111.101')
      })

      it('input -0.1 -> 2', () => {
        expect(NumberToString(-0.1, 2)).toBe('-0.000110011001100110011001100110011')
      })
    })

    describe('overflow value', () => {
      it('input 1.8E+308 -> 2', () => {
        expect(NumberToString(1.8E+308, 2)).toBe('Infinity')
      })

      it('input 1.8E+308 -> 8', () => {
        expect(NumberToString(1.8E+308, 8)).toBe('Infinity')
      })

      it('input 1.8E+308 -> 10', () => {
        expect(NumberToString(1.8E+308)).toBe('Infinity')
      })

      it('input 1.8E+308 -> 16', () => {
        expect(NumberToString(1.8E+308, 16)).toBe('Infinity')
      })

      it('input -1.8E+308 -> 2', () => {
        expect(NumberToString(-1.8E+308, 2)).toBe('-Infinity')
      })

      it('input -1.8E+308 -> 8', () => {
        expect(NumberToString(-1.8E+308, 8)).toBe('-Infinity')
      })

      it('input -1.8E+308 -> 10', () => {
        expect(NumberToString(-1.8E+308)).toBe('-Infinity')
      })

      it('input -1.8E+308 -> 16', () => {
        expect(NumberToString(-1.8E+308, 16)).toBe('-Infinity')
      })
    })

    // 大于0小于Number.MIN_VALUE
    describe('underflow min value', () => {
      it('input 5e-325 -> 2', () => {
        expect(NumberToString(5e-325, 2)).toBe('0b0')
      })

      it('input 5e-325 -> 8', () => {
        expect(NumberToString(5e-325, 8)).toBe('0o0')
      })

      it('input 5e-325 -> 10', () => {
        expect(NumberToString(5e-325)).toBe('0')
      })

      it('input 5e-325 -> 16', () => {
        expect(NumberToString(5e-325, 16)).toBe('0x0')
      })
    })
  })
})
