/* 载入个人信息 */
function load_person_info() {
	$.ajax({
		type: "get",
		url: "http://localhost:8888", 
		data: { "task_name" : "get_person_info" }, 
		dataType: "jsonp",
		jsonp: "callback",
		success: function(result) {
			$("#photo").attr("src", result["photo_addr"]);
			$("#name p").text("姓名: " + result["name"]);
			$("#en_name p").text("英文名: " + result["en_name"]);
			$("#age p").text("年龄: " + result["age"]);
			$("#email").text(result["email"]);
		}
	});
}

function first_li_click(element, num) {
	$("#" + element + " ul li:first").click(function() {
		var count = parseInt((num - 1) / 5) + 1;
		if (count > 5) {
			var first_index = parseInt($(this).text());
			if (first_index > 1) {
				for (var index = 0; index < 5; index++) {
					$("#" + element + " ul li:eq(" + index + ") span").text(first_index - 1 + index + "");
				}
				$(this).removeClass("active");
				$(this).next().addClass("active");
			}
		}
	});
}

function last_li_click(element, num) {
	$("#" + element + " ul li:last").click(function() {
		var count = parseInt((num - 1) / 5) + 1;
		if (count > 5) {
			var last_index = parseInt($(this).text());
			if (last_index < count) {
				for (var index = 0; index < 5; index++) {
					$("#" + element + " ul li:eq(" + index + ") span").text(last_index + 1 - 4 + index + "");
				}
				$(this).removeClass("active");
				$(this).prev().addClass("active");
			}
		}
	});
}

function parse_state(result) {
	var len = result.length;
	var div_text = "";
	for (var count = 0; count < len; count++) {
		var state = result[count];
		var content = state["content"];
		var date = state["date"].split("-");
		date = date[0] + "年" + date[1] + "月" + date[2] + "日";
		div_text += "<div class='state'><p class='state_text'>" + content + "</p><p class='date'>" + date + "</p></div>";
	}
	return div_text;
}

/* 载入状态 */
function load_state() {
	$(".state").remove();
	$.ajax ({
		type: "get",
		url: "http://localhost:8888",
		data: { "task_name" : "get_state" },
		dataType: "jsonp",
		jsonp: "callback",
		success: function(result) {
			$("#tag1_blog").append(parse_state(result));

			$.ajax ({
				type: "get",
				url: "http://localhost:8888",
				data: { "task_name" : "get_state_num" },
				dataType: "jsonp",
				jsonp: "callback",
				success: function(result) {
					var num = result["num"];
					$("#tag1_blog").append("<div id='tag1_page' class='page'>" + pagination(num) + "</div>");

					$("#tag1_page ul li").click(function() {
						if (!$(this).hasClass("active")) {
							$("#tag1_page ul li").removeClass("active");
							$(this).addClass("active");
							$(".state").remove();
							var index = $(this).text();
							var start = (parseInt(index) - 1) * 5;
							$.ajax({
								type: "get",
								url: "http://localhost:8888",
								data: { "task_name" : "get_state", "start" : start },
								dataType: "jsonp",
								jsonp: "callback",
								success: function(result) {
									$("#tag1_page").before(parse_state(result));
								}
							});
						}
					});

					first_li_click("tag1_page", num);
					last_li_click("tag1_page", num);
				}
			});
		}
	});
}

function parse_text_blog_summary(result, text_type) {
	var len = result.length;
	var div_text = "";
	for (var count = 0; count < len; count++) {
		var lite = result[count];
		var id = lite["id"];
		var title = lite["title"];
		var summary = lite["summary"];
		var date = lite["date"].split("-");
		date = date[0] + "年" + date[1] + "月" + date[2] + "日";
		div_text += "<div class='" + text_type + "'><h3>" + title + "</h3><p class='" + text_type + "_text'>" + summary + "<a id= " + id + " class='big-link' data-reveal-id='text_blog'>阅读全文</a></p><p class='date'>" + date + "</p></div>";
	}
	return div_text;
}


function parse_text_blog(task, blog_id) {
	$.ajax({
		type: "get",
		url: "http://localhost:8888",
		data: { "task_name" : task, "id" : blog_id },
		dataType: "jsonp",
		jsonp: "callback",
		success: function(result) {
			var title = result["title"];
			var content = result["content"];
			var date = result["date"].split("-");
			date = date[0] + "年" + date[1] + "月" + date[2] + "日";
			$("#text_detail h3").text(title);
			$("#text_detail p:eq(0)").text(content);
			$("#text_detail p:eq(1)").text(date);
		}
	});
}

function load_lite_blogs(tag) {
	$.ajax({
		type: "get",
		url: "http://localhost:8888",
		data: { "task_name" : "get_lite_blog_summary", "tag" : tag },
		dataType: "jsonp",
		jsonp: "callback",
		success: function(result) {
			$("#tag2_blog").append(parse_text_blog_summary(result, "story"));
			$("#tag2_blog .big-link").click(function() {
				var blog_id = $(this).attr("id");
				parse_text_blog("get_lite_blog", blog_id);
			});

			$.ajax ({
				type: "get",
				url: "http://localhost:8888",
				data: { "task_name" : "get_lite_blog_num", "tag" : tag },
				dataType: "jsonp",
				jsonp: "callback",
				success: function(result) {
					var num = result["num"];
					$("#tag2_blog").append("<div id='tag2_page' class='page'>" + pagination(num) + "</div>");

					$("#tag2_page ul li").click(function() {
						if (!$(this).hasClass("active")) {
							$("#tag2_page ul li").removeClass("active");
							$(this).addClass("active");
							$(".story").remove();
							var index = $(this).text();
							var start = (parseInt(index) - 1) * 5;
							var tag = $(this).text();
							$.ajax({
								type: "get",
								url: "http://localhost:8888",
								data: { "task_name" : "get_lite_blog_summary", "start" : start, "tag" : tag },
								dataType: "jsonp",
								jsonp: "callback",
								success: function(result) {
									$("#tag2_page").before(parse_text_blog_summary(result, "story"));
									$("#tag2_blog .big-link").click(function() {
										var blog_id = $(this).attr("id");
										parse_text_blog("get_lite_blog", blog_id);
									});
								}
							});
						}
					});

					first_li_click("tag2_page", num);
					last_li_click("tag2_page", num);
				}
			});
		}
	});
}

function load_tech_blogs(tag) {
	$.ajax({
		type: "get",
		url: "http://localhost:8888",
		data: { "task_name" : "get_tech_blog_summary", "tag" : tag },
		dataType: "jsonp",
		jsonp: "callback",
		success: function(result) {
			$("#tag3_blog").append(parse_text_blog_summary(result, "tech"));
			$("#tag3_blog .big-link").click(function() {
				var blog_id = $(this).attr("id");
				parse_text_blog("get_tech_blog", blog_id);
			});

			$.ajax ({
				type: "get",
				url: "http://localhost:8888",
				data: { "task_name" : "get_tech_blog_num", "tag" : tag },
				dataType: "jsonp",
				jsonp: "callback",
				success: function(result) {
					var num = result["num"];
					$("#tag3_blog").append("<div id='tag3_page' class='page'>" + pagination(num) + "</div>");

					$("#tag3_page ul li").click(function() {
						if (!$(this).hasClass("active")) {
							$("#tag3_page ul li").removeClass("active");
							$(this).addClass("active");
							$(".tech").remove();
							var index = $(this).text();
							var start = (parseInt(index) - 1) * 5;
							var tag = $(this).text();
							$.ajax({
								type: "get",
								url: "http://localhost:8888",
								data: { "task_name" : "get_tech_blog_summary", "start" : start, "tag" : tag },
								dataType: "jsonp",
								jsonp: "callback",
								success: function(result) {
									$("#tag3_page").before(parse_text_blog_summary(result, "tech"));
									$("#tag3_blog .big-link").click(function() {
										var blog_id = $(this).attr("id");
										parse_text_blog("get_tech_blog", blog_id);
									});
								}
							});
						}
					});

					first_li_click("tag3_page", num);
					last_li_click("tag3_page", num);
				}
			});
		}
	});
}

function parse_song_blog(result) {
	var len = result.length;
	var div_text = "";
	for (var count = 0; count < len; count++) {
		var song = result[count];
		var title = song["title"];
		var src = song["src"];
		var date = song["date"].split("-");
		date = date[0] + "年" + date[1] + "月" + date[2] + "日";
		div_text += "<div class='song'><h3>" + title + "</h3><audio src='" + src + "' preload='auto' controls></audio><p class='date'>" + date + "</p></div>";
	}
	return div_text;
}

function load_song_blogs(tag) {
	$.ajax({
		type: "get",
		url: "http://localhost:8888",
		data: { "task_name" : "get_song_blog", "tag" : tag },
		dataType: "jsonp",
		jsonp: "callback",
		success: function(result) {
			$("#tag4_blog").append(parse_song_blog(result));
			$("audio").audioPlayer();

			$.ajax ({
				type: "get",
				url: "http://localhost:8888",
				data: { "task_name" : "get_song_blog_num", "tag" : tag },
				dataType: "jsonp",
				jsonp: "callback",
				success: function(result) {
					var num = result["num"];
					$("#tag4_blog").append("<div id='tag4_page' class='page'>" + pagination(num) + "</div>");

					$("#tag4_page ul li").click(function() {
						if (!$(this).hasClass("active")) {
							$("#tag4_page ul li").removeClass("active");
							$(this).addClass("active");
							$(".song").remove();
							var index = $(this).text();
							var start = (parseInt(index) - 1) * 5;
							var tag = $(this).text();
							$.ajax({
								type: "get",
								url: "http://localhost:8888",
								data: { "task_name" : "get_song_blog", "start" : start, "tag" : tag },
								dataType: "jsonp",
								jsonp: "callback",
								success: function(result) {
									$("#tag4_page").before(parse_song_blog(result));
									$("audio").audioPlayer();
								}
							});
						}
					});

					first_li_click("tag4_page", num);
					last_li_click("tag4_page", num);
				}
			});
		}
	});
}

/* 载入导航信息 */
function load_nav_info() {
	$.ajax({
		type: "get",
		url: "http://localhost:8888",
		data: { "task_name" : "get_nav_info" },
		dataType: "jsonp",
		jsonp: "callback",
		success: function(result) {
			var len = result.length;
			for (var count = 0; count < len; count++) {
				var nav = result[count];
				var id = parseInt(nav["id"]) - 1;
				var name = nav["name"];
				var tags = nav["tags"];
				$("#nav_text p:eq(" + id + ")").text(name);

				var tag_len = tags.length;
				for (var tag_count = 0; tag_count < tag_len; tag_count++) {
					$("#tag" + nav["id"] + "_nav").append("<li>" + tags[tag_count] + "</li>");
				}
			}

			$(".nav_ul li").hover(
				function() {
					$(this).css("color", "#fff");
				},
				function() {
					$(this).css("color", "#000");
				}
			);

			$(".nav_ul li").click(function() {
				var tag_id = $(this).parent().prev().attr("id");
				$("#blog_background").remove();
				$("#tag_blogs").append("<img id='blog_background' src='../static/img/" + tag_id + "_content.png' class='img-responsive'>");
				/**$("#blog_background").attr("src", "../static/img/" + tag_id + "_content.png");**/
				$(".tag_blogs").css("visibility", "hidden");
				$("#" + tag_id + "_blog").css("visibility", "visible");
			});

			$("#tag1_nav li").click(load_state());
			$("#tag2_nav li").click(function() {
				var tag = $(this).text();
				$(".story").remove();
				$("#tag2_page").remove();
				load_lite_blogs(tag);
			});
			$("#tag3_nav li").click(function() {
				var tag = $(this).text();
				$(".tech").remove();
				$("#tag3_page").remove();
				load_tech_blogs(tag);
			});
			$("#tag4_nav li").click(function() {
				var tag = $(this).text();
				$(".song").remove();
				$("#tag4_page").remove();
				load_song_blogs(tag);
			});
		}
	});
}