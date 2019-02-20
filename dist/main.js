
const renderer=new Renderer()
const tMr=new TempManager(renderer)


const loadPage= async function(){
    console.log("loading page")
    await tMr.getDataFromDB()   
}

const handleSearch=async (input)=>{
    tMr.getCityData(input)
}

const go=()=>{
    let input=$("#city-input").val()
    handleSearch(input)

}

$("body").on("click",".save",function(){
    let name =  $(this).siblings(".cityBox").find(".name").text()
    tMr.saveCity(name)
})

$("body").on("click",".delete",function(){
    let name=$(this).siblings(".cityBox").find(".name").text()
    tMr.deleteCity(name)
})

loadPage()