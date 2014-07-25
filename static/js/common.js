function replace_tag(tag, tag_name) {
	$(tag).attr("src", "../static/img/" + tag_name);
}

$(document).ready(function() {
	$(".tags").hover(
			function() {
				replace_tag(this, $(this).attr("id") + "_checked.png");
			},
			function() {
				replace_tag(this, $(this).attr("id") + ".png");
			}
		);

	$(".tags").click(function() {
		$("#blog_background").attr("src", "../static/img/" + $(this).attr("id") + "_content.png");
	});
});