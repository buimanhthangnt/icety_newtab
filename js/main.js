 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: false
 });

 function getDate(datetime) {
	if (!datetime) datetime = new Date()
	let day = datetime.getDate()
	if (day < 10) day = "0" + day;
	let month = datetime.getMonth() + 1
	if (month < 10) month = "0" + month;
	let year = datetime.getFullYear()
	return "" + day + "/" + month + "/" + year + "";
 }
 function getTime(datetime) {
	if (!datetime) datetime = new Date()
	let hour = datetime.getHours();
	if (hour < 10) hour = "0" + hour;
	let minute = datetime.getMinutes() + 1
	if (minute < 10) minute = "0" + minute;
	return "" + hour + ":" + minute + "";
 }

let todos = window.localStorage.getItem('todos') || "[]";
todos = JSON.parse(todos)

jQuery(document).ready(function($) {
	/////////////////////////////////////////////////////////////////////////////////////////
	"use strict";

	$("#todo-add-submit").on('click', function (e) {
		e.preventDefault();
		let title = $("#todo-add-title").val();
		if (title.trim() == "") return;
		$("#todo-add-title").val("")
		let datetime = new Date($("#todo-add-datetime").val());
		// if (datetime == "Invalid Date") return;
		if (!datetime) return;
		$("#todo-add-datetime").val(null);
		let todo = {
			title: title,
			date: getDate(datetime),
			time: getTime(datetime),
			done: false
		}
		handleAdd(todo);
	})

	function update(todos, oldTodos) {
		if (!oldTodos) oldTodos = todos;
		for (let i = 0; i < oldTodos.length; i++) {
			$(`#todo-${i}`).remove();
		}
		window.localStorage.setItem('todos', JSON.stringify(todos));
		renderTodos(todos);
	}

	function handleAdd(todo) {
		todos.push(todo);
		update(todos);
	}

	function handleDelete(index) {
		$(`#todo-${index}`).css("transform", "translate(100%, 0%)")
											.css("transition", "all 800ms ease")
		setTimeout(function () {
			let new_todos = todos.filter((t, i) => i != index);
			update(new_todos, todos);
			todos = new_todos;
		}, 600);
	}

	function handleDone(index) {
		todos = todos.map((t, i) => {
			if (i != index) return t;
			else {
				t.done = true;
				return t;
			}
		})
		update(todos);
	}

	function renderTodos(todos) {
		todos = todos.sort((t1, t2) => {
			return t1.date < t2.date && t1.time < t2.time;
		});
		for (let i = 0; i < todos.length; i++) {
			let todo = todos[i];
			let title = todo.title.length > 30 ? todo.title.substring(0, 30) + "..." : todo.title;
			let date = todo.date;
			let time = todo.time;
			let tag = todo.done ? "Completed" : "Todo";
			let strEle = `<div id=\"todo-${i}\" class=\"row\"><div class=\"col-md-2\"></div><div class=\"col-md-8\"><div class=\"job-post-item bg-white p-4 d-block d-md-flex align-items-center\"><div class=\"mb-4 mb-md-0 mr-5\"><div class=\"job-post-item-header d-flex align-items-center\"><h2 class=\"mr-3 text-black h4\">${title}</h2><div class=\"badge-wrap\"><span class=\"${todo.done ? "bg-success" : "bg-warning"} text-white badge py-2 px-4\">${tag}</span></div></div><div class=\"job-post-item-body d-block d-md-flex\"><div class=\"mr-5\"><span class=\"fl-bigmug-line-portfolio23\"></span> ${date}</div><div><span class=\"fl-bigmug-line-big104\"></span> <span>${time}</span></div></div></div><div class=\"ml-auto\"><span id="todo-delete-${i}" class=\"btn btn-secondary rounded-circle btn-favorite text-gray-500\" style=\"margin-right: 30px !important; color: white !important; border-color: #f23a2e; background: #f23a2e;\"><span class=\"icon-trash\"></span></span><button class=\"btn btn-primary py-2\" ${todo.done ? "disabled" : ""} id="todo-done-${i}">Done</button></div></div></div><div class=\"col-md-2\"></div></div>`;
			$("#todoslist").append($(strEle));
		}
		for (let i = 0; i < todos.length; i++) {
			$(`#todo-done-${i}`).on('click', function() {handleDone(i)});
			$(`#todo-delete-${i}`).on('click', function() {handleDelete(i)});
		}
	}

	renderTodos(todos);
	///////////////////////////////////////////////////////////////////////////////////

	let siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			let $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			let counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        let $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      let $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			let $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})
		
		///////////////////////////////////////////////////////////////
    $(".toggle_icon").on('click', function () {
        $('.right_fix_bar').toggleClass("open_sidebar");
				$('.site-wrap').toggleClass('opacity-1');
				$(".toggle_icon").toggleClass('opacity-1');
				setTimeout(function() {
					$(".toggle_icon").toggleClass('opacity-1');
				}, 300);
		});

		$("#pills-job-tab").on('click', function() {
			$('#pills-tabContent').toggleClass('tab-content-faded');
		});

		$('#btn-save-name').on('click', function(e) {
			e.preventDefault();
			let username = $('#username-input').val();
			window.localStorage.setItem('username', username);
			$('#username-input').val("");
			alert("Set your name successfully. Refresh page to see affects.")
		});

		let username = window.localStorage.getItem('username');
		$("#welcome-text").text((username ? ("Hi, " + username) : "Welcome"));
		let url = window.localStorage.getItem('url');
		url = (url && navigator.onLine) ? url : "images/background.jpg";
		$(".site-blocks-cover").css("background-image", 'url('+ url +')');

		function ValidURL(str) {
			let pattern = new RegExp('^(https?:\/\/)?'+ // protocol
				'((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
				'((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
				'(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
				'(\?[;&a-z\d%_.~+=-]*)?'+ // query string
				'(\#[-a-z\d_]*)?$','i'); // fragment locater
			if(!pattern.test(str)) {
				alert("Please enter a valid URL.");
				return false;
			} else {
				return true;
			}
		}
		$("#btn-change-bg").on('click', function(e) {
			e.preventDefault();
			let url = $("#image-url").val();
			if (url.trim() == "") {
				return;
			}
			$(".site-blocks-cover").css("background-image", 'url('+ url +')');
			window.localStorage.setItem('url', url);
			$("#image-url").val("")
		});
		
		//////////////////////////////////////////////////////////////

		$('body').on('click', '.js-menu-toggle', function(e) {
			let $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    let container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();


	let sitePlusMinus = function() {
		$('.js-btn-minus').on('click', function(e){
			e.preventDefault();
			if ( $(this).closest('.input-group').find('.form-control').val() != 0  ) {
				$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
			} else {
				$(this).closest('.input-group').find('.form-control').val(parseInt(0));
			}
		});
		$('.js-btn-plus').on('click', function(e){
			e.preventDefault();
			$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
		});
	};
	// sitePlusMinus();


	let siteSliderRange = function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	};

	let siteCarousel = function () {
		if ( $('.nonloop-block-13').length > 0 ) {
			$('.nonloop-block-13').owlCarousel({
		    center: false,
		    items: 1,
		    loop: true,
				stagePadding: 0,
		    margin: 20,
		    nav: false,
		    dots: true,
				navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
		    responsive:{
	        600:{
	        	margin: 20,
	        	stagePadding: 0,
	          items: 1
	        },
	        1000:{
	        	margin: 20,
	        	stagePadding: 0,
	          items: 2
	        },
	        1200:{
	        	margin: 20,
	        	stagePadding: 0,
	          items: 2
	        }
		    }
			});
		}

		if ( $('.slide-one-item').length > 0 ) {
			$('.slide-one-item').owlCarousel({
		    center: false,
		    items: 1,
		    loop: true,
				stagePadding: 0,
		    margin: 0,
		    autoplay: true,
		    pauseOnHover: false,
		    nav: true,
		    animateOut: 'fadeOut',
		    animateIn: 'fadeIn',
		    navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">']
		  });
	  }


	  if ( $('.nonloop-block-4').length > 0 ) {
		  $('.nonloop-block-4').owlCarousel({
		    center: true,
		    items:1,
		    loop:false,
		    margin:10,
		    nav: true,
				navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
		    responsive:{
	        600:{
	          items:1
	        }
		    }
			});
		}

	};
	siteCarousel();

	let siteCountDown = function() {

		if ( $('#date-countdown').length > 0 ) {
			$('#date-countdown').countdown('2020/10/10', function(event) {
			  let $this = $(this).html(event.strftime(''
			    + '<span class="countdown-block"><span class="label">%w</span> weeks </span>'
			    + '<span class="countdown-block"><span class="label">%d</span> days </span>'
			    + '<span class="countdown-block"><span class="label">%H</span> hr </span>'
			    + '<span class="countdown-block"><span class="label">%M</span> min </span>'
			    + '<span class="countdown-block"><span class="label">%S</span> sec</span>'));
			});
		}
				
	};
	siteCountDown();

	let siteDatePicker = function() {

		if ( $('.datepicker').length > 0 ) {
			$('.datepicker').datepicker();
		}

	};
	siteDatePicker();

});