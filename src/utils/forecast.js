const request=require('request')
const forecast=(a,b,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=7f55aa3c01400a544ba82794b537db31&query='+ a +','+ b
    request({ url:url, json: true }, (error, response) => {
        if(error){
            callback('Cant Connect to server')
        }
        else if(response.body.error){
            callback('cant get location')
        }
        else{
            callback(undefined,response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.")
    }
})
    
}
module.exports=forecast