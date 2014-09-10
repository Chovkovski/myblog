function replace_tag(tag, tag_name) {
	$(tag).attr("src", "http://pavelblog.oss-cn-hangzhou.aliyuncs.com/imgs/" + tag_name);
}

function construct_li_text(count) {
	var li_text = ""
	for (var index = 1; index <= count; index++) {
		if (index == 1) {
			li_text += "<li class='active'><span>" + index + "</span></li>";
		} else {
			li_text += "<li><span>" + index + "</span></li>";
		}
	}
	return li_text;
}

function pagination(sum) {
	if (sum == 0) { return ""; } 
	var page_text = "";
	var count = parseInt((sum - 1) / 5) + 1;
	page_text = "<ul class='pagination pagination-sm'>" + ((sum > 25) ? construct_li_text(5) : construct_li_text(count)) + "</ul>";
	return page_text;
}