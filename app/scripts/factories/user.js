'use strict';

angular.module('RecoverLaboratory')
  .factory('User', function Auth($rootScope, $cookies) {

    return {
      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      setCurrentUser: function(selection) {
        console.log(selection);
         $rootScope.currentUser = selection;
          $cookies.put('choice', selection);

      },

      getCurrentUser: function() {
        var userChoice = $cookies.get('choice');
          return userChoice;
      },
      getMe: function(){
        var ja_face = new JAFace();
          function JAFace() {
            var JAF = {};

            init();

            return JAF;

            function init() {
              loadGlobals();
              loadCanvases();
              var load_images = loadImages();
              load_images.then(function(r) {
                // console.log(r);
                resetEyes();
                frameUpdate();
              }, function(e) {
                console.error(e);
              })
            }

            function loadGlobals() {
              JAF.frames = 10;
              JAF.index = 0;
              JAF.direction = 'up';
            }

            function loadCanvases() {
              JAF.cvs_mouth = document.getElementById("mouth");
              JAF.ctx_mouth = JAF.cvs_mouth.getContext("2d");
              JAF.cvs_eye_l = document.getElementById("eye-l");
              JAF.ctx_eye_l = JAF.cvs_eye_l.getContext("2d");
              JAF.cvs_eye_r = document.getElementById("eye-r");
              JAF.ctx_eye_r = JAF.cvs_eye_r.getContext("2d");
              JAF.width = 400;
              JAF.height = 368;
            }

            function loadImages() {
              JAF.images = {
                mouth: {},
                eyes: {}
              };

              return new Promise(function(res, rej) {
                var url = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/111863/",
                  prefix = "ja-face-",
                  file_type = "png",
                  eyes = "left right".split(" "),
                  dirs = "up down left right".split(" "),
                  frames = JAF.frames,
                  total_frames = frames * eyes.length * dirs.length + frames,
                  loaded = 0;

                for (var i = 0; i < frames; i++) {
                  var mouth_file_name = url + prefix + "mouth-0" + i + "." + file_type;
                  var mouth_img = new Image();
                  mouth_img.setAttribute("data-mouth-index", i);
                  mouth_img.src = mouth_file_name;
                  mouth_img.crossOrigin = "Anonymous";
                  mouth_img.addEventListener("load", function(e) {
                    loaded++;
                    JAF.images.mouth[e.target.getAttribute("data-mouth-index")] = e.target;
                    if (loaded === total_frames) {
                      res(JAF.images);
                    }
                  });

                  for (var e = 0; e < eyes.length; e++) {
                    for (var d = 0; d < dirs.length; d++) {
                      var name = eyes[e] + "_" + dirs[d];
                      if (!JAF.images.eyes[name]) JAF.images.eyes[name] = {};
                      var file_name = url + prefix + eyes[e] + "-eye-" + dirs[d] + "-0" + i + "." + file_type;
                      var img = new Image();
                      img.setAttribute("data-eye-type", name);
                      img.setAttribute("data-eye-index", i);
                      img.src = file_name;
                      img.crossOrigin = "Anonymous";
                      img.addEventListener("load", function(e) {
                        loaded++;
                        JAF.images.eyes[e.target.getAttribute("data-eye-type")][e.target.getAttribute("data-eye-index")] = e.target;
                        if (loaded === total_frames) {
                          res(JAF.images);
                        }
                      });
                    }
                  }
                }

              });
            }

            function frameUpdate() {
              drawParts();
              updateIndex();
              window.requestAnimationFrame(function() {
                frameUpdate();
              });
            }

            function drawImage(context, image, x, y) {
              context.clearRect(0, 0, JAF.width, JAF.height);
              context.drawImage(image, x, y)
            }

            function drawParts() {
              drawImage(JAF.ctx_mouth, JAF.images.mouth[JAF.index], JAF.width / 4, JAF.height / 2);
              drawImage(JAF.ctx_eye_l, JAF.left_eye[JAF.index], 200, 0);
              drawImage(JAF.ctx_eye_r, JAF.right_eye[JAF.index], JAF.width / 2, 0);
            }

            function updateIndex() {
              if (JAF.direction === 'up') {
                if (JAF.index < JAF.frames - 1) {
                  JAF.index++;
                } else {
                  JAF.direction = 'down';
                  JAF.index--;
                }
              } else {
                if (JAF.index > 0) {
                  JAF.index--;
                } else {
                  resetEyes();
                  JAF.direction = 'up';
                  JAF.index++;
                }
              }
            }

            function resetEyes() {
              var dirs = "left right up down".split(" ");
              JAF.left_eye = JAF.images.eyes["left_" + dirs[Math.floor(Math.random() * dirs.length)]];
              JAF.right_eye = JAF.images.eyes["right_" + dirs[Math.floor(Math.random() * dirs.length)]];
            }
          }

      },
      getSnake: function() {
        $(document).ready(function() {
          //variables for animations and for perspective-div resizing
          var $textContainer = $(".text-container");
          var $perspectiveBox = $("#perspective-box");
          var $img = $(".img-container img");
          var pageWidth, pageHeight;
          var basePage = {
            width: 2100,
            height: 500,
            scale: 1,
            scaleX: 1,
            scaleY: 1
          };
          var $page = $('#perspective-box');

          function wrapWithSpans(classToWrap) {
            var i = 0;
            //creates a div to hold all the text with spans
            var holderDiv = $('<div class=".text-holder"></div>')
              //adds spans to all the text in the div we want to blur ('blur-text'), and adds the text with spans to the holder div
            while (i < $(classToWrap).text().length) {
              holderDiv.append($('<span id="char-' + i + '">' + $(classToWrap).text()[i] + '</span>'));

              i++;
            }
            //delete contents of blur-text
            $(classToWrap).empty();

            //add contents of holder div to blur-text div
            $(classToWrap).append(holderDiv.html());
          }

          function blurTheText(classToBlur, extraBlur) {
            //Add a blur effect to each span
            var i = 0;
            var letterToBlurClass = $(classToBlur + " span");
            var numberOfSpans = $(classToBlur + " > span").length;
            while (i < numberOfSpans) {
              var letterToBlur = letterToBlurClass.eq(i);
              //get the amount to blur each letter
              var returnedBlurAmount = getBlurAmount(i, numberOfSpans, letterToBlurClass, extraBlur);
              //adds the new blurry CSS to each letter that we want to blur
              letterToBlur.css({
                "text-shadow": "0 0 " + (returnedBlurAmount) + "px rgba(255,255,255,0.8)",
                "color": "transparent",
              });
              i++

            }
          };

          //determines how much to blur each letter, using index and number of letters (spans)
          function getBlurAmount(i, numberOfSpans, letterToBlurClass, extraBlur) {
            var middleOfString = numberOfSpans / 2
            var fontSize = parseFloat(letterToBlurClass.css("font-size"));
            var blurAmount
            extraBlur = extraBlur || 0;
            if (i < middleOfString) {
              blurAmount = (middleOfString - i) * (fontSize / 38) + extraBlur;
            } else {
              blurAmount = (i - middleOfString) * (fontSize / 38) + extraBlur;
            }
            return blurAmount;
          };

          var textLinesArr = ["#blur-text", "#blur-text0", "#blur-text1", "#blur-text2", "#blur-text3",
            "#blur-text4", "#blur-text5", "#blur-text6", "#blur-text7", "#blur-text8", "#blur-text9"
          ];

          function wrapAllLinesWithSpans() {
            var i = 0;
            while (i < textLinesArr.length) {
              wrapWithSpans(textLinesArr[i]);
              i++;
            }
          }
          wrapAllLinesWithSpans();

          //determines the extra blur amount which we use to adjust the blur while scrolling
          function adjustBlur(scrollBlurAmount) {
            var i = 0;
            while (i < textLinesArr.length) {
              blurTheText(textLinesArr[i], scrollBlurAmount);
              i++;
            }
          };
          adjustBlur(0);

          //grabbed now and debounce functions from underscore so I don't need cdn
          //debounce makes sure our resize  and our on scroll don't fire too many times
          var now = Date.now || function() {
            return new Date().getTime();
          };

          var debounce = function(func, wait, immediate) {
            var timeout, args, context, timestamp, result;

            var later = function() {
              var last = now() - timestamp;

              if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
              } else {
                timeout = null;
                if (!immediate) {
                  result = func.apply(context, args);
                  if (!timeout) context = args = null;
                }
              }
            };

            return function() {
              context = this;
              args = arguments;
              timestamp = now();
              var callNow = immediate && !timeout;
              if (!timeout) timeout = setTimeout(later, wait);
              if (callNow) {
                result = func.apply(context, args);
                context = args = null;
              }

              return result;
            };
          };

          //animates the image on the left with a fade in
          function fadeInAnimation() {
            $img.animate({
              "opacity": 1
            }, 3000, "linear");
          }
          fadeInAnimation();

          var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

          if (!isSafari) {
            //animates the perspective box to skew and blur on scroll
            $(window).scroll(debounce(function() {
              if ($(window).scrollTop() > $textContainer.height()) {
                return
              } else {
                //get the height of the perspective box container
                var perspectiveBoxHeight = $textContainer.height();
                var distanceFromTopOfScreen = $(window).scrollTop();
                var percentageOfTotalScrollDistance = (distanceFromTopOfScreen / perspectiveBoxHeight);
                var amountToChangePerspective = 500 * percentageOfTotalScrollDistance;
                var amountToChangeOpacity = 1 - percentageOfTotalScrollDistance;
                var extraBlur = 50 * percentageOfTotalScrollDistance;
                debounce(adjustBlur, 150)(extraBlur);
                $perspectiveBox.css("perspective", 1100 - amountToChangePerspective + "px");
                $img.css("opacity", amountToChangeOpacity);
              }
            }, 1));
          }

          //resize the perspective box div responsively (as modified from http://codepen.io/cRckls/pen/mcGCL)

          //defines the size of the box we want to fill
          function getPageSize() {
            pageHeight = $textContainer.height();
            pageWidth = $textContainer.width();
          }

          //here are the functions we're using to resize the box

          getPageSize();
          scalePages($page, pageWidth, pageHeight);
          addMargins($page);

          $page.animate({
            "opacity": "1",
            "perspective": "2000px"
          }, 4000, "swing", function() {
            $page.css({
              "transition": "all 500ms ease-in-out, perspective 1ms",
              "-webkit-transition": "all 500ms ease-in-out, perspective 1ms"
            });
          });

          //using underscore to delay resize method till finished resizing window
          $(window).resize(debounce(function() {
            getPageSize();
            scalePages($page, pageWidth, pageHeight);
            addMargins($page);
          }, 150));

          //calculates and adds the scale value to the css on blur-text box
          function scalePages(page, maxWidth, maxHeight) {
            var scaleX = 1,
              scaleY = 1;
            scaleX = (maxWidth / basePage.width) * 1.3;
            scaleY = (maxHeight / basePage.height) * 1.3;
            basePage.scaleX = scaleX;
            basePage.scaleY = scaleY;
            basePage.scale = (scaleX > scaleY) ? scaleY : scaleX;

            var newLeftPos = Math.abs(Math.floor(((basePage.width * basePage.scale) - maxWidth) / 2));
            var newTopPos = Math.abs(Math.floor(((basePage.height * basePage.scale) - maxHeight) / 100));

            page.css({
              "-webkit-transform": "scale(" + basePage.scale + ")",
              "transform": "scale(" + basePage.scale + ")",
              "left": newLeftPos + "px",
              "top": newTopPos + "px"
            });
          }

          //above function doesn't position the resized box very well. this adjusts margins to help out.
          function addMargins(page) {
            var newTopMarg = 0;
            var newLeftMarg = -60;
            if (pageWidth >= 775) {
              newTopMarg = //(pageWidth * .15 * .15 );
              newLeftMarg = -250;
            } else {
              newTopMarg = -200// -(140 - (pageWidth * .05 * .10));
            }
            page.css({
              "margin-top": newTopMarg + "px",
              "margin-left": newLeftMarg + "%"
            });
          }
        });
            },

      getFriend: function() {
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

        HeartsBackground.initialize();
      }

    };
  });
