import { Injectable } from '@angular/core';
import { DebugConsoleService } from './debug-console.service';
export const fs: any = window['fs']; // FileSystem
export const zip: any = window['zip']; // Zip

@Injectable()
export class FilesService {

  constructor(public debug: DebugConsoleService) { }

  public download(main: string, app: string, apph: string, debug: any): void {
    const _this = this;

    if (fs !== undefined) {

      zip.file('src/main.cpp', main);
      zip.file('src/ofApp.cpp', app);
      zip.file('src/ofApp.h', apph);
      const data = zip.generate({base64: false, compression: 'DEFLATE'});
      fs.writeFileSync('rosetta-of.zip', data, 'binary');

      _this.debug.debug_console('*rosetta-of.zip saved in root directory*', 'black', debug);
    } else {
      console.log('Download only avaliable in Electron mode');
      _this.debug.debug_console('*Download only avaliable in Electron mode*', 'red', debug);
    }
  }

  public upload(e: any, p5: any, debug: any): void {
    const _this = this;

    if (fs !== undefined) {

      if (/(?:\.([^.]+))?$/.exec(e.target.files[0].name)[1] === 'pde') {
        fs.readFile(e.target.files[0].path, 'utf8', function (err: any, data: any) {
          if (err) {
            return console.log(err);
          }
          (<HTMLInputElement>p5).value  = data;
          const ev = new KeyboardEvent('keyup', {
              bubbles : true,
              cancelable : true,
              key : '',
              shiftKey : true,
          });
          document.getElementById('p5').dispatchEvent(ev);
          _this.debug.debug_console('*file load successful*', 'black', debug);
        });

      } else {
        _this.debug.debug_console('*The File is not PDE extension*', 'red', debug);
      }
    } else {
      console.log('Upload only avaliable in Electron mode');
      _this.debug.debug_console('*Upload only avaliable in Electron mode*', 'red', debug);
    }
  }
}
