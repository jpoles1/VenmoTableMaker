var dat;
$(function(){
	$("#keysubmit").click(function(){
		var key = $("#apikey").val();
		$("#content").html("<a id='venmolink' href='https://api.venmo.com/v1/payments?limit=300&access_token="+key+"' target='blank'>Click here to get venmo data</a>");
		return false;
	});
	$("#content").on('click', "#venmolink", function(){
		$("#content").html("<form><b>Venmo Data:</b> <input id='venmodat' type='text' maxlength='1000000'><input type='submit' value='Submit' id='datsubmit'></form>");
	});
	$("#content").on('click', "#datsubmit", function(){
		console.log($("#venmodat").val().length);
		dat = $.parseJSON($("#venmodat").val());
		makeTable();
		return false;
	});
})
function makeTable(){
	$("#content").html("<h1>Recent Wiess Venmo Transactions</h1><table id='transactions' style='width: 100%'></table>")
	colnames = $('<thead style="border-bottom: 1px solid #000;"/>');
	colnames.append("<td><b>Name</b></td>");
	colnames.append("<td><b>$ Amount</b></td>");
	colnames.append("<td><b>Note</b></td>");
	colnames.append("<td><b>Date Paid</b></td>");
	$("#transactions").append(colnames);
	$.each(dat.data, function(i, trans){
		if(trans.status == "settled" && (trans.action == "pay" || trans.action == "charge")){
			tr = $('<tr/>');
			tr.append("<td>" + trans.actor.first_name + " " + trans.actor.last_name + "</td>");
			tr.append("<td>" + trans.amount + "</td>");
			tr.append("<td>" + trans.note + "</td>");
			tr.append("<td>" + trans.date_completed.split("T")[0] + "</td>");
			$("#transactions").append(tr);
		}
	});
}
//EMAIL: wiessparties@gmail.com
//PASS: wiessvenmo6340
//API access: https://api.venmo.com/v1/payments?access_token=mW386FYUQVYX46U6cn7fKukmSfTZYKYh&limit=1000