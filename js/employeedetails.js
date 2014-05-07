var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var id = getUrlVars()["id"];

var db;

//document.addEventListener("deviceready", onDeviceReady, false);
onDeviceReady(); // <== Fixed line!

function onDeviceReady() {
	console.log("opening Employee database");
    db = window.openDatabase("EmployeeDirectoryDB", "1.0", "PhoneGap Demo", 200000);
	console.log("Employee database opened");
    db.transaction(getEmployee, transaction_error);
// TESTING
	console.log("opening Item database");
    db2 = window.openDatabase("ItemDirectoryDB", "1.0", "PhoneGap Item", 200000);
	console.log("Item database opened");
    db2.transaction(getItem, transaction_error);
}

function transaction_error(tx, error) {
	$('#busy').hide();
    alert("Database Error: " + error);
}

function getEmployee(tx) {
	$('#busy').show();
	var sql = "select e.id, e.firstName, e.lastName, e.managerId, e.title, e.department, e.city, e.officePhone, e.cellPhone, " +
				"e.email, e.picture, m.firstName managerFirstName, m.lastName managerLastName, count(r.id) reportCount " +
				"from employee e left join employee r on r.managerId = e.id left join employee m on e.managerId = m.id " +
				"where e.id=:id group by e.lastName order by e.lastName, e.firstName";
	tx.executeSql(sql, [id], getEmployee_success);
}
// TESTING
function getItem(tx) {
	$('#busy').show();
	var sql = "select i.id, i.firstName, i.lastName, i.managerId, i.title, i.department, i.city, i.officePhone, i.cellPhone, " +
				"i.email, i.picture, m.firstName managerFirstName, m.lastName managerLastName, count(r.id) reportCount " +
				"from item i left join item r on r.managerId = i.id left join item m on i.managerId = m.id " +
				"where i.id=:id group by i.lastName order by i.lastName, i.firstName";
	tx.executeSql(sql, [id], getItem_success);
}

function getEmployee_success(tx, results) {
	$('#busy').hide();
	var employee = results.rows.item(0);
	$('#employeePic').attr('src', 'pics/' + employee.picture);
	$('#fullName').text(employee.firstName + ' ' + employee.lastName);
	$('#employeeTitle').text(employee.title);
	$('#city').text(employee.city);
	console.log(employee.officePhone);
	if (employee.managerId>0) {
		$('#actionList').append('<li><a href="employeedetails.html?id=' + employee.managerId + '"><p class="line1">View Manager</p>' +
				'<p class="line2">' + employee.managerFirstName + ' ' + employee.managerLastName + '</p></a></li>');
	}
	if (employee.reportCount>0) {
		$('#actionList').append('<li><a href="reportlist.html?id=' + employee.id + '"><p class="line1">View Direct Reports</p>' +
				'<p class="line2">' + employee.reportCount + '</p></a></li>');
	}
	if (employee.email) {
		$('#actionList').append('<li><a href="mailto:' + employee.email + '"><p class="line1">Email</p>' +
				'<p class="line2">' + employee.email + '</p><img src="img/mail.png" class="action-icon"/></a></li>');
	}
	if (employee.officePhone) {
		$('#actionList').append('<li><a href="tel:' + employee.officePhone + '"><p class="line1">Call Office</p>' +
				'<p class="line2">' + employee.officePhone + '</p><img src="img/phone.png" class="action-icon"/></a></li>');
	}
	if (employee.cellPhone) {
		$('#actionList').append('<li><a href="tel:' + employee.cellPhone + '"><p class="line1">Call Cell</p>' +
				'<p class="line2">' + employee.cellPhone + '</p><img src="img/phone.png" class="action-icon"/></a></li>');
		$('#actionList').append('<li><a href="sms:' + employee.cellPhone + '"><p class="line1">SMS</p>' +
				'<p class="line2">' + employee.cellPhone + '</p><img src="img/sms.png" class="action-icon"/></a></li>');
	}
	setTimeout(function(){
		scroll.refresh();
	});
	db = null;
}
// TESTING
function getItem_success(tx, results) {
	$('#busy').hide();
	var this_item = results.rows.item(0);
	$('#employeePic').attr('src', 'pics/' + this_item.picture);
	$('#fullName').text(this_item.firstName + ' ' + this_item.lastName);
	$('#employeeTitle').text(this_item.title);
	$('#city').text(this_item.city);
	console.log(this_item.officePhone);
	if (this_item.managerId>0) {
		$('#actionList').append('<li><a href="itemdetails.html?id=' + this_item.managerId + '"><p class="line1">View Manager</p>' +
				'<p class="line2">' + this_item.managerFirstName + ' ' + this_item.managerLastName + '</p></a></li>');
	}
	if (this_item.reportCount>0) {
		$('#actionList').append('<li><a href="reportlist.html?id=' + this_item.id + '"><p class="line1">View Direct Reports</p>' +
				'<p class="line2">' + this_item.reportCount + '</p></a></li>');
	}
	if (this_item.email) {
		$('#actionList').append('<li><a href="mailto:' + this_item.email + '"><p class="line1">Email</p>' +
				'<p class="line2">' + this_item.email + '</p><img src="img/mail.png" class="action-icon"/></a></li>');
	}
	if (this_item.officePhone) {
		$('#actionList').append('<li><a href="tel:' + this_item.officePhone + '"><p class="line1">Call Office</p>' +
				'<p class="line2">' + this_item.officePhone + '</p><img src="img/phone.png" class="action-icon"/></a></li>');
	}
	if (this_item.cellPhone) {
		$('#actionList').append('<li><a href="tel:' + this_item.cellPhone + '"><p class="line1">Call Cell</p>' +
				'<p class="line2">' + this_item.cellPhone + '</p><img src="img/phone.png" class="action-icon"/></a></li>');
		$('#actionList').append('<li><a href="sms:' + this_item.cellPhone + '"><p class="line1">SMS</p>' +
				'<p class="line2">' + this_item.cellPhone + '</p><img src="img/sms.png" class="action-icon"/></a></li>');
	}
	setTimeout(function(){
		scroll.refresh();
	});
	db2 = null;
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
