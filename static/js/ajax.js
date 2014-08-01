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
				$("#blog_background").attr("src", "../static/img/" + tag_id + "_content.png");
				$(".tag_blogs").css("visibility", "hidden");
				$("#" + tag_id + "_blog").css("visibility", "visible");
			});
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

					$("#tag1_page ul li:first").click(function() {
						var count = parseInt((num - 1) / 5) + 1;
						if (count > 5) {
							var first_index = parseInt($(this).text());
							if (first_index > 1) {
								for (var index = 0; index < 5; index++) {
									$("#tag1_page ul li:eq(" + index + ") span").text(first_index - 1 + index + "");
								}
								$(this).removeClass("active");
								$(this).next().addClass("active");
							}
						}
					});

					$("#tag1_page ul li:last").click(function() {
						var count = parseInt((num - 1) / 5) + 1;
						if (count > 5) {
							var last_index = parseInt($(this).text());
							if (last_index < count) {
								for (var index = 0; index < 5; index++) {
									$("#tag1_page ul li:eq(" + index + ") span").text(last_index + 1 - 4 + index + "");
								}
								$(this).removeClass("active");
								$(this).prev().addClass("active");
							}
						}
					});
				}
			});
		}
	});
}