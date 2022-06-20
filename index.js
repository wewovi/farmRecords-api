const express = require('express');
const mongoose = require('mongoose');
 require('dotenv/config');
 const model = require('./models/records.js')
 const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());
const port =process.env.port || 8900;

//database connection
mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("bd connected successfully");
})
.catch((err)=>{
    console.log(err)
})

//routes
app.post('/farmRecords', async (req, res)=>{
    const createRecord =  model.create({
        farm: req.body.farm_num,
        plant: req.body.plant,
        activity: req.body.activity,
        date: req.body.date,
        
    })
    try {
       
        const save = await createRecord.save;
        res.json({
            data:save,
            message:"record created"
        })
    } catch (error) {
        res.json({"message":error.message})
    }
})

 app.get('/farmRecords', async (req,res)=>{
    try {
        const getData = await model.find()
        res.json({
            data: getData,
             message:"data successfully retrived"
        })
    } catch (error) {
        res.json({
            message:error
        })
    }
 })

// app.delete()
app.delete('/farmRecords/:id',async (req, res)=> {
try {
    const {id} = req.params;
     await model.findByIdAndDelete({_id:id})
    res.json({
        message: "record deleted"
    })

} catch (error) {
    res.json({
        message: "error "+error
    })
}    
})

// app.patch()
app.patch('/farmRecords/:id',async (req, res)=>{
    try {
        const {id} = req.params;
        const updatedData = await model.findByIdAndUpdate(id, { ...req.body })
        res.json({
            data:updatedData,
            message:"Record updated"
        })
    } catch (error) {
        res.json({
            message : error
        })
    }
})

//get a single record
app.get('/farmRecords/:id', async (req, res)=>{
    try {
        const {id} = req.params
        const singleRecord = await model.findById(id)
        res.json({
            data:singleRecord,
            message:"Single record"
        })
    } catch (error) {
        res.json({
            message: error
        })
    }
})



//listen to port
app.listen(port, ()=>{
    console.log(`the server is running on port: ${port}`)
});
    