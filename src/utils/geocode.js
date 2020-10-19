console.log("geocode")
const request = require('request')
const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWRpdHlhMDciLCJhIjoiY2p6anExcXlnMGJuOTNjcWl5ZWg3cTJ0aSJ9.hfeggDrZ8MjF9P5yk5bRSw'
    request({url:url,json:true},(error,{body}) =>{
        if(error){
            callback('Unable to Connect to Server',undefined)
        }else if(body.features.length === 0){
            callback('Unable to Find the location',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}
module.exports = geocode