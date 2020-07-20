import { StringToNumber } from ".";

describe('week03', () => {
  describe('stringToNumber', () => {
    describe("null, undefined, empty string", () => {
      it("input null", () => {
        expect(StringToNumber(null)).toBe(0);
      });
    
      it("input undefined", () => {
        expect(StringToNumber(undefined)).toBe(0);
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
      })
    
      it('input 1e+0', () => {
        expect(StringToNumber('1e+0')).toBe(1)
      })
    
      it('input 1e-0', () => {
        expect(StringToNumber('1e-0')).toBe(1)
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
    })
  })

  describe('numberToString', () => {
    // TODO: ...
  })
})
