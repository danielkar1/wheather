

class TempManager{
    constructor(){
        this.cityData=[]
    }
    
    getDataFromDB(){ //populate state array with cities from db
        $.get('cities', (citiesData)=>{
            if(this.cityData != undefined){
            this.cityData=citiesData
            }
        })
    }

   async getCityData(cityName){ //adds new city from the api to the states array
    let citydata = await  $.get(`city/${cityName}`)
    this.cityData.push({
        name: citydata.location.name,
        updatedAt: citydata.current.last_updated,
        temperature: citydata.current.temp_c,
        conditions: citydata.current.condition.text,
        conditionPic: citydata.current.condition.icon,
    })
    }

    saveCity(cityName){
        let cityToSave=this.cityData.find(city=> city.name===cityName)
        $.post(`/city`,cityToSave,function(){
            console.log(`${cityName} saving...`)
            
            this.getDataFromDB()
        })
    }

    deleteCity(cityName)


}