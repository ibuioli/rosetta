import { Injectable } from '@angular/core';
export const fs : any = window["fs"]; //FileSystem
export const zip : any = window["zip"]; //Zip

@Injectable()
export class DownloadService {

  constructor() { }

  download(main:string, app:string, apph:string){
    if(fs !== undefined){
      zip.file('src/main.cpp', main);
      zip.file('src/ofApp.cpp', app);
      zip.file('src/ofApp.h', apph);
      let data = zip.generate({base64:false,compression:'DEFLATE'});
      fs.writeFileSync('rosetta-of.zip', data, 'binary');
      document.getElementById("debug").innerHTML = "*rosetta-of.zip saved in root directory*";
      setTimeout(function(){
        document.getElementById("debug").innerHTML = "";
      }, 3000);
    }else{
      console.log("Download only avaliable in Electron mode");
      document.getElementById("debug").innerHTML = '<p style="color:red;">*Download only avaliable in Electron mode*</p>';
      setTimeout(function(){
        document.getElementById("debug").innerHTML = "";
      }, 3000);
    }
  }
}
