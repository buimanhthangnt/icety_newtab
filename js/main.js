

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

$(document).ready(function($) {
	"use strict";
	let url = window.localStorage.getItem('url');
	url = (url && navigator.onLine) ? url : "images/background.jpg";
	$(".site-blocks-cover").css("background-image", 'url('+ url +')');

	$(".site-blocks-cover").addClass("start_fade");

	function setNotitext () {
		let filtered = todos.filter(t => {
			if (t.done) return false;
			let current = new Date();
			return getDate(current) > t.date || (getDate(current) == t.date && getTime(current) > t.time)
		});
		if (filtered.length == 0) {
			$("#noti").text("You have nothing to do now");
		} else {
			$("#noti").text(`You have ${filtered.length} things to do`);
		}
	}

	setNotitext();

	$("#todo-add-submit").on('click', function (e) {
		e.preventDefault();
		let title = $("#todo-add-title").val();
		if (title.trim() == "") return;
		$("#todo-add-title").val("")
		let datetime = new Date($("#todo-add-datetime").val());
		if (datetime == "Invalid Date") datetime = new Date();
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
		setNotitext();
	}

	function handleDelete(index) {
		$(`#todo-${index}`).css("transform", "translate(100%, 0%)")
											.css("transition", "all 800ms ease")
		setTimeout(function () {
			let new_todos = todos.filter((t, i) => i != index);
			update(new_todos, todos);
			todos = new_todos;
			setNotitext();
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
		setNotitext();
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

	$("#btn-restore").on('click', function(e) {
		e.preventDefault();
		window.localStorage.clear();
		alert("Restored default settings. Refresh to see affects.")
	});

	$("#noti").on('click', function() {
		$("#myContainer").show();
		setTimeout(function () {
			$('html, body').animate({
					scrollTop: $(".site-blocks-cover").height()
			}, 500);
		}, 50);
	});

	$('#btn-save-name').on('click', function(e) {
		e.preventDefault();
		let username = $('#username-input').val();
		window.localStorage.setItem('username', username);
		$('#username-input').val("");
		$("#welcome-text").text("Hi, " + username);
		alert("Set your name successfully")
	});

	let username = window.localStorage.getItem('username');
	$("#welcome-text").text((username ? ("Hi, " + username) : "Welcome"));

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
		
});