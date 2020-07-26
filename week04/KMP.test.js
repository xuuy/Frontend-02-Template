import { KMPMatch } from "./KMP"

describe('week04', () => {
  describe('KMP', () => {
    describe('match', () => {
      it('input abab', () => {
        expect(KMPMatch('abab', 'abacabab')).toBe(4)
      })

      it('input abcabc', () => {
        expect(KMPMatch('abcabc', 'abcabc')).toBe(0)
      })

      it('input abababx', () => {
        expect(KMPMatch('abababx', 'ababababx')).toBe(2)
      })

      it('input', () => {
        expect(KMPMatch('ABCDABD', 'BBC ABCDAB ABCDABCDABDE')).toBe(15)
      })
    })

    describe('not match', () => {
      it('input abababx', () => {
        expect(KMPMatch('abababx', 'ababababc')).toBe(-1)
      })

      it('input abababx', () => {
        expect(KMPMatch('abababx', 'ababababababazxasvabababafasdfsbababababascadsfabababababafasdgcacababababagasdfaababab abababc')).toBe(-1)
      })
    })
  })
})