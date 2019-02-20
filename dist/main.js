
const renderer=new Renderer()
const tMr=new TempManager()

const loadPage= async function(){
    await tMr.getDataFromDB()
}