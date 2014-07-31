function replace_tag(tag, tag_name) {
	$(tag).attr("src", "../static/img/" + tag_name);
}

$(document).ready(function() {
	$("audio").audioPlayer();

	$(".tags").hover(
		function() {
			replace_tag(this, $(this).attr("id") + "_checked.png");
			var tag_nav = "#" + $(this).attr("id") + "_nav";
			$(".nav").css("z-index", "50");
			$(tag_nav).css("visibility", "visible");
		},
		function() {
			replace_tag(this, $(this).attr("id") + ".png");
		}
	);

	$(".nav").mouseleave(function() {
		$(this).find("ul").css("visibility", "hidden");
		$(".nav").css("z-index", "-2");
	});

	$(".nav_ul").hover(
		function() {
			$(".nav").css("z-index", "50");
		},
		function() {
			$(".nav").css("z-index", "-2");
		}
	);

	$(".nav_ul li").click(function() {
		var tag_id = $(this).parent().prev().attr("id");
		$("#blog_background").attr("src", "../static/img/" + tag_id + "_content.png");
		$(".tag_blogs").css("visibility", "hidden");
		$("#" + tag_id + "_blog").css("visibility", "visible");
	});

	$(".nav_ul li").hover(
		function() {
			$(this).css("color", "#fff");
		},
		function() {
			$(this).css("color", "#000");
		}
	);

});	