import { Injectable } from '@angular/core';

@Injectable()
export class Tools {

  constructor() { }

  repeted(string:string, subString:string, allowOverlapping:boolean) {
    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
      pos = string.indexOf(subString, pos);
      if (pos >= 0) {
          ++n;
          pos += step;
      } else break;
    }
    return n;
  }
  extract(string:string, left:string, right:string){
    var pleft:any = this.strpos(string, left, 0);
    if (pleft !== false){
      var pright:any = this.strpos(string, right, pleft + left.length);
      if (pright !== false) {
              return (string.substr(pleft + left.length, (pright - (pleft + left.length ) ) ) );
      }
    }
    return '';
  }
  strpos(haystack:string, needle:string, offset:number) {
    var i = (haystack+'').indexOf(needle, (offset || 0));
    return i === -1 ? false : i;
  }
}
