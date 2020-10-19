const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('../src/utils/forecast')
const geocode = require('../src/utils/geocode')

const app = express()
const port = process.env.PORT || 4000


const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../Template/views/')
const partialPaths = path.join(__dirname,'../Template/partials/')


hbs.registerPartials(partialPaths)
app.use(express.static(publicDirectoryPath))

app.set('view engine','hbs')
app.set('views',viewsPath)

app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather App',
        name:'Aditya'
    })
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About me',
        name:'Aditya kumar'
    })
})
app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'Enter address'
        })
    }
    geocode(req.query.address,(geoerror,{latitude,longitude,location}) =>{
        if(geoerror){
            return res.send({error})
        }
        forecast(latitude,longitude,(forecasterror,forecastData)=>{
            if(forecasterror){
                return res.send({forecasterror})
            }
            console.log(forecastData)
            return res.send({
               forecast:forecastData,
               location,
               address:req.query.address
            })
        })
    })
    // return res.send({
    //     forecastData
    // })
})
app.listen(port,() =>{
    console.log('Server is up on port 4000')
})