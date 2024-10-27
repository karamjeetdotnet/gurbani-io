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

(async() => {
    const basePath = __dirname + "/STTM/Sri Dasam Granth/";
    let ctr = 0;
    const interVal = setInterval(async() => {
        ctr++;
        if(ctr == 1428){
            clearInterval(interVal);
        }
        console.log(ctr);
        const resonse = await httpGet("https://api.banidb.com/v2/angs/"+ctr+"/D");
    await fs.writeFileSync(basePath + ctr+'.json', resonse, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    }, 500);
    
})()