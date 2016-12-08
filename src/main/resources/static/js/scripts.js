$(".answer-write input[type='submit']").click(addAnswer);

function addAnswer(e) {
	console.log('click answer btn');
	e.preventDefault();

	var url = $(".answer-write").attr("action");
	console.log("url : " + url);

	var queryString = $(".answer-write").serialize();
	console.log("queryString : " + queryString)

	$.ajax({
		url : url,
		type : 'post',
		data : queryString,
		dataType : 'json',
		error : function() {
			console.log("fail!");
		},
		success : function(data) {
			console.log(data);
			console.log(data.writer.userId);

			var answerTemplate = $("#answerTemplate").html();
			var template = answerTemplate.format(data.writer.userId,
					data.formattedCreateDate, data.contents, data.question.id,
					data.id);
			$(".qna-comment-slipp-articles").prepend(template);
			$("textarea[name=contents]").val("");
		}

	})
}

$(".form-answer-delete button[type='submit']").click(deleteAnswer);
function deleteAnswer(e) {
	console.log('click deleteAnswer btn');
	e.preventDefault();

	var url = $(".form-answer-delete").attr("action");
	console.log("url : " + url);

	var queryString = $(".form-answer-delete").serialize();
	console.log("queryString : " + queryString)

	var deleteBtn = $(this);
	$.ajax({
		url : url,
		type : 'delete',
		dataType : 'json',
		error : function() {
			console.log("fail!");
		},
		success : function(data) {
			console.log(data);
			
			if(data.valid) {
				deleteBtn.closest("article").remove();
			} else {
				alert("failfail");
			}
		}

	})
}

String.prototype.format = function() {
	var args = arguments;
	return this.replace(/{(\d+)}/g, function(match, number) {
		return typeof args[number] != 'undefined' ? args[number] : match;
	});
};