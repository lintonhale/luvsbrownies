var db;
var dbCreated = false;

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

onDeviceReady();

function onDeviceReady() {
    db = window.openDatabase("EmployeeDirectoryDB", "1.0", "PhoneGap Demo", 200000);
    if (dbCreated)
    	db.transaction(getfooditemsdata, transaction_error);
    else
    	db.transaction(populateDB, transaction_error, populateDB_success);
}

function transaction_error(tx, error) {
	$('#busy').hide();
    alert("Database Error: " + error);
}

function populateDB_success() {
	dbCreated = true;
    db.transaction(getfooditemsdata, transaction_error);
}

function getfooditemsdata(tx) {
	var sql = "select i.id, i.fooditem, i.foodgroup, i.foodsubgroup " + 
			   "from fooditems i order by i.id";
	tx.executeSql(sql, [], getfooditems_success);
	db = null;
}

function getfooditems_success(tx, results) {
	$('#busy').hide();
	$('#employeeList').append('<h2>Food Items</h2>');
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
    	var fooditems = results.rows.item(i);
		$('#employeeList').append('<li><a href="employeedetails.html?id=' + fooditems.id + '">' +
				'<p class="line1">' + fooditems.fooditem + '</p>' +
				'<p class="line2">' + fooditems.foodgroup + ' ' + fooditems.foodsubgroup + '</p>' +
				'<span class="bubble">' + fooditems.id + '</span></a></li>');
    }
	setTimeout(function(){
		scroll.refresh();
	},100);
//	db = null;
}

function populateDB(tx) {
	$('#busy').show();

// FOOD ITEMS TABLE
	tx.executeSql('DROP TABLE IF EXISTS fooditems');
	var sql3 = 
		"CREATE TABLE IF NOT EXISTS fooditems ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"fooditem VARCHAR(50), " +
		"foodgroup VARCHAR(50), " +
		"foodsubgroup VARCHAR(50))";
    tx.executeSql(sql3);
	// GRAIN
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (1,'Bagels','1','1')");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (2,'Biscuits','1','1')");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (3,'Bread French Sourdough','1','1')");
}
