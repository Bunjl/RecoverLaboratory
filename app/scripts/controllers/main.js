'use strict';

/**
 * @ngdoc function
 * @name RecoverLaboratory.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the RecoverLaboratory
 */
angular.module('RecoverLaboratory')
  .controller('MainCtrl', function ($scope) {

  	$scope.friend = false;
  	$scope.snake = false;
  	$scope.me = false;
	
	$scope.iAmAFriend = function(){
		$scope.friend = true;
		
		var HeartsBackground = {
		  heartHeight: 60,
		  heartWidth: 64,
		  hearts: [],
		  heartImage: 'http://i58.tinypic.com/ntnw5.png',
		  maxHearts: 8,
		  minScale: 0.4,
		  draw: function() {
		    this.setCanvasSize();
		    this.ctx.clearRect(0, 0, this.w, this.h);
		    for (var i = 0; i < this.hearts.length; i++) {
		      var heart = this.hearts[i];
		      heart.image = new Image();
		      heart.image.style.height = heart.height;
		      heart.image.src = this.heartImage;
		      this.ctx.globalAlpha = heart.opacity;
		      this.ctx.drawImage(heart.image, heart.x, heart.y, heart.width, heart.height);
		    }
		    this.move();
		  },
		  move: function() {
		    for (var b = 0; b < this.hearts.length; b++) {
		      var heart = this.hearts[b];
		      heart.y += heart.ys;
		      if (heart.y > this.h) {
		        heart.x = Math.random() * this.w;
		        heart.y = -1 * this.heartHeight;
		      }
		    }
		  },
		  setCanvasSize: function() {
		    this.canvas.width = window.innerWidth;
		    this.canvas.height = window.innerHeight;
		    this.w = this.canvas.width;
		    this.h = this.canvas.height;
		  },
		  initialize: function() {
		    this.canvas = $('#canvas')[0];

		    if (!this.canvas.getContext)
		      return;

		    this.setCanvasSize();
		    this.ctx = this.canvas.getContext('2d');

		    for (var a = 0; a < this.maxHearts; a++) {
		      var scale = (Math.random() * (1 - this.minScale)) + this.minScale;
		      this.hearts.push({
		        x: Math.random() * this.w,
		        y: Math.random() * this.h,
		        ys: Math.random() + 1,
		        height: scale * this.heartHeight,
		        width: scale * this.heartWidth,
		        opacity: scale
		      });
		    }

		    setInterval($.proxy(this.draw, this), 30);
		  }
		};

		$(document).ready(function() {
		  HeartsBackground.initialize();
		});

		 /*!
		 * Bubble Cursor.js
		 * - 90's cursors collection
		 * -- https://github.com/tholman/90s-cursor-effects
		 * -- http://codepen.io/tholman/full/qbxxxq/
		 */

		(function bubblesCursor() {
		  
		  var width = window.innerWidth;
		  var height = window.innerHeight;
		  var cursor = {x: width/2, y: width/2};
		  var particles = [];
		  
		  function init() {
		    bindEvents();
		    loop();
		  }
		  
		  // Bind events that are needed
		  function bindEvents() {
		    document.addEventListener('mousemove', onMouseMove);
		    window.addEventListener('resize', onWindowResize);
		  }
		  
		  function onWindowResize(e) {
		    width = window.innerWidth;
		    height = window.innerHeight;
		  }
		  
		  function onTouchMove(e) {
		    if( e.touches.length > 0 ) {
		      for( var i = 0; i < e.touches.length; i++ ) {
		        addParticle(e.touches[i].clientX, e.touches[i].clientY);
		      }
		    }
		  }
		  
		  function onMouseMove(e) {    
		    cursor.x = e.clientX;
		    cursor.y = e.clientY;
		    
		    addParticle( cursor.x, cursor.y);
		  }
		  
		  function addParticle(x, y) {
		    var particle = new Particle();
		    particle.init(x, y);
		    particles.push(particle);
		  }
		  
		  function updateParticles() {
		    
		    // Update
		    for( var i = 0; i < particles.length; i++ ) {
		      particles[i].update();
		    }
		    
		    // Remove dead particles
		    for( var i = particles.length - 1; i >= 0; i-- ) {
		      if( particles[i].lifeSpan < 0 ) {
		        particles[i].die();
		        particles.splice(i, 1);
		      }
		    }
		    
		  }
		  
		  function loop() {
		    requestAnimationFrame(loop);
		    updateParticles();
		  }
		  
		  /**
		   * Particles
		   */
		  
		  function Particle() {

		    this.lifeSpan = 250; //ms
		    this.initialStyles ={
		      "position": "absolute",
		      "display": "block",
		      "pointerEvents": "none",
		      "z-index": "10000000",
		      "width": "5px",
		      "height": "5px",
		      "background": "#e6f1f7",
		      "box-shadow": "-1px 0px #6badd3, 0px -1px #6badd3, 1px 0px #3a92c5, 0px 1px #3a92c5",
		       "border-radius": "1px"
		    };

		    // Init, and set properties
		    this.init = function(x, y) {

		      this.velocity = {
		        x:  (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 10),
		        y: (-.4 + (Math.random() * -1))
		      };
		      
		      this.position = {x: x - 10, y: y - 10};

		      this.element = document.createElement('span');
		      applyProperties(this.element, this.initialStyles);
		      this.update();
		      
		      document.body.appendChild(this.element);
		    };
		    
		    this.update = function() {
		      this.position.x += this.velocity.x;
		      this.position.y += this.velocity.y;
		      
		      // Update velocities
		      this.velocity.x += (Math.random() < 0.5 ? -1 : 1) * 2 / 75;
		      this.velocity.y -= Math.random() / 600;
		      this.lifeSpan--;
		      
		      this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + ( 0.2 + (250 - this.lifeSpan) / 250) + ")";
		    }
		    
		    this.die = function() {
		      this.element.parentNode.removeChild(this.element);
		    }
		  }
		  
		  /**
		   * Utils
		   */
		  
		  // Applies css `properties` to an element.
		  function applyProperties( target, properties ) {
		    for( var key in properties ) {
		      target.style[ key ] = properties[ key ];
		    }
		  }
		  
		  init();
		})();
  	};	

  });
