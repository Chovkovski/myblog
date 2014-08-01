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

	load_person_info();
	load_nav_info();

	$("#tag1_nav li").click(load_state());

});	