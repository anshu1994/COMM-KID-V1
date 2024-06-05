const exp = require('express');
const app = exp();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const fs = require('fs');
const fileList = './files';
const path = require('path')
app.use(bodyParser.json());
app.get('/files',function(req,res){
    const updatedFileList=[];
    fs.readdirSync(fileList).map(function(file){
        updatedFileList.push(file);
        console.log(updatedFileList);
    });
    res.status(200).json({
        updatedFileList,
    })
})
app.get('/files/:fname',function(req,res){
    const name = req.params.fname;
    const fileName = path.join(__dirname,'files',name);
    fs.readFile(fileName,"utf-8",function(err,data){
         if(data){
             res.status(200).send(data);
         }
         else{
            res.status(404).send('<b>File not found</b>');
        }
    })
})
app.listen(port,function(){
    console.log(`the app is running on port ${port}`);
});