import { Injectable } from '@angular/core';
export const fs : any = window["fs"]; //FileSystem
export const zip : any = window["zip"]; //Zip

@Injectable()
export class FilesService {

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

  upload(e){
    let _this = this;
    if(fs !== undefined){
      if(/(?:\.([^.]+))?$/.exec(e.target.files[0].name)[1] == "pde"){
        fs.readFile(e.target.files[0].path, 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
          }
          (<HTMLInputElement>document.getElementById("p5")).value = data;
          let ev = new KeyboardEvent("keyup", {
              bubbles : true,
              cancelable : true,
              key : "",
              shiftKey : true,
          });
          document.getElementById("p5").dispatchEvent(ev);
          document.getElementById("p5_debug").innerHTML = "*file load successful*";
          setTimeout(function(){
            document.getElementById("p5_debug").innerHTML = "";
          }, 3000);
        });

      }else{
        document.getElementById("p5_debug").innerHTML = '<p style="color:red;">*The File is not PDE*</p>';
        setTimeout(function(){
          document.getElementById("p5_debug").innerHTML = "";
        }, 3000);
      }
    }else{
      console.log("Upload only avaliable in Electron mode");
      document.getElementById("p5_debug").innerHTML = '<p style="color:red;">*Upload only avaliable in Electron mode*</p>';
      setTimeout(function(){
        document.getElementById("p5_debug").innerHTML = "";
      }, 3000);
    }
  }
}
