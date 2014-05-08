var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var id = getUrlVars()["id"];

var db;

onDeviceReady();

function onDeviceReady() {
	console.log("opening database");
    db = window.openDatabase("EmployeeDirectoryDB", "1.0", "PhoneGap Demo", 200000);
	console.log("database opened");
    db.transaction(getData, transaction_error);
//    db.transaction(getProduct, transaction_error);
}

function transaction_error(tx, error) {
	$('#busy').hide();
    alert("Database Error: " + error);
}

function getData(tx) {
	$('#busy').show();
	var sql = "select e.id, e.firstName, e.lastName, e.managerId, e.title, e.department, e.city, e.officePhone, e.cellPhone, " +
				"e.email, e.picture, m.firstName managerFirstName, m.lastName managerLastName, count(r.id) reportCount " +
				"from employee e left join employee r on r.managerId = e.id left join employee m on e.managerId = m.id " +
				"where e.id=:id group by e.lastName order by e.lastName, e.firstName";
//	var sql2 = "select p.id, p.firstName, p.lastName, p.managerId, p.title, p.department, p.city, p.officePhone, p.cellPhone, " +
//				"p.email, p.picture, m.firstName managerFirstName, m.lastName managerLastName, count(r.id) reportCount " +
//				"from product p left join item r on r.managerId = p.id left join product m on p.managerId = m.id " +
//				"where p.id=:id group by p.lastName order by p.lastName, p.firstName";
	tx.executeSql(sql, [id], getEmployee_success);
//	tx.executeSql(sql2, [id], getProduct_success);
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

function getProduct_success(tx, results) {
	$('#busy').hide();
	var product = results.rows.item(0);
	$('#employeePic').attr('src', 'pics/' + product.picture);
	$('#fullName').text(product.firstName + ' ' + product.lastName);
	$('#employeeTitle').text(product.title);
	$('#city').text(product.city);
	console.log(product.officePhone);
	if (product.managerId>0) {
		$('#actionList').append('<li><a href="productdetails.html?id=' + product.managerId + '"><p class="line1">View Manager</p>' +
				'<p class="line2">' + product.managerFirstName + ' ' + product.managerLastName + '</p></a></li>');
	}
	if (product.reportCount>0) {
		$('#actionList').append('<li><a href="reportlist.html?id=' + product.id + '"><p class="line1">View Direct Reports</p>' +
				'<p class="line2">' + product.reportCount + '</p></a></li>');
	}
	if (product.email) {
		$('#actionList').append('<li><a href="mailto:' + product.email + '"><p class="line1">Email</p>' +
				'<p class="line2">' + product.email + '</p><img src="img/mail.png" class="action-icon"/></a></li>');
	}
	if (product.officePhone) {
		$('#actionList').append('<li><a href="tel:' + product.officePhone + '"><p class="line1">Call Office</p>' +
				'<p class="line2">' + product.officePhone + '</p><img src="img/phone.png" class="action-icon"/></a></li>');
	}
	if (product.cellPhone) {
		$('#actionList').append('<li><a href="tel:' + product.cellPhone + '"><p class="line1">Call Cell</p>' +
				'<p class="line2">' + product.cellPhone + '</p><img src="img/phone.png" class="action-icon"/></a></li>');
		$('#actionList').append('<li><a href="sms:' + product.cellPhone + '"><p class="line1">SMS</p>' +
				'<p class="line2">' + product.cellPhone + '</p><img src="img/sms.png" class="action-icon"/></a></li>');
	}
	setTimeout(function(){
		scroll.refresh();
	});
	db = null;
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
