function throttle(callback, timelimit) {
    let wait = false;   //cache wait flag via closure              
    return function () {               
        if (!wait) {                   
            callback.call();           
            wait = true;               
            setTimeout(function () {   
                wait = false;          
            }, timelimit);
        }
    }
}

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function checkPassed() {
	//cache header and blocks via closure
	let passBlocks = document.querySelectorAll('.block');
	let headerEle = document.querySelector('header');
	return function() {
		passBlocks.forEach(item => {
			console.log(item);
			if (item.offsetTop < window.pageYOffset) {
				//because we styled blocks via external stylesheet we need to use window object to retrieve styles
				headerEle.style.backgroundColor = window.getComputedStyle(item).getPropertyValue('background-color');
				headerEle.querySelector('span').innerHTML = rgb2hex(headerEle.style.backgroundColor);
			}
		});
		;
	}
}
let throttledFunc = throttle(checkPassed(),200);
document.addEventListener('scroll', function() {
	throttledFunc();
});

