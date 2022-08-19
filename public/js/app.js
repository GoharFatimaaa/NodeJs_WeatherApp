

const weatherForm=document.querySelector('form')
const search=document.getElementById('name')
const msg1=document.getElementById('msg-1')
const msg2=document.getElementById('msg-2')

weatherForm.addEventListener('submit',(e)=>
{
    msg1.textContent='loading....'
    msg2.textContent='loading.... '

    e.preventDefault()
    const location=search.value
    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
    response.json().then((data)=>
    {
        if(data.error){
            errormsg= (data.error)
            msg1.textContent=errormsg
          
        }
        else
        locmsg=(data.location)
        foremsg=(data.forecast)
        msg1.textContent='location : '+ locmsg 
        msg2.textContent='Forecast: : '+ foremsg 
        //msg2.textContent='location : '+   locmsg +    '   ' +'Forecast: ' + foremsg
        
    })
})

})