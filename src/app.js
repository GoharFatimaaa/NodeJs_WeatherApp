const { hasSubscribers } = require('diagnostics_channel')
const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geoCode.js')
const forecast=require('./utils/forecast')
const { title } = require('process')
const app=express()
const port=process.env.PORT || 3000

const FilePath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partials=path.join(__dirname,'../templates/paritals')

app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partials)
app.use(express.static(FilePath))

app.get('',(req,res)=>{
    res.render('index',{
        name:'Gohar',
        title:'Weather Forecast App'
    })
    })
app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Gohar',
        title:'Weather'

})
})
app.get('/help',(req,res)=>{
    res.render('help',{
        message:'We are here to help you',
        title:'Weather'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error:'Please provide the location to search'
        })

    }
    geocode(req.query.address,(error,{latitude,logitude,location}={})=>{    //destructuring data object
        if(error){
            return res.send({error})
        }
        
        //console.log('data',data)
        forecast(latitude,logitude,(error,ForecastedData)=>{
            if(error){
                return res.send({error})
            }
            
            res.send({
                 location:req.query.address,
                 forecast:ForecastedData
                 })
            ///console.log('Weather Forecast:',ForecastedData)
    
        
        })
    
    })
    // console.log(req.query.address)
    // res.send({
    //  location:req.query.address
    // })
    
})
app.get('*',(req,res)=>{
    res.render('error',{
        message:'Sorry!!! This page is not available ',
        
    })
})

app.listen(port,()=>{
    console.log('server is up')
})
