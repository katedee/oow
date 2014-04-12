	$(function(){
		var swoop=new Boolean(1);
		var findWeather = function(temple){
			var bossKey = encodeURI(temple);
			$.ajax('http://api.wunderground.com/api/f1f793a5b18029cd/conditions/q/'+ bossKey +'.json', {
				type: 'GET',
				dataType: 'jsonp',
					
				success: function(data){
				if(!data.current_observation){
					resetAudio();
					$('h1').text("How can YOU be the hero of time? Be more specific.")
					$('body').removeClass();
					$('body').addClass('glitch');
				};
				var z = data.current_observation;
				var weather = z.weather;
				var temp = z.temp_c;
				var feelsLike = z.feelslike_c;

				//get hour to detect nighttime
				var localTime = z.local_time_rfc822;
				var localTimeArray = localTime.split(" ");
				var time = localTimeArray[4];
				var timeArray = time.split(":");
				var hour = timeArray[0];

				var navi = "Where you are in Hyrule is "+weather+". The temperature is "+temp+"°C, but it feels like "+feelsLike+"°C";
				$('h1').text(navi).addClass('message');
				var weatherString = weather.toString();
				if (weatherString.indexOf("ce")!= -1){
						resetAudio();
						document.getElementById("frozen").play();
						
						$('body').removeClass();
						$('body').addClass('frozen');
					}
					else if (weatherString.indexOf("quall")!= -1){
						resetAudio();
						document.getElementById("frozen").play();
						$('body').removeClass();
						$('body').addClass('squall');
					}
					else if (weatherString.indexOf("now")!= -1){
						resetAudio();
						document.getElementById("frozen").play();
						$('body').removeClass();
						$('body').addClass('snowy');
					}
					else if (weatherString.indexOf("lear")!= -1){
						resetAudio();
						$('body').removeClass();
						document.getElementById("clear").play();
						if (temp >= 30){
							$('body').addClass('hotdry');
							resetAudio();
							document.getElementById("hot").play();
						}
						else if (hour<18 && hour>6){
							$('body').addClass('clear');
						}
						else {
							$('body').addClass('clearnight');
						}
					}
					else if (weatherString.indexOf("ail")!= -1){
						resetAudio();
						document.getElementById("frozen").play();
						$('body').removeClass();
						$('body').addClass('hail');
					}
					else if (weatherString.indexOf("ain")!= -1 || weather.indexOf("rizzle")!= -1 ){
						resetAudio();
						document.getElementById("storm").play();
						$('body').removeClass();
						$('body').addClass('rain');
					}
					else if (weatherString.indexOf("artly")!= -1 || weather.indexOf("louds")!= -1 ){
						resetAudio();
						document.getElementById("saria").play();
						$('body').removeClass();
						$('body').addClass('partlyCloudy');
					}
					else if (weatherString.indexOf("loudy")!= -1 || weather.indexOf("vercast")!= -1 ){
						resetAudio();
						document.getElementById("ganoncastle").play();
						$('body').removeClass();
						if (hour<18 && hour>6){
							$('body').addClass('overcast');
						}
						else {
							$('body').addClass('nightovercast');
							resetAudio();
							document.getElementById("ganon").play();
						}
					}
					else if (weatherString.indexOf("and")!= -1 || weather.indexOf("ust")!= -1 ){
						resetAudio();
						document.getElementById("hot").play();
						$('body').removeClass();
						$('body').addClass('dusty');
					}
					else if (weatherString.indexOf("howers")!= -1 || weather.indexOf("hunderstorm")!= -1 ){
						$('body').removeClass();
						resetAudio();
						document.getElementById("storm").play();
						if (hour<18 && hour>6){
							$('body').addClass('thunderstorm');
						}
						else {
							$('body').addClass('stormnight');
						}
					}
					else if (weatherString.indexOf("og")!= -1 ||  weather.indexOf("aze")!= -1 || weather.indexOf("ist")!= -1 || weather.indexof("pray")!= -1 ){
						resetAudio();
						document.getElementById("shadowtemple").play();
						$('body').removeClass();
						$('body').addClass('foggy');
					}
					else if (weatherString.indexOf("unnel")!= -1 || weather.indexOf("sh")!= -1 || weather.indexOf("moke")!= -1 ){
						resetAudio();
						document.getElementById("goroncity").play();
						$('body').removeClass();
						$('body').addClass('volcano');
					}
					else {
						resetAudio();
						document.getElementById("foresttemple").play();
						$('body').removeClass();
						$('body').addClass('unknown');
					}
				}//success
			});//ajax 
		}//findWeather
	$('form.hyrule').on('submit',function(e){
		e.preventDefault();
		var temple = $('input[name="city"]').val().toLowerCase();
		if (temple === "kakariko"){
			resetAudio();
			$('body').removeClass();
			$('body').addClass('kakariko');
			$('h1').text('Cuccos!');
			spawnCuccos();
		}
		else {
			findWeather(temple);
		}
		$('.navi').toggleClass('tap');
		if (swoop){
			window.setTimeout(function(){document.getElementById("naviding").play()},1500);
			swoop = !swoop;
		}
		else {
			window.setTimeout(function(){document.getElementById("naviout").play()},1000);
			swoop = !swoop;
		}
	});//form

	var spawnCuccos = function(){
		for(var i=0;i<15;i++){
			var altitude = Math.random()*800;
			var flightpath = Math.random()*100+300;
			var delay = Math.random()*4;
			$(".cucco").css("transition-duration","4s");
			$(".cucco"+i).css("bottom",altitude+"px");
			$(".cucco"+i).css("left","-"+flightpath+"px");
			$(".cucco"+i).css("transition-delay", delay+"s");
			setTimeout(cuccoReplace,7000);
			resetAudio();
			document.getElementById("cucco1").play();
			document.getElementById("cucco2").play();
		}
	}

	var cuccoReplace = function(){
		$(".cucco").css("transition-duration","0.0s");
		$(".cucco").css("bottom","200px");
		$(".cucco").css("left","2200px");
		setTimeout(cuccoAppear, 100);
	}

	var cuccoAppear=function(){
		$(".cucco").css("opacity", "1")
	}

	var resetAudio = function(){

		document.getElementById("clear").pause();
		document.getElementById("storm").pause();
		document.getElementById("hot").pause();
		document.getElementById("frozen").pause();
		document.getElementById("ganon").pause();
		document.getElementById("saria").pause();
		document.getElementById("ganoncastle").pause();
		document.getElementById("goroncity").pause();
		document.getElementById("foresttemple").pause();
		document.getElementById("shadowtemple").pause();

		document.getElementById("clear").load();
		document.getElementById("storm").load();
		document.getElementById("hot").load();
		document.getElementById("frozen").load();
		document.getElementById("ganon").load();
		document.getElementById("saria").load();
		document.getElementById("ganoncastle").load();
		document.getElementById("goroncity").load();
		document.getElementById("foresttemple").load();
		document.getElementById("shadowtemple").load();

	}

	var makeItRain = [];
	var allTheRupees = "65,40,38,65,40,38";

	window.addEventListener("keydown",function(e){
		makeItRain.push(e.keyCode);
		if (makeItRain.toString().indexOf(allTheRupees)>=0){
				$('div.rupee').addClass('rainBitch');
				var money = 0;

				var prize = Math.floor(Math.random()*200+100);

				var countdown = window.setInterval(function() {
					document.getElementById("rupeeCount").play();
				  $('.wallet').text(money).css({"color":"white"});
				  money++; 
				  if(money >= prize) {
				    window.clearInterval(countdown);
				    $('.wallet').css({"color":"#79ea12", "text-shadow": "2px 2px 5px #73AF3C"});
				    document.getElementById("rupeeCountDone").play();
				  }
				},30);
				setTimeout(function(){$('div.rupee').removeClass('rainBitch');},12000);//setTimeOut
			makeItRain = [];
		}//end of if statement
	});//window EventListener


	});//jQuery

	window.setTimeout(function(){document.getElementById("hey").play()},1000);
	window.setTimeout(function(){document.getElementById("naviout").play()},1000);
