var db;
var dbCreated = false;

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

onDeviceReady();

function onDeviceReady() {
    db = window.openDatabase("EmployeeDirectoryDB", "1.0", "PhoneGap Demo", 200000);
    if (dbCreated)
    	db.transaction(getstoresdata, transaction_error);
    else
    	db.transaction(populateDB, transaction_error, populateDB_success);
}

function transaction_error(tx, error) {
	$('#busy').hide();
    alert("Database Error: " + error);
}

function populateDB_success() {
	dbCreated = true;
    db.transaction(getstoresdata, transaction_error);
}

function getstoresdata(tx) {
	var sql = "select s.id, s.storename, s.storelocation " + 
			   "from stores s order by s.id";
	tx.executeSql(sql, [], getstores_success);
	db = null;
}

function getstores_success(tx, results) {
	$('#busy').hide();
	$('#employeeList').append('<h2>Stores</h2>');
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
    	var stores = results.rows.item(i);
		$('#employeeList').append('<li><a href="employeedetails.html?id=' + stores.id + '">' +
				'<p class="line1">Name: ' + stores.storename + '</p>' +
				'<p class="line2">Location: ' + stores.storelocation + '</p>' +
				'<span class="bubble">' + stores.id + '</span></a></li>');
    }
	setTimeout(function(){
		scroll.refresh();
	},100);
//	db = null;
}

function populateDB(tx) {
	$('#busy').show();


// STORES TABLE
	tx.executeSql('DROP TABLE IF EXISTS stores');
	var sql = 
		"CREATE TABLE IF NOT EXISTS stores ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"storename VARCHAR(50), " +
		"storelocation VARCHAR(50))";
    tx.executeSql(sql);
    tx.executeSql("INSERT INTO stores (id,storename,storelocation) VALUES (1,'Andys Market','gps location...')");
    tx.executeSql("INSERT INTO stores (id,storename,storelocation) VALUES (2,'Whole Foods','gps location...')");
    tx.executeSql("INSERT INTO stores (id,storename,storelocation) VALUES (3,'Pacific Market','gps location...')");
    tx.executeSql("INSERT INTO stores (id,storename,storelocation) VALUES (4,'Fircrest Market','gps location...')");
    tx.executeSql("INSERT INTO stores (id,storename,storelocation) VALUES (5,'Farmers Market','gps location...')");
    tx.executeSql("INSERT INTO stores (id,storename,storelocation) VALUES (6,'Costco','gps location...')");
    tx.executeSql("INSERT INTO stores (id,storename,storelocation) VALUES (7,'Community Market','gps location...')");
    tx.executeSql("INSERT INTO stores (id,storename,storelocation) VALUES (8,'Rite Aid','gps location...')");
}
