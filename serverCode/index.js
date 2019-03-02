const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const port = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

  app.route('/data').get( (req,res)=> {
    console.log(req.query)
     let { page=1, rowsPerPage=10, sortHeader,search} =req.query;
     let rawData = getFileData();
    console.log(sortHeader)
     if(sortHeader){
        rawData=rawData.sort( (a, b) =>{  
            if (a[sortHeader] > b[sortHeader]) {  
                return 1;  
            } else if (a[sortHeader] < b[sortHeader]) {  
                return -1;  
            }  
            return 0;  
        })
     }
     if(search){         
        search=JSON.parse(search);
        rawData= searchData(rawData,search["searchHeader"],search["searchText"])
     }
     rowsPerPage= parseInt(rowsPerPage);
     page = parseInt(page);
     const start = rowsPerPage *(page-1);
     const end = rowsPerPage *(page);
     formattedData = rawData.slice(start,end);
     res.send({
         totalRecords: rawData.length,
         recordsData:formattedData
     })
 }) 

 function getFileData(){
    var file = fs.readFileSync('json/jqxGrid.json');
    return JSON.parse(file);  
}
function searchData(source, header,text) {
    var results;

    text = text.toUpperCase();
    results = source.filter(function(entry) {
        return entry[header].toUpperCase().indexOf(text) !== -1;
    });
    return results;
}
 /* app.route('/').get((req, res) => {
      var data= getFileData();
      res.send(data);
  });
  app.route('/search').get((req, res) => {
    var data= getFileData();
    var queryParam= req.query;
    data=search(data,queryParam["First Name"])
    console.log(queryParam);
    res.send(data);
});
  app.route('/sort').get((req, res) => {
    var data= getFileData();
    
});


  */


app.listen(port, () => console.log(`Example app listening on port ${port}!`))