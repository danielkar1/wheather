const key = '6b40491a7cfa4d9daf7122510181912' //api key
const City = require('../models/City') //mongod scheme
const express=require('express')
const request = require('request')
const router=express.Router()


router.get('/city/:cityName', function(req,res){ //gets city from api
    let cityName=req.params.cityName
    console.log(cityName)
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

router.post('/cities', function(req,res){ //saves new cities to db
        let data=req.body
            let newCity= new City({
                name: data.location.name,
                updatedAt: data.current.last_updated,
                temperature: data.current.temp_c,
                condition: data.current.condition.text,
                conditionPic:data.current.condition.icon
            })
            newCity.save()
            res.end()
})
router.delete('/city/:cityName',function(res,req){
    let cityName=req.params.cityName
    City.deleteOne({name:cityName}).exec(function(err,city){
        res.send(`${city} was deleted from DB`)
    })

})
module.exports=router