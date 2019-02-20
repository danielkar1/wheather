const key = '6b40491a7cfa4d9daf7122510181912' //api key
const City = require('../models/City') //mongod scheme
const express=require('express')
const request = require('request')
const router=express.Router()


router.get('/city/:cityName', function(req,res){ //gets city from api
    let cityName=req.params.cityName
    request(`http://api.apixu.com/v1/current.json?key=6b40491a7cfa4d9daf7122510181912&q=${cityName}`,function(err,reso,body){
        let data=JSON.parse(body)
        res.send(data)
    })
})

router.get('/cities',function(req,res){ //gets cities from my DB
  City.find({}).exec(function(err,cities){
      console.log("got cities from db")
      res.send(cities)
  })
})

router.post('/city', function(req,res){ //saves new cities to db
        let data=req.body
        console.log(data)
            let newCity= new City({
                name: data.name,
                updatedAt: data.updatedAt,
                temperature: data.temperature,
                conditions: data.conditions,
                conditionPic:data.conditionPic
            })
            newCity.save()
            res.end()
})
router.delete('/city/:cityName',function(res,req){
    console.log(res.params)
    let cityName=res.params.cityName
    City.deleteOne({name:cityName}).exec(function(err,city){
      console.log(`${cityName} is deleted from db`)
      req.end()
    })

})
module.exports=router