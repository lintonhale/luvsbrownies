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

	var sql = "SELECT i.id, i.fooditem, g.foodgroup, sg.foodsubgroup FROM fooditems i " + 
				"LEFT JOIN foodgroups g ON g.id = i.foodgroup " +
				"LEFT JOIN foodsubgroups sg ON sg.id = i.foodsubgroup " +
//				"group by e.id order by i.fooditem";
			   "ORDER BY i.foodgroup, i.fooditem";
	tx.executeSql(sql, [], getfooditems_success);
	db = null;
}

function getfooditems_success(tx, results) {
	$('#busy').hide();
	$('#employeeList').append('<h2>Items</h2>');
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
    	var fooditems = results.rows.item(i);
		$('#itemslist').append('<li><a href="idetails.html?id=' + fooditems.id + '">' +
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

// FOOD STANDARDS TABLE
	tx.executeSql('DROP TABLE IF EXISTS foodstandards');
	var sql3 = 
		"CREATE TABLE IF NOT EXISTS foodstandards ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"foodstandard VARCHAR(50))";
    tx.executeSql(sql3);
    tx.executeSql("INSERT INTO foodstandards (id,foodstandard) VALUES (1,'Conventional')");
    tx.executeSql("INSERT INTO foodstandards (id,foodstandard) VALUES (2,'Gluten-free')");
    tx.executeSql("INSERT INTO foodstandards (id,foodstandard) VALUES (3,'Natural')");
    tx.executeSql("INSERT INTO foodstandards (id,foodstandard) VALUES (4,'No antibiotics')");
    tx.executeSql("INSERT INTO foodstandards (id,foodstandard) VALUES (5,'No nitrites')");
    tx.executeSql("INSERT INTO foodstandards (id,foodstandard) VALUES (6,'GMO-free')");
    tx.executeSql("INSERT INTO foodstandards (id,foodstandard) VALUES (7,'Organic')");
    tx.executeSql("INSERT INTO foodstandards (id,foodstandard) VALUES (8,'Vegan')");

// FOOD TYPES TABLE
	tx.executeSql('DROP TABLE IF EXISTS foodtypes');
	var sql3 = 
		"CREATE TABLE IF NOT EXISTS foodtypes ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"foodtype VARCHAR(50))";
    tx.executeSql(sql3);
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (1,'all-purpose')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (2,'baked')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (3,'bleached')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (4,'boiled')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (5,'bottled')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (6,'canned')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (7,'cooked')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (8,'dried')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (9,'dry mix')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (10,'enriched')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (11,'fat free')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (12,'fried')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (13,'from concentrate')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (14,'frozen')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (15,'instant')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (16,'liquid')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (17,'low fat')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (18,'low salt')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (19,'microwave')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (20,'no salt')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (21,'no sulfur')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (22,'non fat')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (23,'plain')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (24,'powdered')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (25,'quick')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (26,'raw')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (27,'ready-to-heat')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (28,'sauce')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (29,'solid')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (30,'sulfured')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (31,'sweet')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (32,'uncooked')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (33,'unsweetened')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (34,'wheat')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (35,'white')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (36,'whole')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (37,'whole grain')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (38,'whole wheat')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (39,'1%')");
    tx.executeSql("INSERT INTO foodtypes (id,foodtype) VALUES (40,'2%')");

// FOODITEMS TABLE
	tx.executeSql('DROP TABLE IF EXISTS fooditems');
	var sql = 
		"CREATE TABLE IF NOT EXISTS fooditems ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"fooditem VARCHAR(50), " +
		"foodgroup VARCHAR(50), " +
		"foodsubgroup VARCHAR(50))";
    tx.executeSql(sql);
	// GRAIN
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (1,'Bagels',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (2,'Biscuits',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (3,'Bread, French/Sourdough',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (4,'Bread, white',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (5,'Breading/stuffing',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (6,'Cereal, ready-to-eat',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (7,'Corn grits',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (8,'Cornstarch',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (9,'Crackers',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (10,'English muffins',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (11,'Flour',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (12,'Frankfurter/hotdog rolls',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (13,'Hamburger buns',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (14,'Macaroni and cheese',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (15,'Pasta, macaroni',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (16,'Pasta, spaghetti',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (17,'Pasta, ziti',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (18,'Pie crust',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (19,'Pita bread',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (20,'Pretzels',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (21,'Quick bread mix/Pancakes',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (22,'Rice, white',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (23,'Sweets/Cookies',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (24,'Tortilla, corn',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (25,'Tortilla, wheat',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (26,'Tortilla chips',1,1)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (27,'Bread, rye',1,2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (28,'Bread, whole wheat',1,2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (29,'Oatmeal',1,2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (30,'Pasta, whole grain',1,2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (31,'Popcorn',1,2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (32,'Rice, brown',1,2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (33,'Whole grain rolls',1,2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup,foodsubgroup) VALUES (34,'Corn',1,1)");

	// FRUIT
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (100,'Apple juice',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (102,'Apples',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (103,'Applesauce',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (104,'Apricot',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (105,'Apricot juice/nectar',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (106,'Banana chips',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (107,'Banana juice/nectar',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (108,'Bananas',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (109,'Blackberries',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (110,'Blueberries',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (111,'Boysenberries',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (112,'Cantaloupe',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (113,'Cherries',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (114,'Cherry juice',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (115,'Cranberries',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (116,'Cranberry juice',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (117,'Dates',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (118,'Figs',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (119,'Figs, dried',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (120,'Grape juice',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (121,'Grapefruit',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (122,'Grapefruit juice',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (123,'Grapes',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (124,'Guava',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (125,'Guava juice/nectar',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (126,'Honeydew melon',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (127,'Japanese pears',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (128,'Figs, dried',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (129,'Kiwifruit',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (130,'Lemon juice',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (131,'Lemons',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (132,'Lime',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (133,'Lime juice',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (134,'Lychee',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (135,'Mango',2)");

    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (136,'Mango juice/nectar',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (137,'Mixed fruit juice',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (138,'Nectarine',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (139,'Orange juice',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (140,'Oranges',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (141,'Papaya',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (142,'Papaya juice/nectar',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (143,'Passion fruit juice/nectar',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (144,'Peach juice/nectar',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (145,'Peaches',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (146,'Peaches or canned',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (147,'Pear juice/nectar',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (148,'Pears',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (149,'Persimmons',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (150,'Pineapple',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (151,'Pineapple juice',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (152,'Plums',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (153,'Pomegranate',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (154,'Prune juice',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (155,'Prunes',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (156,'Raisins, seedless',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (157,'Raspberries',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (158,'Rhubarb',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (159,'Star fruit (carambola)',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (160,'Strawberries',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (161,'Tamarind',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (162,'Tangerine',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (163,'Watermelon',2)");
    tx.executeSql("INSERT INTO fooditems (id,fooditem,foodgroup) VALUES (164,'Kiwifruit',2)");
}