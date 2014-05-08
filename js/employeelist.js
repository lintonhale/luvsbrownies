var db;
var dbCreated = false;

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

onDeviceReady();

function onDeviceReady() {
    db = window.openDatabase("EmployeeDirectoryDB", "1.0", "PhoneGap Demo", 200000);
    if (dbCreated)
    	db.transaction(getData, transaction_error);
    else
    	db.transaction(populateDB, transaction_error, populateDB_success);
}

function transaction_error(tx, error) {
	$('#busy').hide();
    alert("Database Error: " + error);
}

function populateDB_success() {
	dbCreated = true;
    db.transaction(getData, transaction_error);
}

function getData(tx) {
	var sql = "select e.id, e.firstName, e.lastName, e.title, e.picture, count(r.id) reportCount " + 
				"from employee e left join employee r on r.managerId = e.id " +
				"group by e.id order by e.lastName, e.firstName";
	var sql2 = "select g.id, g.foodGroup " + 
				"from foodgroups g order by g.id";
	var sql3 = "select q.id, q.quality " + 
				"from foodqualities q order by q.id";
	tx.executeSql(sql, [], getEmployees_success);
	tx.executeSql(sql2, [], getFoodGroups_success);
	tx.executeSql(sql3, [], getFoodQualities_success);
}
	
function getEmployees_success(tx, results) {
	$('#busy').hide();
	$('#employeeList').append('<h2>Folks...</h2>');
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
    	var employee = results.rows.item(i);
		$('#employeeList').append('<li><a href="employeedetails.html?id=' + employee.id + '">' +
				'<img src="pics/' + employee.picture + '" class="list-icon"/>' +
				'<p class="line1">' + employee.firstName + ' ' + employee.lastName + '</p>' +
				'<p class="line2">' + employee.title + '</p>' +
				'<span class="bubble">' + employee.reportCount + '</span></a></li>');
    }
	setTimeout(function(){
		scroll.refresh();
	},100);
	db = null;
}

function getFoodGroups_success(tx, results) {
	$('#busy').hide();
	$('#employeeList').append('<h2>Food Groups</h2>');
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
    	var foodgroups = results.rows.item(i);
		$('#employeeList').append('<li><a href="productdetails.html?id=' + foodgroups.id + '">' +
				'<p class="line1">' + foodgroups.foodGroup + '</p>' +
//				'<p class="line2">' + foodgroups.foodGroup + '</p>' +
				'<span class="bubble">' + foodgroups.id + '</span></a></li>');
    }
	setTimeout(function(){
		scroll.refresh();
	},100);
	db = null;
}

function getFoodQualities_success(tx, results) {
	$('#busy').hide();
	$('#employeeList').append('<h2>Food Qualities</h2>');
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
    	var foodqualities = results.rows.item(i);
		$('#employeeList').append('<li><a href="productdetails.html?id=' + foodqualities.id + '">' +
				'<p class="line1">' + foodqualities.quality + '</p>' +
				'<span class="bubble">' + foodqualities.id + '</span></a></li>');
    }
	setTimeout(function(){
		scroll.refresh();
	},100);
	db = null;
}


function populateDB(tx) {
	$('#busy').show();

// EMPLOYEE DB TABLE
	tx.executeSql('DROP TABLE IF EXISTS employee');
	var sql = 
		"CREATE TABLE IF NOT EXISTS employee ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"firstName VARCHAR(50), " +
		"lastName VARCHAR(50), " +
		"title VARCHAR(50), " +
		"department VARCHAR(50), " + 
		"managerId INTEGER, " +
		"city VARCHAR(50), " +
		"officePhone VARCHAR(30), " + 
		"cellPhone VARCHAR(30), " +
		"email VARCHAR(30), " +
		"picture VARCHAR(200))";
    tx.executeSql(sql);
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (6,'Employees','Ayup',4,'Software Architect','Engineering','617-000-0012','781-000-0012','swells@fakemail.com','Boston, MA','paula_gates.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (5,'Amy','Jones',5,'Sales Representative','Sales','617-000-0011','781-000-0011','ajones@fakemail.com','Boston, MA','amy_jones.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (4,'Kathleen','Byrne',5,'Sales Representative','Sales','617-000-0010','781-000-0010','kbyrne@fakemail.com','Boston, MA','kathleen_byrne.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (3,'Gary','Donovan',2,'Marketing','Marketing','617-000-0009','781-000-0009','gdonovan@fakemail.com','Boston, MA','gary_donovan.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (2,'Lisa','Wong',2,'Marketing Manager','Marketing','617-000-0008','781-000-0008','lwong@fakemail.com','Boston, MA','lisa_wong.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (1,'Paula','Gates',4,'Software Architect','Engineering','617-000-0007','781-000-0007','pgates@fakemail.com','Boston, MA','paula_gates.jpg')");

// FOOD GROUPS TABLE
	tx.executeSql('DROP TABLE IF EXISTS foodgroups');
	var sql2 = 
		"CREATE TABLE IF NOT EXISTS foodgroups ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"foodGroup VARCHAR(50))";
    tx.executeSql(sql2);
    tx.executeSql("INSERT INTO foodgroups (id,foodGroup) VALUES (1,'GRAIN')");
    tx.executeSql("INSERT INTO foodgroups (id,foodGroup) VALUES (2,'Non-whole Grain')");
    tx.executeSql("INSERT INTO foodgroups (id,foodGroup) VALUES (3,'Whole Grain')");
    tx.executeSql("INSERT INTO foodgroups (id,foodGroup) VALUES (4,'FRUIT')");
    tx.executeSql("INSERT INTO foodgroups (id,foodGroup) VALUES (5,'VEGETABLE')");
    tx.executeSql("INSERT INTO foodgroups (id,foodGroup) VALUES (6,'Dry Beans and Peas')");
    tx.executeSql("INSERT INTO foodgroups (id,foodGroup) VALUES (7,'Starchy Vegetables')");
    tx.executeSql("INSERT INTO foodgroups (id,foodGroup) VALUES (8,'Dark Green Vegetables')");
    tx.executeSql("INSERT INTO foodgroups (id,foodGroup) VALUES (9,'Red and Orange Vegetables')");
    tx.executeSql("INSERT INTO foodgroups (id,foodGroup) VALUES (10,'Other Vegetables')");
    tx.executeSql("INSERT INTO foodgroups (id,foodGroup) VALUES (11,'PROTEIN')");
    tx.executeSql("INSERT INTO foodgroups (id,foodGroup) VALUES (12,'Meats')");
    tx.executeSql("INSERT INTO foodgroups (id,foodGroup) VALUES (13,'Poultry')");
    tx.executeSql("INSERT INTO foodgroups (id,foodGroup) VALUES (14,'High Omega-3 Fish')");
    tx.executeSql("INSERT INTO foodgroups (id,foodGroup) VALUES (15,'Low Omega-3 Fish')");
    tx.executeSql("INSERT INTO foodgroups (id,foodGroup) VALUES (16,'Soy')");
    tx.executeSql("INSERT INTO foodgroups (id,foodGroup) VALUES (17,'Eggs')");
    tx.executeSql("INSERT INTO foodgroups (id,foodGroup) VALUES (18,'Nuts and Seeds')");
    tx.executeSql("INSERT INTO foodgroups (id,foodGroup) VALUES (19,'DAIRY')");
    tx.executeSql("INSERT INTO foodgroups (id,foodGroup) VALUES (20,'OTHER')");

// FOOD QUALITIES TABLE
	tx.executeSql('DROP TABLE IF EXISTS foodqualities');
	var sql3 = 
		"CREATE TABLE IF NOT EXISTS foodqualities ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"quality VARCHAR(50))";
    tx.executeSql(sql3);
    tx.executeSql("INSERT INTO foodqualities (id,quality) VALUES (1,'Conventional')");
    tx.executeSql("INSERT INTO foodqualities (id,quality) VALUES (2,'Gluten-free')");
    tx.executeSql("INSERT INTO foodqualities (id,quality) VALUES (3,'Natural')");
    tx.executeSql("INSERT INTO foodqualities (id,quality) VALUES (4,'GMO-free')");
    tx.executeSql("INSERT INTO foodqualities (id,quality) VALUES (5,'Organic')");
    tx.executeSql("INSERT INTO foodqualities (id,quality) VALUES (6,'Vegan')");

}
