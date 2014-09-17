$(document).ready(function() {
	$.ajax({
		url: "/11",
		type: 'get',
		dataType: 'text',
		success: function(data) {
			console.log('success', data);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log('error', errorThrown);
		}
	})
});