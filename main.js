$(function(){
	$.getJSON("https://api.venmo.com/v1/payments?access_token=nehfh3GnGME6HBndQXNkgcaYaP5aa6Xm", function(dat){
		$("#transactions").html(dat);
	});
})
//EMAIL: 
//PASS: 