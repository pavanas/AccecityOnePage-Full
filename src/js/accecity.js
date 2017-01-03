require("../css/accecity.scss");

let scroll_position = [0, 0];
let ticking = false;
let window_w = window.innerWidth;
let touch_start = 0;
let isNavbarActive = false;

checkWindowWidth(window_w);

/*window.addEventListener('scroll', (e) => {

	scroll_position = window.scrollY;

	if(scroll_position > 570 ) {
		//last_scroll_pos = scroll_position;
		//if(scroll_position >= last_scroll_pos) {
			let elem = document.querySelectorAll('.navbar');
			elem.className = "hidden";
		//}
		//else{

		//}
		
	}
	else {
		//document.querySelectorAll('.navbar').removeClass('hidden');
	}
});*/

function doSomething(scroll_pos) {
	let elem = document.querySelector('.navbar');
	if(scroll_pos[1] > 570) {
		if(scroll_pos[1] < scroll_pos[0]) {
			elem.classList.remove('hidden');
		}
		else {
			if(!elem.classList.contains('hidden')) {
				elem.classList.add('hidden');
			}
		}
	}
	else {
		if(elem.classList.contains('hidden')) {
			elem.classList.remove('hidden');
		}
	}
	scroll_position[0] = scroll_pos[1];
}

function checkWindowWidth(w) {
	(w <= 530 ) ? document.querySelector(".navbar").classList.add("onTop") : document.querySelector('.navbar').classList.remove('onTop');
}

window.addEventListener('scroll', function(e) {
  scroll_position[1] = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(scroll_position);
      ticking = false;
    });
  }
  ticking = true;
});

window.addEventListener('resize', function(e) {
	let ww = window.innerWidth;

	checkWindowWidth(ww);
});

document.querySelector('.navbar-menu').addEventListener('click', function(e) {
	e.preventDefault();
	(this.parentNode.classList.contains('active')) ? this.parentNode.classList.remove('active') : this.parentNode.classList.add('active');
});

document.querySelector('.navbar-menu').addEventListener('touchstart', function(e) {
	e.preventDefault();
	console.log('TouchStart!');
	let touchObj = e.changedTouches[0];
	touch_start = parseInt(touchObj.clientY);
	console.log("Start: "+touch_start);
	this.style.cursor = 'grabbing';
}, false);

document.querySelector('.navbar-menu').addEventListener('touchmove', function(e) {
	e.preventDefault();
	let touchObj = e.changedTouches[0];
	console.log('TouchMove!: '+touchObj.clientY);
	let touch_dist = (isNavbarActive) ? touch_start - touchObj.clientY : touchObj.clientY - touch_start - 70;
	if(touch_dist <= 0 && touch_dist >= -70) {
		console.log('Dist: '+touch_dist);
		if(touch_dist > -60) {
			document.querySelector('.onTop').classList.add('active');
			isNavbarActive = true;
		}
		/*else {
			if(touch_dist > 10) {
				document.querySelector('.onTop').classList.remove('active');
			}
		}*/
	}
	else {
		if(isNavbarActive && touch_dist > 10) {
			document.querySelector('.onTop').classList.remove('active');
		}
	}
	
}, false);

document.querySelector('.navbar-menu').addEventListener('touchend', function(e) {
	e.preventDefault();
	console.log('TouchEnd!');
	this.style.cursor = 'grab';
	touch_start = 0;
}, false);

