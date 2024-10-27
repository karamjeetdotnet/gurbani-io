const { get } = require("https");
const fs = require('fs');
const httpGet = url => {
    return new Promise((resolve, reject) => {
      get(url, res => {
        res.setEncoding('utf8');
        let body = ''; 
        res.on('data', chunk => body += chunk);
        res.on('end', () => resolve(body));
      }).on('error', reject);
    });
};
async function downloadFile(fileName,folderName, endPoint){
  const basePath = __dirname + "/STTM/"+folderName+"/";
  const resonse = await httpGet("https://api.banidb.com/v2/"+endPoint);
    await fs.writeFileSync(basePath + fileName+'.json', resonse, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      console.log("downloaded" + fileName)
}
(async() => {
  fs.readdir(__dirname + "/STTM/amritkeertan", async (err, files) => {
    if (err)
      console.log(err);
    else {
      console.log("\nCurrent directory filenames:");
      var ctr = 0;
      for (let fileI = 0; fileI < files.length; fileI++) {
  const fileE = files[fileI];
  const fileName = __dirname + "/STTM/amritkeertan/"+fileE;
  let banis = await fs.readFileSync(fileName);
  console.log(fileName);
banis = JSON.parse(banis).index;
for (let index = 0; index < banis.length; index++) {
  ctr++;
  const element = banis[index];
  console.log(element.ShabadID, ctr, fileE)
  await downloadFile(element.ShabadID, "shabad","shabads/"+element.ShabadID)
  
}
}
    }
  })
//   let banis = await fs.readFileSync(__dirname + "/STTM/amritkeertan.json");
// banis = JSON.parse(banis);
// for (let index = 0; index < banis.headers.length; index++) {
//   const element = banis.headers[index];
//   console.log(element.HeaderID, index)
//   await downloadFile(element.HeaderID, "amritkeertan","amritkeertan/index/"+element.HeaderID)
// }
})()
//Bhai Gurdas Ji Vaaran
//40-B
//Dasam Granth
//1428-D
//SGGS
//1430-G
//Bhai Gurdas Singh Ji Vaaran
//28-S
//Request URL:https://api.banidb.com/v2/banis
