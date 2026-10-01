	//var optionsString = GetFile("spins.json");
	const jsonAllOptions = spinData; // Options;JSON.parse(optionsString);
	var ActiveOptions = spinData; //JSON.parse(optionsString);

	function toggleSpin(){
		var spinner = document.getElementById("tire");
		spinner.classList.add("startSpin");
		spinner.classList.remove("postSpin");
		var spinPower = Math.trunc((Math.random() * 720) + 720);
		var spinSec = spinPower * 5;

		var r = document.querySelector(':root');
		r.style.setProperty('--spinMax', (spinPower * -1) + 'deg');
		r.style.setProperty('--spinSec', spinSec + 'ms');
		
		//spinner.style= 'transform: rotate(' + spinPower + 'deg); transform-origin: 50% 50%;';
	}

	
	function UpdateSlice(count){
		UpdateAllOptions();
		var spinner = document.getElementById("tire");
		var orgCount = spinner.getElementsByTagName("path").length;
		var newCount = orgCount + count;
		spinner.innerHTML = "";
		


		var startPoint = '0 0'; //translate(50,50)
		
		var radius = 250;
		var fPointX = radius;
		var fPointY = 0;
		var fPoint = fPointX + ' ' + fPointY; //very first point always radius,0
		
		
		var qPointX = Math.ceil(radius * Math.sin(360/newCount * Math.PI / 180.0));
		var qPointY = (radius * Math.cos(360/newCount * Math.PI / 180.0));
		var qPointX2 = Math.ceil((radius * .8) * Math.sin(360/newCount * Math.PI / 180.0));
		var qPointY2 = Math.ceil((radius * .8) * Math.cos(360/newCount * Math.PI / 180.0));
		var qPoint = qPointY + ' ' + qPointX;
		
		var qArcX = qPointX;
		var qArcY = fPointY;
		var qArc = qArcX + ' ' + qArcY;
	

		console.log(qPointY);
		var segWidth = Math.sqrt(Math.pow(qPointY2 - (radius * .8) ,2) + Math.pow(qPointX2 - fPointY ,2))

		for(var i = 0; i < newCount; i++){
			var rotate = (360/newCount) * i;
			
			var imgSize = segWidth / 2;
			var imgX = (qPointY - ((qPointY2 - (radius * .8)) / 2)) - (imgSize / 2);
			var imgY = (qPointX - ((qPointX2 - fPointY) / 2)) - (imgSize / 2);
			//svg.innerHTML += '<path d="M ' + startPoint + ' L ' + fPoint + ' Q ' + qArc + ' ' + qPoint + ' L ' + startPoint + '" fill="blue" stroke="blue" stroke-width="1"/>'; //curved arc
			spinner.innerHTML += '<g transform="translate(' + radius + ',' + radius + ') rotate(' + rotate + ')" style="filter: var(--filter-bright)">' + 
							'<path d="M ' + startPoint + 'L ' + radius +' 0 A ' + radius + ' ' + radius + ' ' + ' 0 0 1 ' + qPointY + ' ' + qPointX + ' L ' + startPoint + '" fill="' + ActiveOptions.Options[i].Color + '" stroke="black" stroke-width="1" />' +							
							'<image x="' + (imgX - (imgSize /2)) + '" y="' + (imgY - (imgSize /2)) + '" width="' + imgSize + 'px" height="' + imgSize + 'px" xlink:href="/images/Icons/' + ActiveOptions.Options[i].Icon + '.svg" style="transform-box: fill-box; transform-origin: center; transform: rotate(95deg);"></image>' +
							//'<circle cx="' + imgX + '" cy="' + imgY + '" r="5" fill="red"/>' +
							'</g>'; //straight line
			

		}
	

	}
	
	function Spin(){
		var spinner = document.getElementById("tire");
		spinner.classList.toggle("tire");
		var spinPower = Math.trunc((Math.random() * 720) + 720);
		var spinSec = spinPower * 5;

		var r = document.querySelector(':root');
		r.style.setProperty('--spinMax', spinPower + 'deg');
		r.style.setProperty('--spinSec', spinSec + 'ms');
		
		setTimeout(spinSec);
		
		spinner.classList.toggle("tire");
		spinner.style= 'transform: rotate(' + spinPower + 'deg); transform-origin: 50% 50%;';
	}
	
	function GetColor(ev){
		var spinner = document.getElementById("tire");
		spinner.classList.add("postSpin");
		spinner.classList.remove("startSpin");
		var spinVal = parseInt(getComputedStyle(spinner).getPropertyValue('--spinMax')) * -1;
		var orgCount = spinner.getElementsByTagName("path").length;
		var diff = 360 / orgCount;	
		var spinRemainer = (spinVal / 360) - Math.floor((spinVal / 360));

		//navigator.vibrate(100);
		document.getElementById("MisfortuneModalTitle").innerHTML = ActiveOptions.Options[Math.ceil((spinRemainer * 360) / diff) - 1].ID;
		document.getElementById("MisfortuneModalDesc").innerHTML = ActiveOptions.Options[Math.ceil((spinRemainer * 360) / diff) - 1].Desc;
		document.getElementById("MisfortuneModalImg").src = '/images/Icons//' + ActiveOptions.Options[Math.ceil((spinRemainer * 360) / diff) - 1].Icon + '.svg';
		
		
		//console.log(ActiveOptions.Options[Math.ceil((spinRemainer * 360) / diff) - 1].MiniWheel);
		//console.log(ActiveOptions.Options[Math.ceil((spinRemainer * 360) / diff) - 1].MiniWheel.length);
		
		
		
		
		
		//miniwheel
		var count = ActiveOptions.Options[Math.ceil((spinRemainer * 360) / diff) - 1].MiniWheel.length;
		if(count > 0) {
		var svg = document.getElementById("MisfortuneModalMiniWheel").parentElement;
			svg.style.display = "block";
		
		
		
		var startPoint = '0 0'; //translate(50,50)
		
		var radius = 250;
		var fPointX = radius;
		var fPointY = 0;
		var fPoint = fPointX + ' ' + fPointY; //very first point always radius,0

		
		var qPointX = Math.ceil(radius * Math.sin(360/count * Math.PI / 180.0));
		var qPointY = Math.ceil(radius * Math.cos(360/count * Math.PI / 180.0));
		var qPointX2 = Math.ceil((radius * .8) * Math.sin(360/count * Math.PI / 180.0));
		var qPointY2 = Math.ceil((radius * .8) * Math.cos(360/count * Math.PI / 180.0));
		var qPoint = qPointY + ' ' + qPointX;
		
		var qArcX = qPointX;
		var qArcY = fPointY;
		var qArc = qArcX + ' ' + qArcY;

		var segWidth = Math.sqrt(Math.pow(qPointY2 - (radius * .8) ,2) + Math.pow(qPointX2 - fPointY ,2))
		document.getElementById("MisfortuneModalMiniWheel").innerHTML = "";
		for(var i = 0; i < count; i++){
			var rotate = (360/count) * i;
			
			var imgSize = segWidth / 2;
			var imgX = (qPointY - ((qPointY2 - (radius * .8)) / 2)) - (imgSize / 2);
			var imgY = (qPointX - ((qPointX2 - fPointY) / 2)) - (imgSize / 2);
			//svg.innerHTML += '<path d="M ' + startPoint + ' L ' + fPoint + ' Q ' + qArc + ' ' + qPoint + ' L ' + startPoint + '" fill="blue" stroke="blue" stroke-width="1"/>'; //curved arc
			document.getElementById("MisfortuneModalMiniWheel").innerHTML += '<g transform="translate(' + radius + ',' + radius + ') rotate(' + rotate + ')" style="filter: var(--filter-bright)">' + 
							'<path d="M ' + startPoint + 'L ' + radius +' 0 A ' + radius + ' ' + radius + ' ' + ' 0 0 1 ' + qPointY + ' ' + qPointX + ' L ' + startPoint +'" fill="' + "#86e98f" + '" stroke="black" stroke-width="1" />' +							
                            '<image x="' + (imgX - (imgSize /2)) + '" y="' + (imgY - (imgSize /2)) + '" width="' + imgSize + 'px" height="' + imgSize + 'px" xlink:href="/images/Numbers/' + ActiveOptions.Options[Math.ceil((spinRemainer * 360) / diff) - 1].MiniWheel[i] + '.svg" style="transform-box: fill-box; transform-origin: center; transform: rotate(108deg);"></image>' +
							//'<circle cx="' + imgX + '" cy="' + imgY + '" r="5" fill="red"/>' +
							'</g>'; //straight line
			

		}
		}
		else {
			var svg = document.getElementById("MisfortuneModalMiniWheel").parentElement;
			svg.style.display = "none";
		}

        mainModal = new bootstrap.Modal(document.getElementById("MisfortuneModal"));
		mainModal.show();
		//window.navigator.vibrate(100);

	}
	
	function ToggleModal(mod){
		$(mod).modal('toggle');
		//var togMod = document.getElementById(mod);
		//togMod.classList.toggle("modal-vis");
	
	}
	
	function UpdateAllOptions(){
		//Get Active Options
		var listbox = document.getElementById("activeSegments");
		listbox.innerHTML = "";
		jsonAllOptions.Options.sort(function (a, b) {return a.ID < b.ID ? -1 : a.ID > b.ID ? 1 : 0;});
		for(var i = 0; i < jsonAllOptions.Options.length; i++){
			var count = ActiveOptions.Options.filter((obj) => obj.ID === jsonAllOptions.Options[i].ID).length;
			listbox.innerHTML += '<div class="setting-option">' + 						
									'<p>' + jsonAllOptions.Options[i].ID + '</p>' +
									'<button onclick=\'RemoveOption("' + jsonAllOptions.Options[i].ID +  '")\'>-</button>' +
									'<p>' + count + '</p>' +
									'<button onclick=\'AddOption("' + jsonAllOptions.Options[i].ID +  '")\'>+</button>' +
								 '</div>';
		}
		

	
	}
	
	function AddOption(option){
		var idx = ActiveOptions.Options.find(obj => obj.ID === option);

		ActiveOptions.Options.push(idx);
		UpdateSlice(1);		
	}
	
	function RemoveOption(option){
		var idx = ActiveOptions.Options.findIndex(obj => obj.ID === option);
	
		ActiveOptions.Options.splice(idx, 1);
		UpdateSlice(-1);
	}
	
window.onload = function() {
		UpdateSlice(ActiveOptions.Options.length);
	
	}
	
	/*
	function toggleNavbar(nav){
		console.log(nav);
		var navbar = document.getElementById(nav);
		var subNavs = document.getElementsByClassName("subnav");
		for (i = 0; i < subNavs.length; i++){
			subNavs[i].classList.add("collapse");
		};
		console.log(nav);
		console.log(navbar);
		navbar.classList.toggle("collapse");
	}
	*/
	