

class Renderer{
    constructor(){

    }

    renderCities(citiesData){
        $(`#city-container`).empty()
        let source=$(`city-template`).html()
        let template=Handlebars.compile(source)
        let newHtml=template({citiesData})
        $(`#city-container`).append(newHtml)
    }
}