var db;
var dbCreated = false;

// var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

onDeviceReady();

function onDeviceReady() {
    db = window.openDatabase("iStretchDollarsDB", "1.0", "iStretchDollars", 200000);
    if (dbCreated)
    	db.transaction(getitemsdata, transaction_error);
    else
    	db.transaction(populateDB, transaction_error, populateDB_success);
}

function transaction_error(tx, error) {
//	$('#busy').hide();
    alert("Database Error: " + error);
}

function populateDB_success() {
	dbCreated = true;
    db.transaction(getitemsdata, transaction_error);
}

function getitemsdata(tx) {
	var sql = "SELECT i.id, i.item, g.itemgroup FROM items i " + 
				"LEFT JOIN itemgroups g ON g.id = i.itemgroup " +
				"GROUP BY i.itemgroup, i.item  ";
			    "ORDER BY i.itemgroup, i.item";
	tx.executeSql(sql, [], getitems_success);
	db = null;
}

function getitems_success(tx, results) {
//	$('#busy').hide();
	$('#mainform').append('<fieldset data-role="collapsible" data-theme="e" data-content-theme="d" data-inset="false" data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u">');
	$('#mainform').append('<legend>Grains</legend>');
	$('#mainform').append('<table width="100%"><tbody><tr>');
	$('#mainform').append('<td width="95%"><input type="checkbox" name="checkbox-1-a" id="checkbox-1-a"><label for="checkbox-1-a">Bagels</label></td>');
	$('#mainform').append('<td id="toggleItemDetails"><img src="images/arrow-d.png" onclick="showItem()"></td>');
	$('#mainform').append('</tr></tbody></table>');

// ***** TO DO MAYBE...?: ADD TWO OUTER "FOR" LOOPS AROUND THIS LOOP, TO DISPLAY IN LIST GROUPED BY group, subgroup, item *****
//		    var len = results.rows.length;
//		    for (var i=0; i<len; i++) {
//		    	var items = results.rows.item(i);
//				$('#itemslist').append('<li><a href="idetails.html?id=' + items.id + '">' +
//						'<p class="line1">' + items.item + '</p>' +
//						'<p class="line2">' + items.itemgroup + ' ' + items.subgroup + '</p>' +
//						'<span class="bubble">' + items.id + '</span></a></li>');
//		    }

//	setTimeout(function(){
//		scroll.refresh();
//	},100);
	db = null;
}

function populateDB(tx) {
//	$('#busy').show();

//  ITEMGROUPS TABLE
	tx.executeSql('DROP TABLE IF EXISTS itemgroups');
	var sql = 
		"CREATE TABLE IF NOT EXISTS itemgroups ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"itemgroup VARCHAR(50))";
    tx.executeSql(sql);
    tx.executeSql("INSERT INTO itemgroups (id,itemgroup) VALUES (0,'Grains')");
    tx.executeSql("INSERT INTO itemgroups (id,itemgroup) VALUES (1,'Fruit')");
    tx.executeSql("INSERT INTO itemgroups (id,itemgroup) VALUES (2,'Vegetables')");
    tx.executeSql("INSERT INTO itemgroups (id,itemgroup) VALUES (3,'Protein')");
    tx.executeSql("INSERT INTO itemgroups (id,itemgroup) VALUES (4,'Dairy')");
    tx.executeSql("INSERT INTO itemgroups (id,itemgroup) VALUES (5,'Beverages')");
    tx.executeSql("INSERT INTO itemgroups (id,itemgroup) VALUES (6,'Household')");
    tx.executeSql("INSERT INTO itemgroups (id,itemgroup) VALUES (7,'Other')");

//  STORES TABLE
	tx.executeSql('DROP TABLE IF EXISTS stores');
	var sql = 
		"CREATE TABLE IF NOT EXISTS stores ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"store VARCHAR(50))";
    tx.executeSql(sql);
    tx.executeSql("INSERT INTO stores (id,store) VALUES (0,'Store')");
    tx.executeSql("INSERT INTO stores (id,store) VALUES (1,'Andy's')");
    tx.executeSql("INSERT INTO stores (id,store) VALUES (2,'Community Market')");
    tx.executeSql("INSERT INTO stores (id,store) VALUES (3,'Costco')");
    tx.executeSql("INSERT INTO stores (id,store) VALUES (4,'Pacific Market')");
    tx.executeSql("INSERT INTO stores (id,store) VALUES (5,'Safeway')");
    tx.executeSql("INSERT INTO stores (id,store) VALUES (6,'Trader Joes')");
    tx.executeSql("INSERT INTO stores (id,store) VALUES (7,'Whole Foods')");

//  STORES TABLE
	tx.executeSql('DROP TABLE IF EXISTS aislelocations');
	var sql = 
		"CREATE TABLE IF NOT EXISTS aislelocations ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"group VARCHAR(50))";
    tx.executeSql(sql);
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (0,'Aisle/location')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (1,'Aisle 1')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (2,'Aisle 2')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (3,'Aisle 3')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (4,'Aisle 4')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (5,'Aisle 5')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (6,'Aisle 6')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (7,'Aisle 7')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (8,'Aisle 8')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (9,'Aisle 9')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (10,'Aisle 10')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (11,'Aisle 11')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (12,'Aisle 12')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (13,'Aisle 13')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (14,'Aisle 14')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (15,'Aisle 15')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (16,'Aisle 16')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (17,'Aisle 17')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (18,'Aisle 18')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (19,'Aisle 19')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (20,'Aisle 20')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (21,'Aisle')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (22,'Bakery')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (23,'Dairy')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (24,'Deli')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (25,'Produce')");

//  QUALITIES TABLE
	tx.executeSql('DROP TABLE IF EXISTS qualities');
	var sql = 
		"CREATE TABLE IF NOT EXISTS qualities ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"quality VARCHAR(50))";
    tx.executeSql(sql);
    tx.executeSql("INSERT INTO qualities (id,quality) VALUES (0,'Quality')");
    tx.executeSql("INSERT INTO qualities (id,quality) VALUES (1,'conventional')");
    tx.executeSql("INSERT INTO qualities (id,quality) VALUES (2,'GMO free')");
    tx.executeSql("INSERT INTO qualities (id,quality) VALUES (3,'gluten free')");
    tx.executeSql("INSERT INTO qualities (id,quality) VALUES (4,'local')");
    tx.executeSql("INSERT INTO qualities (id,quality) VALUES (5,'made in USA')");
    tx.executeSql("INSERT INTO qualities (id,quality) VALUES (6,'natural')");
    tx.executeSql("INSERT INTO qualities (id,quality) VALUES (7,'no antibiotics')");
    tx.executeSql("INSERT INTO qualities (id,quality) VALUES (8,'no dairy')");
    tx.executeSql("INSERT INTO qualities (id,quality) VALUES (9,'no hormones')");
    tx.executeSql("INSERT INTO qualities (id,quality) VALUES (10,'no nitrites')");
    tx.executeSql("INSERT INTO qualities (id,quality) VALUES (11,'organic')");
    tx.executeSql("INSERT INTO qualities (id,quality) VALUES (12,'sugar free')");
    tx.executeSql("INSERT INTO qualities (id,quality) VALUES (13,'vegan')");

//  kinds TABLE
	tx.executeSql('DROP TABLE IF EXISTS kinds');
	var sql = 
		"CREATE TABLE IF NOT EXISTS kinds ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"kind VARCHAR(50))";
    tx.executeSql(sql);
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (0,'Kind')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (1,'all-purpose')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (2,'baked')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (3,'bleached')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (4,'boiled')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (5,'bottled')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (6,'canned')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (7,'cooked')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (8,'dried')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (9,'dry mix')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (10,'enriched')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (11,'fat free')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (12,'fried')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (13,'from concentrate')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (14,'frozen')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (15,'instant')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (16,'liquid')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (17,'low fat')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (18,'low salt')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (19,'microwave')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (20,'no salt')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (21,'no sulfur')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (22,'non fat')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (23,'plain')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (24,'powdered')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (25,'quick')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (26,'raw')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (27,'ready-to-heat')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (28,'sauce')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (29,'solid')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (30,'sulfured')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (31,'sweet')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (32,'uncooked')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (33,'unsweetened')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (34,'wheat')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (35,'white')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (36,'whole')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (37,'whole grain')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (38,'whole wheat')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (39,'1%')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (40,'2%')");
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (41,'puree')");

// ITEMS TABLE
	tx.executeSql('DROP TABLE IF EXISTS items');
	var sql = 
		"CREATE TABLE IF NOT EXISTS items ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"item VARCHAR(50), " +
		"itemgroup VARCHAR(50))";
    tx.executeSql(sql);
	// GRAINS
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (1,'Bagels',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (2,'Biscuits',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (3,'Bread, French/Sourdough',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (4,'Bread, white',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (5,'Breading/stuffing',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (6,'Cereal, ready-to-eat',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (7,'Corn grits',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (8,'Cornstarch',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (9,'Crackers',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (10,'English muffins',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (11,'Flour',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (12,'Frankfurter/hotdog rolls',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (13,'Hamburger buns',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (14,'Macaroni and cheese',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (15,'Pasta, macaroni',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (16,'Pasta, spaghetti',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (17,'Pasta, ziti',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (18,'Pie crust',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (19,'Pita bread',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (20,'Pretzels',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (21,'Quick bread mix/Pancakes',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (22,'Rice, white',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (23,'Sweets/Cookies',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (24,'Tortilla, corn',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (25,'Tortilla, wheat',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (26,'Tortilla chips',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (27,'Bread, rye',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (28,'Bread, whole wheat',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (29,'Oatmeal',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (30,'Pasta, whole grain',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (31,'Popcorn',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (32,'Rice, brown',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (33,'Whole grain rolls',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (34,'Corn',1)");

	// FRUIT
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (100,'Apple juice',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (102,'Apples',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (103,'Applesauce',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (104,'Apricot',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (105,'Apricot juice/nectar',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (106,'Banana chips',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (107,'Banana juice/nectar',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (108,'Bananas',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (109,'Blackberries',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (110,'Blueberries',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (111,'Boysenberries',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (112,'Cantaloupe',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (113,'Cherries',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (114,'Cherry juice',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (115,'Cranberries',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (116,'Cranberry juice',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (117,'Dates',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (118,'Figs',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (119,'Figs, dried',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (120,'Grape juice',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (121,'Grapefruit',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (122,'Grapefruit juice',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (123,'Grapes',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (124,'Guava',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (125,'Guava juice/nectar',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (126,'Honeydew melon',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (127,'Japanese pears',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (128,'Figs, dried',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (129,'Kiwifruit',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (130,'Lemon juice',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (131,'Lemons',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (132,'Lime',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (133,'Lime juice',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (134,'Lychee',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (135,'Mango',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (136,'Mango juice/nectar',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (137,'Mixed fruit juice',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (138,'Nectarine',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (139,'Orange juice',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (140,'Oranges',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (141,'Papaya',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (142,'Papaya juice/nectar',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (143,'Passion fruit juice/nectar',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (144,'Peach juice/nectar',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (145,'Peaches',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (146,'Peaches or canned',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (147,'Pear juice/nectar',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (148,'Pears',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (149,'Persimmons',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (150,'Pineapple',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (151,'Pineapple juice',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (152,'Plums',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (153,'Pomegranate',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (154,'Prune juice',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (155,'Prunes',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (156,'Raisins, seedless',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (157,'Raspberries',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (158,'Rhubarb',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (159,'Star fruit (carambola)',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (160,'Strawberries',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (161,'Tamarind',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (162,'Tangerine',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (163,'Watermelon',2)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup) VALUES (164,'Kiwifruit',2)");
}


////////////////////////////////////

//			hide or show top level price details
            function hideItem() {
				itemDetailsTable.style.setProperty("display", "none");
				editItemDetailsTable.style.setProperty("display", "none");
				toggleItemEdit.style.setProperty("display", "none");
				document.getElementById('toggleItemDetails').innerHTML = '<img src="images/arrow-d.png" onclick="showItem()">';
            }
            function showItem() {
				itemDetailsTable.style.setProperty("display", "table");
				editItemDetailsTable.style.setProperty("display", "none");
				toggleItemEdit.style.setProperty("display", "block");
				document.getElementById('toggleItemDetails').innerHTML = '<img src="images/arrow-u.png" onclick="hideItem()">';
				document.getElementById('toggleItemEdit').innerHTML = '<img src="images/edit.png" onclick="editItemDetails()"><br><img src="images/plus.png" onclick="showAddPrice()">';				
			}

//			hide or show top level price edit details
            function viewItemDetails() {
				itemDetailsTable.style.setProperty("display", "table");
				editItemDetailsTable.style.setProperty("display", "none");
				toggleItemEdit.style.setProperty("display", "block");
				document.getElementById('toggleItemEdit').innerHTML = '<img src="images/edit.png" onclick="editItemDetails()"><br><img src="images/plus.png" onclick="showAddPrice()">';
			}
            function editItemDetails() {
				itemDetailsTable.style.setProperty("display", "none");
				editItemDetailsTable.style.setProperty("display", "table");
				toggleItemEdit.style.setProperty("display", "block");
				document.getElementById('toggleItemEdit').innerHTML = '<img src="images/arrow-u.png" onclick="viewItemDetails()"><br><img src="images/minus.png" onclick="showDeletePrice()">';
            }

//			when viewing price show "plus" sign to add new price, else when editing show "minus" sign to delete this price
            function showDeletePrice() {
				itemDetailsTable.style.setProperty("display", "table");
				editItemDetailsTable.style.setProperty("display", "none");
				toggleItemEdit.style.setProperty("display", "block");
				document.getElementById('toggleItemEdit').innerHTML = '<img src="images/edit.png" onclick="editItemDetails()"><br><img src="images/plus.png" onclick="showAddPrice()">';
			}
            function showAddPrice() {
            }
 	        function showDeletePrice() {
            }
