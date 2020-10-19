console.log("forecast")
const request = require('request')
const forecast = (longitude,latitude,callback) =>{
    const url = 'https://api.darksky.net/forecast/6f18d8e9ca32c34684196466e89c8f44/'+encodeURIComponent(latitude)+','+encodeURI(longitude)
    request({url:url,json:true},(error,{body}) =>{
        if(error){
            callback('Unable to Connect to Server',undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            //console.log('It is currently '+response.body.currently.temperature+' degree out. There is a '+ response.body.currently.precipIntensity+' chance of rain')
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}
module.exports = forecast