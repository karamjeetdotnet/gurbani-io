var fs = require('fs');
// fs
// fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
//     if (err) throw err;
//     console.log('Saved!');
//   });
const dirName = __dirname + "/GurbaniDB/data";
const fileItems = [];
function readFiles(currDirName){
fs.readdir(currDirName, (err, files) => {
    if (err)
      console.log(err);
    else {
      
      files.forEach(file => {
        if(file.indexOf(".") == -1){
            return readFiles(currDirName + "/" + file)
        }else{
            // const data = fs.readFileSync(fileName,
            //     { encoding: 'utf8', flag: 'r' });
                fileItems.push({dirName: currDirName, fileName: file, groupName: currDirName.replace(dirName, "")});
                //console.log("\nCurrent filename:"+ fileName);
                fs.writeFileSync('gurbanifull.json', JSON.stringify(fileItems), function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                  });
        
    }
      })
    }
  })
  return fileItems;
}
readFiles(dirName);


  // Function to get current filenames
  // in directory with "withFileTypes"
  // set to "true" 
  
//   fs.readdir(dirName, 
//     { withFileTypes: true },
//     (err, files) => {
//     console.log("\nCurrent directory files:");
//     if (err)
//       console.log(err);
//     else {
//       files.forEach(file => {
//         console.log(file);
//       })
//     }
//   })