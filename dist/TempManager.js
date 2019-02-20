

class TempManager{
    constructor(renderer){
        this.renderer=renderer
        this.cityData=[]
    }
    
    getDataFromDB(){ //populate state array with cities from db
        $.get('cities', (citiesData)=>{
            if(this.cityData != undefined){
            this.cityData=citiesData
             this.renderer.renderCities(this.cityData)
            console.log(this.cityData)
           }
        })
    }

   async getCityData(cityName){ //adds new city from the api to the cityData array
    let citydata = await  $.get(`city/${cityName}`)
    this.cityData.push({
        name: citydata.location.name,
        updatedAt: citydata.current.last_updated,
        temperature: citydata.current.temp_c,
        conditions: citydata.current.condition.text,
        conditionPic: citydata.current.condition.icon,
    })
    console.log(this.cityData)
    this.renderer.renderCities(this.cityData)

    }

    saveCity(cityName){
        let cityToSave=this.cityData.find(city=> city.name==cityName)
        // console.log(cityToSave)
        $.post(`city`,cityToSave,function(){
            console.log(`${cityName} saving...`)
            
        })
        this.getDataFromDB()
    }

    deleteCity(cityName){
        $.ajax({
            url: `city/${cityName}`,
            method: "DELETE",
            success: response => {
                // let tempArr = this.cityData.filter(c => c.displaySave == "inline-block" && c.name != cityName)
                // this.cityData = []
                // this.cityData = tempArr
                console.log(`${cityName} sent for deletion`)
                this.getDataFromDB()
            }
       
    })
    }

}