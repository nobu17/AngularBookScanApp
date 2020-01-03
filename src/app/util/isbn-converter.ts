export class IsbnConverter {
  public static getIsbn10(isbn13: string): string {
    if (isbn13.length !== 13) {
      throw Error('must be 13 length');
    }
    const regexp = new RegExp('^[0-9]+$');
    if (!regexp.test(isbn13)) {
      throw Error('must be numeric value');
    }
    // extract 9 digits
    let digits = isbn13.substr(3, 9);
    const target = digits.split('');
    const sums = Array.from(Array(9), (v, k) => k)
      .map(x => Number(target[x]) * (10 - x))
      .reduce((a, x) => (a += x), 0);
    const digit = 11 - (sums % 11);

    if (digit === 10) {
      digits += 'X';
    } else if (digit === 11) {
      digits += '0';
    } else {
      digits += digit.toString();
    }
    return digits;
  }
}
