const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const { send } = require('process')

const forecastData = require('../../section6/app')
//Setting up directory for files
//console.log(path.join(__dirname,'../public'))
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'./Template/views')
//console.log(viewsPath)
const partialPaths = path.join(__dirname,'./Template/partials')
hbs.registerPartials(partialPaths)
//for static files like html 
app.use(express.static(publicDirectoryPath))
// app.get('',(req,res) =>{
//     res.send('Hello express')
// })
//for dymamic files like hbs
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
app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search address'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
// app.get('/help',(req,res) =>{
//     // res.send('Help Page')
//     res.send({
//         name:'Aditya',
//         age:21
//     })
// })
// app.get('/about',(req,res) =>{
//     res.send('./')
// })
app.get('/weather',(req,res) =>{
    // if(!req.query.address){
    //     return res.send({
    //         error:'Enter address'
    //     })
    // }
    //console.log(req.query.address)
    //geocode(req.query.address,(error,{latitude,longitude,location})=>{
        // if(error){
        //     return res.send(error)
        // }
        // forecast(latitude,longitude,(error,forecastData) =>{
        //     if(error){
        //         return res.send({error})
        //     }
        //     // console.log(forecastData)
        //     // return res.send({
        //     //     forecast:forecastData,
        //     //     location,
        //     //     address:req.query.address,
        //     // })
        //     return res.send({
        //         kaddu:"lalu parsad"
        //     })
        // })
    //     return res.send({
    //         value:"kaddu"
    //     })
    // })
})
app.get('/about/*',(req,res) =>{
    res.send("About article not found")
})
app.get('*',(req,res) =>{
    // res.send("My 404 Page")
    res.render('404',{
        title:'404',
        name:'Aditya Kumar',
        errorMessage:'Page not Found'
    })
})
app.listen(3000,() =>{
    console.log('Server is up on port 3000')
})
//views folder can be used without using 
//const viewsPath = path.join(__dirname,'./Template') 
//app.set('views',viewsPath)