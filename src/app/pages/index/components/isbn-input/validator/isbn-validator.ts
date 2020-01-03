import { AbstractControl } from '@angular/forms';

export class ISBN13Validator {
  static matchISBN13(c: AbstractControl) {
    const num = c.value as string;
    // check digits
    if (num.length !== 13) {
      return { lenght: true };
    }
    // check num or not
    const regexp = new RegExp('^[0-9]+$');
    if (!regexp.test(num)) {
      return { numeric: true };
    }

    const checkedNum = num
      .substr(0, num.length - 1)
      .split('')
      .reduce((sum: number, current, index) => {
        if ((index + 1) % 2 === 0) {
          // even
          sum += Number(current) * 3;
        } else {
          // odd
          sum += Number(current) * 1;
        }
        return sum;
      }, 0);

    let expected = 0;
    if (checkedNum !== 0) {
      const mod = checkedNum % 10;
      if (mod !== 0) {
        expected = 10 - mod;
      } else {
        expected = 0;
      }
    }

    const actual = Number(num.substr(num.length - 1));
    if (actual !== expected) {
      // console.log('check:', actual, expected, checkedNum);
      return { checksum: true };
    }

    return null;
  }
}
