/*
* function rand ， 产生随机整数 。
*/
function rand(minDit, maxDit) {
	return Math.floor(Math.random() * (maxDit - minDit + 1)) + minDit;
};

/*
* function getViewSize ，获取屏幕可视范围的尺寸。
*/
function getViewSize() {
	var de = document.documentElement;
	var db = document.body;
	var viewW = de.clientWidth == 0 ? db.clientWidth : de.clientWidth;
	var viewH = de.clientHeight == 0 ? db.clientHeight : de.clientHeight;
	return Array(viewW, viewH);
};

$(function () {

	julying.gridMenu.menu = Array(
		{ name: 'about-me', pos: rand(1, 10) },
		{ name: 'works', pos: rand(15, 25) },
		{ name: 'link', pos: rand(30, 40) },
		{ name: 'reading', pos: rand(45, 55) },
		{ name: 'apps', pos: rand(60, 70) },
		{ name: 'contact-me', pos: rand(75, 80) }

	);
	julying.gridMenu.init('#julyingGridMenu');

	var canvas = document.querySelector('canvas'),
		ctx = canvas.getContext('2d')
	canvas.width = getViewSize()[0];
	canvas.height = getViewSize()[1];

	ctx.lineWidth = .3;
	ctx.strokeStyle = (new Color(150)).style;

	var mousePosition = {
		x: 30 * canvas.width / 100,
		y: 30 * canvas.height / 100
	};

	var dots = {
		nb: 750,
		distance: 50,
		d_radius: 100,
		array: []
	};

	function colorValue(min) {
		return Math.floor(Math.random() * 255 + min);
	}

	function createColorStyle(r, g, b) {
		return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
	}

	function mixComponents(comp1, weight1, comp2, weight2) {
		return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
	}

	function averageColorStyles(dot1, dot2) {
		var color1 = dot1.color,
			color2 = dot2.color;

		var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
			g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
			b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
		return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
	}

	function Color(min) {
		min = min || 0;
		this.r = colorValue(min);
		this.g = colorValue(min);
		this.b = colorValue(min);
		this.style = createColorStyle(this.r, this.g, this.b);
	}

	function Dot() {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;

		this.vx = -.5 + Math.random();
		this.vy = -.5 + Math.random();

		this.radius = Math.random() * 2;

		this.color = new Color();
		// console.log(this);
	}

	Dot.prototype = {
		draw: function () {
			ctx.beginPath();
			ctx.fillStyle = this.color.style;
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			ctx.fill();
		}
	};

	function createDots() {
		for (i = 0; i < dots.nb; i++) {
			dots.array.push(new Dot());
		}
	}

	function moveDots() {
		for (i = 0; i < dots.nb; i++) {

			var dot = dots.array[i];

			if (dot.y < 0 || dot.y > canvas.height) {
				dot.vx = dot.vx;
				dot.vy = - dot.vy;
			}
			else if (dot.x < 0 || dot.x > canvas.width) {
				dot.vx = - dot.vx;
				dot.vy = dot.vy;
			}
			dot.x += dot.vx;
			dot.y += dot.vy;
		}
	}

	function connectDots() {
		for (i = 0; i < dots.nb; i++) {
			for (j = 0; j < dots.nb; j++) {
				i_dot = dots.array[i];
				j_dot = dots.array[j];

				if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance) {
					if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius) {
						ctx.beginPath();
						ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
						ctx.moveTo(i_dot.x, i_dot.y);
						ctx.lineTo(j_dot.x, j_dot.y);
						ctx.stroke();
						ctx.closePath();
					}
				}
			}
		}
	}

	function drawDots() {
		for (i = 0; i < dots.nb; i++) {
			var dot = dots.array[i];
			dot.draw();
		}
	}

	function animateDots() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		moveDots();
		connectDots();
		drawDots();

		requestAnimationFrame(animateDots);
	}

	$('canvas').on('mousemove', function (e) {
		mousePosition.x = e.pageX;
		mousePosition.y = e.pageY;
	});

	$('canvas').on('mouseleave', function (e) {
		mousePosition.x = canvas.width / 2;
		mousePosition.y = canvas.height / 2;
	});

	var resizeTimer;

	$(window).on('resize', function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			canvas.width = getViewSize()[0];
			canvas.height = getViewSize()[1];
			// createDots();
			// requestAnimationFrame(animateDots);

		}, 200);
	});



	createDots();
	requestAnimationFrame(animateDots);


});


