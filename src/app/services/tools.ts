import { Injectable } from '@angular/core';

@Injectable()
export class Tools {

  constructor() { }

  public repeted(string: string, subString: string, allowOverlapping: boolean): number {
    string += '';
    subString += '';
    if (subString.length <= 0) { return (string.length + 1); }

    let n = 0, pos = 0;
    const step = allowOverlapping ? 1 : subString.length;

    while (true) {
      pos = string.indexOf(subString, pos);
      if (pos >= 0) {
          ++n;
          pos += step;
      } else {
        break;
      }
    }
    return n;
  }

  public extract(string: string, left: string, right: string): string {
    const pleft: any = this.strpos(string, left, 0);
    if (pleft !== false) {
      const pright: any = this.strpos(string, right, pleft + left.length);
      if (pright !== false) {
              return (string.substr(pleft + left.length, (pright - (pleft + left.length ) ) ) );
      }
    }
    return '';
  }

  public strpos(haystack: string, needle: string, offset: number): any {
    const i = (haystack + '').indexOf(needle, (offset || 0));
    return i === -1 ? false : i;
  }

  public countpar(s: string, needle: string): number {
    let brk = 0;
    let par = 0;

    for (let i = 0; i < s.length; i++) {
      if (s[i] === '(') {
        brk++;
      } else if (s[i] === ')') {
        brk--;
      }

      if (brk === 0) {
        if (s[i] === needle) {
          par++;
        }
      }
    }
    return par;
  }

  public params(s: string, needle: string, c: number): any {
    const ipar = [];
    const par = [];
    let brk = 0;
    ipar[0] = 0;
    let u = 1;

    for (let i = 0; i < s.length; i++) {
      if (s[i] === '(') {
        brk++;
      } else if (s[i] === ')') {
        brk--;
      }

      if (brk === 0) {
        if (s[i] === needle) {
          if (u < c + 1) {
            ipar[u] = i;
            u++;
          }
        }
      }
    }

    if (ipar.length === c) {
      ipar[c] = s.length;
    }

    for (let i = 0; i < c; i++) {
      par[i] = s.slice(ipar[i], ipar[i + 1]);

      if (i !== 0) {
        par[i] = par[i].substr(1);
      }
    }
    return par;
  }
}
