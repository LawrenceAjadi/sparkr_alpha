$(document).ready(function() {
	$.ajax({
		url: "/11",
		type: 'get',
		dataType: 'json',
		success: function(data) {
			Data = data;
			console.log(Data.text);
			console.log(Data.A);
			console.log(Data.B);
			console.log(Data.AMax);
			console.log(Data.BMax);
			console.log(Data.AMin);
			console.log(Data.BMin);
			console.log(Data.AVotes);
			console.log(Data.BVotes);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log('error', errorThrown);
		}
	})
});