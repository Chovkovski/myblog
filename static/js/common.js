function replace_tag(tag, tag_name) {
	$(tag).attr("src", "../static/img/" + tag_name);
}

$(document).ready(function() {
	$(".tags").hover(
		function() {
			replace_tag(this, $(this).attr("id") + "_checked.png");
			var tag_id = "#" + $(this).attr("id") + "_nav";
			$(tag_id).css("visibility", "visible");
		},
		function() {
			replace_tag(this, $(this).attr("id") + ".png");
		}
	);

	$(".nav").mouseleave(function() {
		$(this).find("ul").css("visibility", "hidden");
	});

	$("li").click(function() {
		var tag_id = $(this).parent().prev().attr("id");
		$("#blog_background").attr("src", "../static/img/" + tag_id + "_content.png");
	});
});