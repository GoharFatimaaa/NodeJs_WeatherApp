const request=require('request')

const geocode=(address,callback)=>{
    const GeocodingUrl='https://api.geoapify.com/v1/geocode/search?text='+ encodeURIComponent( address )+'&lang=en&limit=5&format=json&apiKey=b0227f83554c42d988fe73eebb836a97'
    request({ url:GeocodingUrl, json: true }, (error, response) => {
        if(error){
            callback('Cant Connect to server')
        }
        else if(response.body.results.length===0){
            callback('cant get location')
        }
        else{
            // const logitude=(response.body.results[0].lon)
            // const latitude=(response.body.results[0].lat)
            // callback(undefined, 'longitude is' + logitude)
            callback(undefined,{
                latitude:response.body.results[0].lat,
                longitude:response.body.results[0].lon,
                location:response.body.results[0].formatted
            })
    }
})
    
}



module.exports=geocode