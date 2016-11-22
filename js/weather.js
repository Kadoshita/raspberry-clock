var API_KEY='520c3709f908f53532e98e0861d1418e';

var getWeather=function(){
	$.ajax({
		url: 'http://api.openweathermap.org/data/2.5/weather?q=Ichinoseki,jp&units=metric&appid='+API_KEY,
		cache: false,
		success:function (weatherdata){
			console.log(weatherdata);
			// var img = document.createElement('img');
			// img.src = "http://openweathermap.org/img/w/"+weatherdata.weather[0].icon+".png";
			// img.alt = weatherdata.weather[0].main;
			// img.width=240;
			// img.height=240;
			document.getElementById('weather-today').style.backgroundImage=
			'url(http://openweathermap.org/img/w/'+weatherdata.weather[0].icon+'.png)';
			//document.getElementById('today-icon').appendChild(img);
			document.getElementById('today-weather').innerHTML=translate(weatherdata.weather[0].main);
			
			document.getElementById('today-sunset').innerHTML=unixtime(weatherdata.sys.sunset);
			// setTimeout(function(){
			// 	var obj=weatherdata.rain;
			// 	console.log(obj);
			// 	var str=JSON.stringify(obj);
			// 	var splited=str.split(':');

			// 	console.log(parseFloat(splited[1])*100);
			// 	//document.getElementById('h3-rain').innerHTML=str.match([0-9]);
			// },2000);
		}
	});

	$.ajax({
		url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Ichinoseki,jp&units=metric&cnt=3&appid='+API_KEY,
		cache: false,
		success:function(data){
			//console.log(data);
			var img = document.createElement('img');
			img.src = "http://openweathermap.org/img/w/"+data.list[1].weather[0].icon+".png";
			img.alt = data.list[1].weather[0].main;
			// document.getElementById('tomorrow-icon').appendChild(img);
			// document.getElementById('tomorrow-weather').innerHTML=translate(data.list[1].weather[0].main);
			// document.getElementById('tomorrow-temp').innerHTML = data.list[1].temp.day+'℃';
			document.getElementById('today-tempmax').innerHTML = data.list[0].temp.max+'℃';
			document.getElementById('today-tempmin').innerHTML = data.list[0].temp.min+'℃';
			console.log();
		}
	});
};

getWeather();

setInterval(getWeather,3600*1000);

function unixtime(utime){
	var d=new Date(utime*1000);
	var hour=(d.getHours()<10)?'0'+d.getHours():d.getHours();
	var min=(d.getMinutes()<10)?'0'+d.getMinutes():d.getMinutes();
	var sec=(d.getSeconds()<10)?'0'+d.getSeconds():d.getSeconds();
	var time=hour+':'+min+':'+sec;
	return time;
}

function translate(en){
	var ja="";
	switch(en.toLowerCase()){
		case 'clear':ja='晴れ';break;
		case 'clouds':ja='曇り';break;
		case 'rain':ja='雨';break;
		case 'snow':ja='雪';break;
		default :ja=en.toLowerCase();break;
	}
	return ja;
}