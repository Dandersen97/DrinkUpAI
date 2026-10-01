var FlipCount = 0;
var jsonString = `{
			"Options":[
				{"img":"3drinks.svg","drink":3},
				{"img":"beer.svg","drink":1},
				{"img":"beer2.svg","drink":2},
				{"img":"beer2pack.svg","drink":2},
				{"img":"beer3.svg","drink":1},
				{"img":"beerBarrel.svg","drink":2},
				{"img":"beerGlassAndPitcher.svg","drink":2},
				{"img":"beerStein.svg","drink":1},
				{"img":"bottle3pack.svg","drink":3},
				{"img":"bottle3pack2.svg","drink":3},
				{"img":"bottle3pack3.svg","drink":3},
				{"img":"bottle3pack4.svg","drink":3},
				{"img":"martiniGlass.svg","drink":1},
				{"img":"martiniGlasses.svg","drink":2},
				{"img":"partyChampagne.svg","drink":1},
				{"img":"pinkMargarita.svg","drink":1},
				{"img":"plasticCups.svg","drink":2},
				{"img":"tropicalDrink.svg","drink":1},
				{"img":"tropicalDrink2.svg","drink":1},
				{"img":"tropicalDrink3.svg","drink":1},
				{"img":"WhiskeyAndGlasses.svg","drink":3},
				{"img":"whiskeyGlass.svg","drink":1},
				{"img":"wineBottle.svg","drink":1},
				{"img":"wineBottleAndGlass.svg","drink":2},
				{"img":"wineBottleAndGlass2.svg","drink":2},
				{"img":"wineBottleAndGlasses.svg","drink":3},
				{"img":"wineGlass.svg","drink":1},
				{"img":"wineGlass2.svg","drink":1}
				]
			}`;
var jsonData = JSON.parse(jsonString);
var GameSize = 1;
var GameTimer = 5;
var GameRule = 0;
	window.onload = (event) => {
		NewCard();
		
	}

	function Start(){
		console.log("Start Game");
		$("#cardPrimary").off( "click");
		FlipAll();
		var GameTimer2 = GameTimer;
		var timerCountdown = setInterval(function() {
			GameTimer2 -= 1;
			document.getElementById("Timer").innerHTML = GameTimer2;
			if (GameTimer2 <= 0) {
				clearInterval(timerCountdown);
				FlipAll();
				AddCardListeners();	
				FlipCardPrimary();				
			}
		}, 1000);
	}
	
	
	function AddCardListeners(){
		$(".card-flippable").each(function() {
			$(this)[0].children[0].addEventListener("transitionend", function(e) {
				//FlipCard(e);
				FlipCheck2($(this));
			});
			
		});
		$(".card-flippable").each(function() {
			$($(this)).on( "click", function() {
				FlipCard($(this)[0].id);
			});
		});
	}
	
	function FlipCard2(e){
		let src = e.closest(".card-org");
		src[0].children[0].classList.toggle('flippedf');	
		src[0].children[1].classList.toggle('flippedb');
	}
	
	function FlipCard(cardId){
		let src = $('#' + cardId);
		src[0].children[0].classList.toggle('flippedf');	
		src[0].children[1].classList.toggle('flippedb');
	}
	
	function FlipCardPrimary(){
		let src = $("#cardPrimary").closest(".card-org");
		src[0].children[0].classList.toggle('flippedf');	
		src[0].children[1].classList.toggle('flippedb');
	}
	
	function FlipAll(){
		$(".card-small").each(function() {
			$(this).FlipCard = FlipCard2($(this));
		});
	}
	
	function FlipAllDown(){
        const cards = document.querySelectorAll(".card-org");
        cards.forEach(card =>
        {
            card.children[0].classList.remove('flippedf');
            card.children[1].classList.remove('flippedb');
        })
	}
	
	function FlipCheck2(cardId){
		//Don't check on primary card flip
		if(cardId[0].classList.contains("flippedf")){
			let img1 = cardId[0].src.substring(cardId[0].src.lastIndexOf('/') + 1);
			let primImg = $("#cardPrimary")[0].children[0].src.substring($("#cardPrimary")[0].children[0].src.lastIndexOf('/') + 1);
			if(img1 == primImg){
				$("#MatchModalTitle").text('MATCH');
				$("#MatchModalDesc").text("Give " +  GetDrinkVal(cardId) + " drinks");
				$("#MatchModalImg").attr("src",cardId[0].src);
				$("#MatchModalBtn").text("New Game");
				$("#MatchModalBtn").click(function(){NewCard();});
			}
			else{
				cardId.off();
				$("#"+cardId[0].parentElement.id).off();
				$("#MatchModalTitle").text('MISMATCH');
				$("#MatchModalDesc").text("Take " +  GetDrinkVal(cardId) + " drinks");
				$("#MatchModalImg").attr("src",cardId[0].src);
				cardId[0].classList.add('match');
			}
			$("#MatchModal").modal('show');
			
		}
	}
	
	function GetDrinkVal(cardId){
		let DrinkVal = 1;
		switch(GameRule){
			case 0: //Alway 1 drink
				DrinkVal=1; 
				break;
			case 1: //Drink per image
				DrinkVal = cardId[0].value;
				break;
			case 2: //Drink per each turn - i.e. flipped card - 1 (primary card)
				DrinkVal = $(".flippedf").length - 1;
				break;
			case 3: //Drink for each hidden/relealed card
				let img1 = cardId[0].src.substring(cardId[0].src.lastIndexOf('/') + 1);
				let primImg = $("#cardPrimary")[0].children[0].src.substring($("#cardPrimary")[0].children[0].src.lastIndexOf('/') + 1);
				let rCard = $(".flippedf").length - 1;
				let hCard = $(".card-small").length - rCard;
				if(img1 == primImg){
					DrinkVal = hCard;
				}
				else{
					DrinkVal = rCard;
				}
				break;
			}
		return DrinkVal;
	}
	
	function FlipBack(drinkAmt){
		alert('Mismatch - Take ' + drinkAmt + ' drinks');
		wait(500);
		const boxes = document.querySelectorAll('.MisMatch');
		boxes.forEach(box => {
			box.classList.remove('MisMatch');
			box.children[0].classList.remove('flippedf');
			box.children[1].classList.remove('flippedb');
		});
	}
		
	function NewCard(){
		const options = [];
		var repeatNum = [];
		var cCount = 4;
		var cCol = 3;
		var cColPrim = 6;
		var iCount = 0;
		switch(GameSize){case 0: iCount = 8; cCount = 3; cCol = 4; cColPrim = 4; break;
						case 1: iCount = 12; cCount = 4; cCol = 3; cColPrim = 6; break;
						case 2: iCount = 20; cCount = 6; cCol = 2; cColPrim = 8; break;
						case 3: iCount = 44; cCount = 12; cCol = 1; cColPrim = 10; break;}
		for (var i=0; i < iCount; i++){
			let rn = RandomNum(0, jsonData.Options.length)
			options.push(jsonData.Options[rn]);
		}
		//Set number of ROWS
		let gameboard = document.getElementById("gameboard");
		gameboard.innerHTML = "";
		
		
		var inner = "";
		//Row 1
		inner += '<div class="row g-0">';
		for(var c=0; c < cCount; c++){
			inner += `<div class="col col-` + cCol + ` card-org card-small card-flippable" id="card` + c + `">
				<img class="w-100 card-front card-default" src="/images/Icons/beer.svg" />
				<img class="w-100 card-back card-default" src="/images/Icons/QuestionMark.svg" />
			</div>`;
		}
		inner += '</div>';
		
		//Row 2
		inner += '<div class="row g-0"><div class="col col-' + cCol + '" >';
		for(var c=cCount * 1; c < (cCount * 2) - 2; c++){
			inner += `<div class="position-relative card-org card-small card-flippable" id="card` + c + `">
						<img class="w-100 card-front card-default" src="/images/Icons/beer.svg" />
						<img class="w-100 card-back card-default" src="/images/Icons/QuestionMark.svg" />
					</div>`;
		}
		inner += '</div>'
		//Center Image
		inner += `<div class="col col-` + cColPrim + `" >
					<div class="position-relative card-org card-large" id="cardPrimary">
						<img class="w-100 card-front card-default" src="/images/Icons/WhiskeyAndGlasses.svg" />
						<img class="w-100 card-back card-default" src="/images/Icons/QuestionMarkStart.svg"" />
					</div>
				</div>`;
		inner += '<div class="col col-' + cCol + '" >';
		for(var c=(cCount * 2) - 2; c < (cCount * 3) - 4; c++){
			inner += `<div class="position-relative card-org card-small card-flippable" id="card` + c + `">
						<img class="w-100 card-front card-default" src="/images/Icons/beer.svg" />
						<img class="w-100 card-back card-default" src="/images/Icons/QuestionMark.svg" />
					</div>`;
		}
		inner += '</div></div>';
		
		//Row 3
		inner += '<div class="row g-0">';
		for(var c=(cCount * 3) - 4; c < ((cCount * 3) - 4) + cCount; c++){
			inner += `<div class="col col-` + cCol + ` card-org card-small card-flippable" id="card` + c + `">
				<img class="w-100 card-front card-default" src="/images/Icons/beer.svg" />
				<img class="w-100 card-back card-default" src="/images/Icons/QuestionMark.svg" />
			</div>`;
		}
		inner += '</div>';
		gameboard.innerHTML = inner;
		
		//Set Images - check to make sure all are face down beforehand
		FlipAllDown();
		for(var i = 0; i < options.length; i++){
            let c = document.getElementById("card" + i);
            c.children[0].src = "/images/Icons/" + options[i].img;
            c.children[0].value = options[i].drink;
			//$("#card" + i)[0].children[0].src = "/images/Icons/" + options[i].img;
			//$("#card" + i)[0].children[0].value = options[i].drink;
			//$("#card" + i).children[0].attr("src","/images/Icons/" + options[i]);
		}
		let cardPrimImg = options[RandomNum(0, options.length)].img;
        let cardPrimary = document.getElementById("cardPrimary");
        cardPrimary.children[0].src = "/images/Icons/" + cardPrimImg;
		//$("#cardPrimary")[0].children[0].src = "/images/Icons/" + cardPrimImg;
		$("#MatchModalImgPrim").attr("src","/images/Icons/" + cardPrimImg);
		//$("#cardPrimary").attr("src","/images/Icons/" + options[RandomNum(0, options.length)]);
		
		//Add start listener
		$("#cardPrimary").on( "click", function() {
			Start();
		});

		//Reset MatchModal
		$("#MatchModalBtn").text("Close");
		$("#MatchModalBtn").off("click");
		
		
		//Display timer
		document.getElementById("Timer").innerHTML = GameTimer;
	}
	function RandomNum(min, max) { // min and max included 
		return Math.floor(Math.random() * (max - min) + min)
	};
	
	function wait(ms){
		var start = new Date().getTime();
		var end = start;
		while(end < start + ms) {
			end = new Date().getTime();
		}
	}
	function UpdateLabelSizeSlider(e){
		switch (e.srcElement.value){
			case "0":
				document.getElementById("GameSizeSliderLabel").innerHTML = "Difficulty: EASY (3x3)";
				GameSize = 0;
				break;
			case "1":
				document.getElementById("GameSizeSliderLabel").innerHTML = "Difficulty: NORMAL (4x4)";
				GameSize = 1;
				break;
			case "2":
				document.getElementById("GameSizeSliderLabel").innerHTML = "Difficulty: HARD (6x6)";
				GameSize = 2;
				break;
			case "3":
				document.getElementById("GameSizeSliderLabel").innerHTML = "Difficulty: INSANE (12x12)";
				GameSize = 3;
				break;
			default:
				document.getElementById("GameSizeSliderLabel").innerHTML = "Game Size: (4x4) default";
				GameSize = 1;
		}
		NewCard();
	}

	function UpdateGameRulesSlider(e){
		switch (e.srcElement.value){
			case "0":
			GameRulesSliderLabel
				$("#GameRulesSliderLabel").text("Drinking Rules: Give 1 Take 1");
				$(".GameRulesDesc").text("(Give/Take 1 drink per guess)");
				GameRule = 0;
				break;
			case "1":
				$("#GameRulesSliderLabel").text("Drinking Rules: What the image says");
				$(".GameRulesDesc").text("(Give/Take 1 drink for each drink imaged on your guess)");
				GameRule = 1;
				break;
			case "2":
				$("#GameRulesSliderLabel").text("Drinking Rules: 1 + 1 + 1 + 1...");
				$(".GameRulesDesc").text("(Give/Take 1 drink for each turn)");
				GameRule = 2;
				break;
			case "3":
				$("#GameRulesSliderLabel").text("Drinking Rules: Better win fast");
				$(".GameRulesDesc").text("(Take 1 drink for each tile revealed. Give 1 drink for each tile hidden)");
				GameRule = 3;
				break;
			default:
				$("#GameRulesSliderDesc").text("Drinking Rules: Give 1 Take 1");
				$(".GameRulesDesc").text("(Give/Take 1 drink per guess)");
				GameSize = 0;
		}
	}
	
	function UpdateLabelTimerSlider(e){
		GameTimer = e.srcElement.value;
		document.getElementById("Timer").innerHTML = GameTimer;
		document.getElementById("GameTimerSliderLabel").innerHTML = "Timer: " + GameTimer + " seconds";
		
	}