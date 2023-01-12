const https =require('https');
const express =require('express');
const bodyParser =require('body-parser');
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
     res.sendFile(__dirname + "/index.html");
  // res.send("server one n two some");
})



app.post("/",function(req,res){
  console.log(req.body.cityname);
  const query=req.body.cityname;
  const apiKey="a6bde6a802e70100041dc5efda09e91a";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey;
  https.get(url,function(response){
           console.log(response);
           console.log(response.statusCode);
  
           response.on("data", (data) => {
            const weatherdata=JSON.parse(data);
            const temp=weatherdata.main.temp;
            const weatherDescription=weatherdata.weather[0].description;
            const icon=weatherdata.weather[0].icon;
            const imgURL= "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            const feels =weatherdata.main.feels_like;
  
            console.log(weatherdata);
            console.log(temp);
            console.log(weatherDescription);
            // console.log(feels);
            // console.log(weatherdata.wind.speed);
            res.write("<p>the temp : "+ temp +"<p>")
            res.write("<p>the Description : "+weatherDescription +"<p>")
            res.write("<img src=" + imgURL + ">");
            res.send();
          });
  })

})
app.listen(3000,function(){
  console.log("first second");

});