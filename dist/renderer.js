class Renderer {
    constructor() {

    }

    renderCities(CitiesData) {
        $('#city-container').empty()
        let source = $('#city-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template({CitiesData})
        $('#city-container').append(newHTML);
    }
}