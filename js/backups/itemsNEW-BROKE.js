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
	var sql3 = "select s.id, s.fooditem, s.foodgroup, s.foodsubgroup " + 
			   "from fooditems s order by s.id";
	tx.executeSql(sql3, [], getfooditems_success);

	db = null;
}

function getfooditems_success(tx, results) {
	$('#busy').hide();
	$('#employeeList').append('<h2>Food Items</h2>');
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
    	var fooditems = results.rows.item(i);
		$('#employeeList').append('<li><a href="fooditemdetails.html?id=' + fooditems.id + '">' +
				'<p class="line1">Food item: ' + fooditems.fooditem + '</p>' +
				'<p class="line2">Group: ' + fooditems.foodgroup + 'Sub-group: ' + fooditems.foodsubgroup + '</p>' +
				'<span class="bubble">' + fooditems.id + '</span></a></li>');
    }
	setTimeout(function(){
		scroll.refresh();
	},100);
	
	db = null;
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
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (1,'Bagels',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (2,'Biscuits',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (3,'Bread French/Sourdough',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (4,'Bread white',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (5,'Breading/stuffing',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (6,'Cereal ready-to-eat',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (7,'Corn grits',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (8,'Cornstarch',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (9,'Crackers',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (10,'English muffins',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (11,'Flour',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (12,'Hotdog  Frankfurter  rolls',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (13,'Hamburger buns',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (14,'Macaroni and cheese',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (15,'Pasta - macaroni',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (16,'Pasta - spaghetti',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (17,'Pasta - ziti',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (18,'Pie crust',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (19,'Pita bread',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (20,'Pretzels',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (21,'Quick bread mix/Pancakes',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (22,'Rice    white',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (23,'Sweets  Cookies',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (24,'Tortilla    corn flour',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (25,'Tortilla    wheat flour',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (26,'Tortilla chips',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (27,'Bread   rye',1,2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (28,'Bread   whole wheat',1,2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (29,'Oatmeal',1,2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (30,'Pasta   whole grain',1,2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (31,'Popcorn',1,2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (32,'Rice brown',1,2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup)) VALUES (33,'Whole grain rolls',1,2)");
}
