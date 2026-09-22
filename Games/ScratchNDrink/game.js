var options = [];

let imgBeer = document.getElementById("keyBeer");
let imgBeer2 = document.getElementById("keyBeer2");
let imgSafe = document.getElementById("keySafe");
let imgAgain = document.getElementById("keyAgain");
let imgSkull = document.getElementById("keySkull");

	window.onload = (event) => {
		themeChange(localStorage.getItem("playbase-color-theme"))
		NewCard();
		UpdatePercent();
	}

	
	function StartDraw(e){
		e.preventDefault = true;
		var svg = e.srcElement.closest("svg");
		var drawGroup = svg.children[0].children[0];
		var offsetX = svg.getBoundingClientRect().x;
		var offsetY = svg.getBoundingClientRect().y;

		let imgSrc = e.target.parentElement.children[2].href.baseVal;
		if (drawGroup.children.length == 0){
			options.splice(options.indexOf(imgSrc.substring(14).replace(".svg", "")), 1);
			UpdatePercent();
		}

		var drawLine = '<circle cx="' + (e.touches[0].clientX - offsetX) + '" cy="' + (e.touches[0].clientY - offsetY) + '" r="25" />';
		drawGroup.innerHTML += drawLine;
	}
	
	function StopDraw(e){
		e.preventDefault = false;
		var svg = e.srcElement.closest("svg");
		var drawGroup = svg.children[0].children[0];
		drawLine = "";
	}
	
	function Drawing(e){
		e.preventDefault();
		var svg = e.srcElement.closest("svg");
		var drawGroup = svg.children[0].children[0];
		var offsetX = svg.getBoundingClientRect().x;
		var offsetY = svg.getBoundingClientRect().y;

		drawLine = '<circle cx="' + (e.touches[0].clientX - offsetX) + '" cy="' + (e.touches[0].clientY - offsetY) + '" r="25" />';
		drawGroup.innerHTML += drawLine;
		
		
		if(svg.children[0].children[0].children.length > 20){
			drawLine = '<rect width="100%" height="100%" />'
			drawGroup.innerHTML += drawLine;
			//remove event listener here
		}
	}
	

	

	function NewCard(){
		options = [];
		let sliders = document.getElementsByClassName("settingsSlider");
		let theme = localStorage.getItem("playbase-color-theme")
		for(let s = 0; s < sliders.length; s++){
			let img = sliders[s].id.replace('slider', '');
			for(let ss = 0; ss < sliders[s].value; ss++){
				options.push(img);
			}
		}
		var repeatNum = [];
		
		document.getElementById("GameBoard").innerHTML = "";


		for (let i=1; i <= options.length; i++){
			var randNum = RandomNum(0, options.length);
			var stopRepeat = false;
			
			while(!stopRepeat){
				if(!repeatNum.includes(randNum)){
					let sImg = options[randNum] == 'beer' ? imgBeer.getAttribute('src')
							: options[randNum] == 'beer2' ? imgBeer2.getAttribute('src')
							: options[randNum] == 'safe' ? imgSafe.getAttribute('src')
							: options[randNum] == 'repeat' ? imgAgain.getAttribute('src')
							: options[randNum] == 'crossbones' ? imgSkull.getAttribute('src')
							: 'red_X';

					document.getElementById("GameBoard").innerHTML += '<svg width="22vw" height="22vw" ontouchstart="StartDraw(event)" ontouchend="StopDraw(event)" ontouchmove="Drawing(event)">' +
																		'<defs><clipPath id="drawGroup' + i + '"></clipPath></defs><rect x="0" y="0" width="22vw" height="22vw" stroke="black" fill="gray" stroke-width="5" opacity="1" /><image href="' + sImg + '" class="' + options[randNum] + '" height="100%" width="100%" clip-path="url(#drawGroup' + i + ')" />' +
																		'</svg>';

					
					//document.getElementById("svg" + i).innerHTML = '<defs><clipPath id="drawGroup' + i + '"></clipPath></defs><rect x="0" y="0" width="22vw" height="22vw" stroke="black" fill="gray" stroke-width="5" opacity="1" /><image href="' + options[randNum] + '.svg" height="100%" width="100%" clip-path="url(#drawGroup' + i + ')" />';
					
					
					repeatNum[i] = randNum;
					stopRepeat = true;
				}
				else {
					var randNum = RandomNum(0, options.length);
					stopRepeat = false;
				}
			}	
		}
		UpdatePercent();
	}
	function RandomNum(min, max) { // min and max included 
			return Math.floor(Math.random() * (max - min) + min)
		};
		
	function UpdateSliderLabel(e){
		var sliderVal = e.srcElement.value;
		e.srcElement.labels[1].innerText = '   ' + sliderVal;
	}
	function UpdatePercent(){
		const counts = groupAndCount(options);
        console.log(counts);
		//$("#perc-beer").text(nanToZero(Math.trunc(counts["beer"] / options.length * 100)) + "%");
		//$("#perc-beer2").text(nanToZero(Math.trunc(counts["beer2"] / options.length * 100)) + "%");
		//$("#perc-safe").text(nanToZero(Math.trunc(counts["safe"] / options.length * 100)) + "%");
		//$("#perc-repeat").text(nanToZero(Math.trunc(counts["repeat"] / options.length * 100)) + "%");
		document.getElementById('perc-crossbones').innerText = "Chance of Punishment: " + nanToZero(Math.trunc(counts["crossbones"] / options.length * 100)) + "%";
        //$("#perc-crossbones").text("Chance of Death: " + nanToZero(Math.trunc(counts["crossbones"] / options.length * 100)) + "%");
	}

	function groupAndCount(arr) {
      if (!Array.isArray(arr)) {
        throw new TypeError("Input must be an array.");
    	}

		return arr.reduce((acc, value) => {
			const key = String(value);
			acc[key] = (acc[key] || 0) + 1;
			return acc;
		}, Object.create(null));
	}
	
	function nanToZero(value) {
		return isNaN(value) ? 0 : value;
	}

function themeChange(theme){
	console.log(theme);
	const oldKeyBeer = imgBeer.getAttribute('src');
	const oldKeyBeer2 = imgBeer2.getAttribute('src');
	const oldKeySafe = imgSafe.getAttribute('src');
	const oldKeyAgain = imgAgain.getAttribute('src');
	const oldKeySkull = imgSkull.getAttribute('src');


	let newKeyBeer = theme == 'default' ? '/images/Icons/beer.svg'
				   : theme == 'luxury-bar' ?'/images/Icons/cocktail2.svg'
				   : theme == 'fantasy-tavern' ?'/images/Icons/beerStein2.svg'
				   : theme == 'dive-bar' ?'/images/Icons/beer-mug.svg'
				   : theme == 'micro-brewery' ?'/images/Icons/pint.svg'
				   : theme == 'halloween' ?'/images/Icons/spider.svg'
				   : '/images/Icons/beer.svg';
	let newKeyBeer2 = theme == 'default' ? '/images/Icons/beer2.svg'
                	: theme == 'luxury-bar' ?'/images/Icons/martiniGlasses.svg'
				    : theme == 'fantasy-tavern' ?'/images/Icons/beerBarrel.svg'
				    : theme == 'dive-bar' ?'/images/Icons/beerGlassAndPitcher.svg'
				    : theme == 'micro-brewery' ?'/images/Icons/beer4.svg'
					: theme == 'halloween' ?'/images/Icons/bats.svg'
				    : '/images/Icons/beer2.svg';
	let newKeySafe = theme == 'default' ? '/images/Icons/safe.svg'
                	: theme == 'luxury-bar' ?'/images/Icons/safe.svg'
				    : theme == 'fantasy-tavern' ?'/images/Icons/safe.svg'
				    : theme == 'dive-bar' ?'/images/Icons/barStool.svg'
				    : theme == 'micro-brewery' ?'/images/Icons/hops.svg'
					: theme == 'halloween' ?'/images/Icons/zombieHand.svg'
				    : '/images/Icons/safe.svg';
	let newKeyAgain = theme == 'default' ? '/images/Icons/repeat.svg'
                	: theme == 'luxury-bar' ?'/images/Icons/categories.svg'
				    : theme == 'fantasy-tavern' ?'/images/Icons/repeat-again.svg'
				    : theme == 'dive-bar' ?'/images/Icons/repeat2.svg'
				    : theme == 'micro-brewery' ?'/images/Icons/repeat2.svg'
					: theme == 'halloween' ?'/images/Icons/repeat2.svg'
				    : '/images/Icons/repeat.svg';
	let newKeySkull = theme == 'default' ? '/images/Icons/crossbones.svg'
                	: theme == 'luxury-bar' ?'/images/Icons/crackedGlass.svg'
				    : theme == 'fantasy-tavern' ?'/images/Icons/crossbones.svg'
				    : theme == 'dive-bar' ?'/images/Icons/vomiting.svg'
				    : theme == 'micro-brewery' ?'/images/Icons/toilet.svg'
					: theme == 'halloween' ?'/images/Icons/crossbones.svg'
				    : '/images/Icons/crossbones.svg';

	let images = document.querySelectorAll('img');
	images.forEach(img => {
		if (img.getAttribute('src') === oldKeyBeer) {img.src = newKeyBeer;}
		if (img.getAttribute('src') === oldKeyBeer2) {img.src = newKeyBeer2;}
		if (img.getAttribute('src') === oldKeySafe) {img.src = newKeySafe;}
		if (img.getAttribute('src') === oldKeyAgain) {img.src = newKeyAgain;}
		if (img.getAttribute('src') === oldKeySkull) {img.src = newKeySkull;}
	});

	updateBoardImages();
}

function updateBoardImages(){
let svgs = document.querySelectorAll('svg image');
	svgs.forEach(svg => {
		if (svg.classList.contains('beer')) {svg.setAttribute('href', imgBeer.getAttribute('src'));}
		if (svg.classList.contains('beer2')) {svg.setAttribute('href', imgBeer2.getAttribute('src'));}
		if (svg.classList.contains('safe')) {svg.setAttribute('href', imgSafe.getAttribute('src'));}
		if (svg.classList.contains('repeat')) {svg.setAttribute('href', imgAgain.getAttribute('src'));}
		if (svg.classList.contains('crossbones')) {svg.setAttribute('href', imgSkull.getAttribute('src'));}
		//img.setAttribute('href', '/images/Icons/red_X.svg')

	});
}