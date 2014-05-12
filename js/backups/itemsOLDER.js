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
//	var sql = "select e.id, e.firstName, e.lastName, e.title, e.picture, count(r.id) reportCount " + 
//				"from employee e left join employee r on r.managerId = e.id " +
//				"group by e.id order by e.lastName, e.firstName";
//	tx.executeSql(sql, [], getEmployees_success);
	var sql = "select g.id, g.foodgroup " + 
			   "from foodgroups g order by g.id";
	tx.executeSql(sql, [], getFoodGroups_success);
	
	var sql2 = "select sg.id, sg.foodgroup, sg.foodsubgroup " + 
			"from foodsubgroups sg left join foodgroups g on g.id = sg.group group by sg.foodgroup order by sg.id";
	tx.executeSql(sql2, [], getFoodSubgroups_success);
	
	db = null;
}

//function getEmployees_success(tx, results) {
//	$('#busy').hide();
//	$('#employeeList').append('<h2>Folks...</h2>');
//    var len = results.rows.length;
//    for (var i=0; i<len; i++) {
//    	var employee = results.rows.item(i);
//		$('#employeeList').append('<li><a href="employeedetails.html?id=' + employee.id + '">' +
//				'<img src="pics/' + employee.picture + '" class="list-icon"/>' +
//				'<p class="line1">' + employee.firstName + ' ' + employee.lastName + '</p>' +
//				'<p class="line2">' + employee.title + '</p>' +
//				'<span class="bubble">' + employee.reportCount + '</span></a></li>');
//    }
//	setTimeout(function(){
//		scroll.refresh();
//	},100);
//	db = null;
//}

function getFoodGroups_success(tx, results) {
	$('#busy').hide();
	$('#employeeList').append('<h2>Food Groups</h2>');
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
    	var foodgroups = results.rows.item(i);
		$('#employeeList').append('<li><a href="productdetails.html?id=' + foodgroups.id + '">' +
				'<p class="line1">' + foodgroups.foodgroup + '</p>' +
//				'<p class="line2">' + foodgroups.foodGroup + '</p>' +
				'<span class="bubble">' + foodgroups.id + '</span></a></li>');
    }
	setTimeout(function(){
		scroll.refresh();
	},100);
//	db = null;
}

function getFoodSubgroups_success(tx, results) {
	$('#busy').hide();
	$('#employeeList').append('<h2>Food Subgroups</h2>');
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
    	var foodsubgroups = results.rows.item(i);
		$('#employeeList').append('<li><a href="productdetails.html?id=' + foodsubgroups.id + '">' +
				'<p class="line1">Group: ' + foodsubgroups.foodgroup + '</p>' +
				'<p class="line2">Subgroup: ' + foodsubgroups.foodsubgroup + '</p>' +
				'<span class="bubble">' + foodsubgroups.id + '</span></a></li>');
    }
	setTimeout(function(){
		scroll.refresh();
	},100);
//	db = null;
}

function getFoodStandards_success(tx, results) {
	$('#busy').hide();
	$('#employeeList').append('<h2>Food Standards</h2>');
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
    	var foodstandards = results.rows.item(i);
		$('#employeeList').append('<li><a href="productdetails.html?id=' + foodstandards.id + '">' +
				'<p class="line1">' + foodstandards.foodstandard + '</p>' +
				'<span class="bubble">' + foodstandards.id + '</span></a></li>');
    }
	setTimeout(function(){
		scroll.refresh();
	},100);
//	db = null;
}

function getFoodTypes_success(tx, results) {
	$('#busy').hide();
	$('#employeeList').append('<h2>Food Types</h2>');
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
    	var foodtypes = results.rows.item(i);
		$('#employeeList').append('<li><a href="productdetails.html?id=' + foodtypes.id + '">' +
				'<p class="line1">' + foodtypes.foodtype + '</p>' +
				'<span class="bubble">' + foodtypes.id + '</span></a></li>');
    }
	setTimeout(function(){
		scroll.refresh();
	},100);
//	db = null;
}

function getFoodItems_success(tx, results) {
	$('#busy').hide();
	$('#employeeList').append('<h2>Food Types</h2>');
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
    	var fooditems = results.rows.item(i);
		$('#employeeList').append('<li><a href="productdetails.html?id=' + fooditems.id + '">' +
				'<p class="line1">' + fooditems.fooditem + '</p>' +
				'<p class="line2">' + fooditems.foodgroup + fooditems.foodsubgroup +'</p>' +
				'<span class="bubble">' + fooditems.id + '</span></a></li>');
    }
	setTimeout(function(){
		scroll.refresh();
	},100);
//	db = null;
}

function populateDB(tx) {
	$('#busy').show();

// FOOD GROUPS TABLE
	tx.executeSql('DROP TABLE IF EXISTS foodgroups');
	var sql2 = 
		"CREATE TABLE IF NOT EXISTS foodgroups ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"foodgroup VARCHAR(50))";
    tx.executeSql(sql2);
    tx.executeSql("INSERT INTO foodgroups (id,foodgroup) VALUES (1,'GRAIN')");
    tx.executeSql("INSERT INTO foodgroups (id,foodgroup) VALUES (2,'FRUIT')");
    tx.executeSql("INSERT INTO foodgroups (id,foodgroup) VALUES (3,'VEGETABLE')");
    tx.executeSql("INSERT INTO foodgroups (id,foodgroup) VALUES (4,'PROTEIN')");
    tx.executeSql("INSERT INTO foodgroups (id,foodgroup) VALUES (5,'DAIRY')");
    tx.executeSql("INSERT INTO foodgroups (id,foodgroup) VALUES (6,'OTHER')");

// FOOD SUB-GROUPS TABLE
	tx.executeSql('DROP TABLE IF EXISTS foodsubgroups');
	var sql2 = 
		"CREATE TABLE IF NOT EXISTS foodsubgroups ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"foodgroup VARCHAR(50), " +
		"foodsubgroup VARCHAR(50))";
    tx.executeSql(sql2);
    tx.executeSql("INSERT INTO foodsubgroups (id,foodgroup,foodsubgroup) VALUES (1,1,'Non-whole Grain')");
    tx.executeSql("INSERT INTO foodsubgroups (id,foodgroup,foodsubgroup) VALUES (2,1,'Whole Grain')");
    tx.executeSql("INSERT INTO foodsubgroups (id,foodgroup,foodsubgroup) VALUES (3,3,'Dry Beans and Peas')");
    tx.executeSql("INSERT INTO foodsubgroups (id,foodgroup,foodsubgroup) VALUES (4,3,'Starchy Vegetables')");
    tx.executeSql("INSERT INTO foodsubgroups (id,foodgroup,foodsubgroup) VALUES (5,3,'Dark Green Vegetables')");
    tx.executeSql("INSERT INTO foodsubgroups (id,foodgroup,foodsubgroup) VALUES (6,3,'Red and Orange Vegetables')");
    tx.executeSql("INSERT INTO foodsubgroups (id,foodgroup,foodsubgroup) VALUES (7,3,'Other Vegetables')");
    tx.executeSql("INSERT INTO foodsubgroups (id,foodgroup,foodsubgroup) VALUES (8,4,'Meats')");
    tx.executeSql("INSERT INTO foodsubgroups (id,foodgroup,foodsubgroup) VALUES (9,4,'Poultry')");
    tx.executeSql("INSERT INTO foodsubgroups (id,foodgroup,foodsubgroup) VALUES (10,4,'Fish - High Omega 3')");
    tx.executeSql("INSERT INTO foodsubgroups (id,foodgroup,foodsubgroup) VALUES (11,4,'Fish - Low Omega 3')");
    tx.executeSql("INSERT INTO foodsubgroups (id,foodgroup,foodsubgroup) VALUES (12,4,'Soy')");
    tx.executeSql("INSERT INTO foodsubgroups (id,foodgroup,foodsubgroup) VALUES (13,4,'Eggs')");
    tx.executeSql("INSERT INTO foodsubgroups (id,foodgroup,foodsubgroup) VALUES (14,4,'Nuts and Seeds')");

}
