const exp = require('express');
const app = exp();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

let userData = [
    {
        name:'John',
        kidneys:[
            {
                healthy: true,
            },
            {
                healthy: false,
            }
        ],
    }
];
let numberOfKidneys = userData[0]?.kidneys.length;
app.get('/checkkidney',function(req,res){
    let numberOfHealthyKidneys = 0;
    for(let i =0;i<numberOfKidneys;i++){
        if(userData[0].kidneys[i].healthy){
            numberOfHealthyKidneys=numberOfHealthyKidneys+1;
        }
    }
    res.json({
        message:`Number of kidneys are ${numberOfKidneys} and healthy kidneys are ${numberOfHealthyKidneys}`,
    });
});

app.post('/addkidneys',function(req,res){
    userData[0].kidneys.push({
        healthy: false,
    });
    numberOfKidneys++;
    res.json({
        message:"Done!",
    });
});

app.put('/makehealthykidney',function(req,res){
    for(let i =0;i<userData[0]?.kidneys.length;i++){
        if(!userData[0].kidneys[i].healthy){
            userData[0].kidneys[i].healthy=true;
        }
    }
    res.json({
        msg:'Done!'
    });
});

app.delete('/removekidney',function(req,res){
    let newKidneySlot = [];
    for(let i = 0; i < numberOfKidneys; i++){
        if(userData[0].kidneys[i].healthy){
            newKidneySlot.push({
                healthy:true,
            })
        }
    }
    userData[0].kidneys = newKidneySlot;
    res.json({
        msg:"Done!",
    })
});
console.log(numberOfKidneys);
app.listen(port);

