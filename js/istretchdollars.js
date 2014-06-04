var db;
var dbCreated = false;
//var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

onDeviceReady();

function onDeviceReady() {
    db = window.openDatabase("iStretchDollarsDB", "1.0", "iStretchDollars", 200000);
    if (dbCreated) {
//	    db.transaction(getGroupsData, transaction_error);
    	db.transaction(getData, transaction_error);
    } else {
    	db.transaction(populateDB, transaction_error, populateDB_success);
    }
}

function transaction_error(tx, error) {
	$('#busy').hide();
    alert("Database Error: " + error);
}

function populateDB_success() {
	dbCreated = true;
//    db.transaction(getGroupsData, transaction_error);
    db.transaction(getData, transaction_error);
}

function getData(tx) {
	var sql_groups = "SELECT i.id, i.itemgroup FROM itemgroups i " + 
		      "ORDER BY i.id";

// TESTING, ITEMS DATA NOT YET USED IN loadData()
	var sql_items = "SELECT i.id, i.item, g.itemgroup FROM items i " + 
				"LEFT JOIN itemgroups g ON g.id = i.itemgroup_id " +
				"GROUP BY i.itemgroup_id, i.item  " +
			    "ORDER BY i.itemgroup_id, i.item";
//	var sql_prices = "SELECT  -----TO DO-------   ";

	tx.executeSql(sql_groups, [], loadData);  // RUN loadData() INSTEAD OF:     getitems_success);
	db = null;

// **  THE SELECT STATEMENT ABOVE WORKS, BUT ALSO NEEDS TO INCLUDE ALL items AND select menus, OR HOW BEST TO BUILD?
// **  ALSO, IN GENERAL WHAT IS BEST PRACTICE TO STORE LOCAL DATA...?  
// DATA TO INCLUDE, DATA TABLES CREATED:
// 		stores (id,store)
// 		aislelocations (id,aislelocation)
// 		qualities (id,quality) 
//		kinds (id,kind)
// 		units (id,unit)
// 		items (id,item,itemgroup_id)
// 		prices (id, store, aisle_id, quality_id, kind_id, price_date, price_qty, price_unit, price)
// BUT NOT YET BEING SELECTED TO INCLUDE IN loadData()

}

//function getitems_success(tx, results) {  // ** NOTE: NOW INSTEAD getData() CALLS loadData()
//		    var len = results.rows.length;
//		    for (var i=0; i<len; i++) {
//		    	var itemgroups = results.rows.item(i);
//				$('#this_footer').append('<div>id=' + itemgroups.id + ' group=' + itemgroups.itemgroup + '</div');
//		    }
//
//	setTimeout(function(){
//		scroll.refresh();
//	},100);
//	db = null;
//}

function loadData(tx, data_results) {
    var len = data_results.rows.length;

	$('[data-role="content"]').append('<div id="collapsible_set" data-role="collapsible-set"></div>');

	//  Add main categories
	for(var c_cnt = 0; c_cnt < len;  c_cnt++) {
		var thisitem = data_results.rows.item(c_cnt);

// console.log(thisitem);
	
	    $('[data-role="content"]').append('<div data-role="collapsible" data-theme="e" data-content-theme="d" data-inset="false" data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u" id="collapsible_' + c_cnt + '"></div>');
	    $("#collapsible_" + c_cnt ).append('<h2>' + thisitem.itemgroup + '</h2>');

        //  within each category, add items
	    for(i_cnt = 0; i_cnt < 2;i_cnt++) {
	        $("#collapsible_" + c_cnt ).append('<ul data-role="listview" id="item_list_' + c_cnt + '"></ul>');
	    
	        results = '';
	
	        results = results + '<table width="100%"><tr><td width="95%">';
	        results = results + '<input type="checkbox" name="checkbox_' + c_cnt + '_' + i_cnt + '" id="checkbox_' + c_cnt + '_' + i_cnt + '"><label for="checkbox_' + c_cnt + '_' + i_cnt + '">Beagle ' + c_cnt + ' ' + i_cnt + '</label>';
	        results = results + '</td><td id="toggleItemDetails_' + c_cnt + '_' + i_cnt + '"><img src="images/arrow-d.png" onclick="showItem(' + c_cnt + ',' + i_cnt + ')"></td>';
	        results = results + '</tr><tr><td>';
	        results = results + '<table width="95%" align="right" id="itemDetailsTable_' + c_cnt + '_' + i_cnt + '" class="itemDetails" border="0" onclick="changeItemDetails(' + c_cnt + ',' + i_cnt + ')"><tbody>';
	        for(p_cnt = 0; p_cnt < 3; p_cnt++) {
	            results = results + '<tr><td colspan="4">Community Market, Aisle 6</td></tr>';
	            results = results + '<tr><td colspan="4">organic, boiled</td></tr>';
	            results = results + '<tr><td>5/17/14</td><td>12 oz</td><td>$2.40</td><td class="price-per">$0.20/oz</td></tr>';
				results = results + '<tr><td colspan="4"><hr></td></tr>';
	        }
	        results = results + '</tbody></table><table width="95%" align="right" id="editItemDetailsTable_' + c_cnt + '_' + i_cnt + '" class="editItemDetails" border="0"><tbody>';
	        results = results + '<tr><td colspan="3"><select name="store_select_' + c_cnt + '_' + i_cnt + '" id="store_select_' + c_cnt + '_' + i_cnt + '" class="selectmenu">';
	        for(store_cnt = 0; store_cnt < 5; store_cnt++) {
	            results = results + '<option value="0">Store ' + store_cnt + '</option>';
	        }
	        results = results + '</select></td></tr>';
	        results = results + '<tr><td colspan="3"><select name="aisle_select_' + c_cnt + '_' + i_cnt + '" id="aisle_select_' + c_cnt + '_' + i_cnt + '" class="selectmenu">';
	        for(aisle_cnt = 0; aisle_cnt < 3; aisle_cnt++) {
	            results = results + '<option value="0">Aisle/location ' + aisle_cnt + '</option>';
	        }
	        results = results + '</select></td></tr>';
	        results = results + '<tr><td colspan="3"><select name="quality_select_' + c_cnt + '_' + i_cnt + '" id="quality_select_' + c_cnt + '_' + i_cnt + '" class="selectmenu">';
	        for(quality_cnt = 0; quality_cnt < 3; quality_cnt++) {
	            results = results + '<option value="0">Quality ' + quality_cnt + '</option>';
	        }
	        results = results + '</select></td></tr>';
	        results = results + '<tr><td colspan="3"><select name="kind_select_' + c_cnt + '_' + i_cnt + '" id="kind_select_' + c_cnt + '_' + i_cnt + '" class="selectmenu">';
	        for(kind_cnt = 0; kind_cnt < 3; kind_cnt++) {
	            results = results + '<option value="0">Kind ' + kind_cnt + '</option>';
	        }
	        results = results + '</select></td></tr>';
	        results = results + '<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<b>Date:</b></td><td colspan="2"><input id="price_date_' + c_cnt + '_' + i_cnt + '" type="date" name="price_date_' + c_cnt + '_' + i_cnt + '" value="mm/dd/yyyy" /></td></td></tr>';
	        results = results + '<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<b>Qty:</b></td><td><input id="item_qty_' + c_cnt + '_' + i_cnt + '" type="number" step="0.01" name="txtbox[]" size="5" class="textbox"></td>';
	        results = results + '<td><select name="unit_select_' + c_cnt + '_' + i_cnt + '" id="unit_select_' + c_cnt + '_' + i_cnt + '" class="selectmenu">';
	        for(unit_cnt = 0; unit_cnt < 3; unit_cnt++) {
	            results = results + '<option value="0">Unit ' + unit_cnt + '</option>';
	        }
	        results = results + '</select></td></tr>';
	        results = results + '<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<b>Price:</b></td><td class="price"><input id="price_' + c_cnt + '_' + i_cnt + '" type="number" step="0.01" name="txtbox[]" size="8"  class="textbox"></td><td class="price-per">$0.20/oz</td></tr>';
	        results = results + '</tbody></table></td><td valign="top" id="toggleItemEdit_' + c_cnt + '_' + i_cnt + '" class="toggleItemEdit">';
	        results = results + '<img src="images/edit.png" onclick="changeItemDetails(' + c_cnt + ',' + i_cnt + ')"><br><img src="images/plus.png" onclick="showAddPrice(' + c_cnt + ',' + i_cnt + ')">';
	        results = results + '</td></tr></table>';
	
	        $("#item_list_" + c_cnt ).append('<li id="item_' + c_cnt + '_' + i_cnt + '">' + results + '</li>');
			hideItem(c_cnt, i_cnt);
	    }
	}
	
	$('[data-role="content"]').trigger('create');

//	setTimeout(function(){
//		scroll.refresh();
//	},100);
//	db = null;  //  THIS WAS AT BOTTOM OF ORIG getItemsSuccess()  ... IS IT NECESSARY?
}

function hideItem(c_cnt, i_cnt) {
	var itemDetails = document.getElementById('itemDetailsTable_' + c_cnt + '_' + i_cnt );
	var editItemDetails = document.getElementById('editItemDetailsTable_' + c_cnt + '_' + i_cnt );
	var toggleItemDetails = document.getElementById('toggleItemDetails_' + c_cnt + '_' + i_cnt );
	var toggleItemEdit = document.getElementById('toggleItemEdit_' + c_cnt + '_' + i_cnt );

	itemDetails.style.setProperty("display", "none");
	editItemDetails.style.setProperty("display", "none");
	toggleItemDetails.innerHTML = '<img src="images/arrow-d.png" onclick="showItem(' + c_cnt + ',' + i_cnt + ')">';
	toggleItemEdit.style.setProperty("display", "none");
}

function showItem(c_cnt, i_cnt) {
	var itemDetails = document.getElementById('itemDetailsTable_' + c_cnt + '_' + i_cnt );
	var editItemDetails = document.getElementById('editItemDetailsTable_' + c_cnt + '_' + i_cnt );
	var toggleItemDetails = document.getElementById('toggleItemDetails_' + c_cnt + '_' + i_cnt );
	var toggleItemEdit = document.getElementById('toggleItemEdit_' + c_cnt + '_' + i_cnt );

	itemDetails.style.setProperty("display", "table");
	editItemDetails.style.setProperty("display", "none");
	toggleItemDetails.innerHTML = '<img src="images/arrow-u.png" onclick="hideItem(' + c_cnt + ',' + i_cnt + ')">';
	toggleItemEdit.style.setProperty("display", "block");
	toggleItemEdit.innerHTML = '<img src="images/edit.png" onclick="changeItemDetails(' + c_cnt + ',' + i_cnt + ')"><br><img src="images/plus.png" onclick="showAddPrice(' + c_cnt + ',' + i_cnt + ')">';
}

// show top level price edit details
function viewItemDetails(c_cnt, i_cnt) {
	var itemDetails = document.getElementById('itemDetailsTable_' + c_cnt + '_' + i_cnt );
	var editItemDetails = document.getElementById('editItemDetailsTable_' + c_cnt + '_' + i_cnt );
	var toggleItemEdit = document.getElementById('toggleItemEdit_' + c_cnt + '_' + i_cnt );

	itemDetails.style.setProperty("display", "table");
	editItemDetails.style.setProperty("display", "none");
	toggleItemEdit.style.setProperty("display", "block");
	toggleItemEdit.innerHTML = '<img src="images/edit.png" onclick="changeItemDetails(' + c_cnt + ',' + i_cnt + ')"><br><img src="images/plus.png" onclick="showAddPrice(' + c_cnt + ',' + i_cnt + ')">';
}
function changeItemDetails(c_cnt, i_cnt) {
	var itemDetails = document.getElementById('itemDetailsTable_' + c_cnt + '_' + i_cnt );
	var editItemDetails = document.getElementById('editItemDetailsTable_' + c_cnt + '_' + i_cnt );
	var toggleItemEdit = document.getElementById('toggleItemEdit_' + c_cnt + '_' + i_cnt );

	itemDetails.style.setProperty("display", "none");
	editItemDetails.style.setProperty("display", "table");
	toggleItemEdit.style.setProperty("display", "block");
	toggleItemEdit.innerHTML = '<img src="images/arrow-u.png" onclick="viewItemDetails(' + c_cnt + ',' + i_cnt + ')"><br><img src="images/minus.png" onclick="showDeletePrice(' + c_cnt + ',' + i_cnt + ')">';
}

//	
function showDeletePrice(c_cnt, i_cnt) {
// STILL TO BUILD
}

function showAddPrice(c_cnt, i_cnt) {
// STILL TO BUILD
}



function populateDB(tx) {
	$('#busy').show();

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
    tx.executeSql("INSERT INTO stores (id,store) VALUES (1,'Andys')");
    tx.executeSql("INSERT INTO stores (id,store) VALUES (2,'Community Market')");
    tx.executeSql("INSERT INTO stores (id,store) VALUES (3,'Costco')");
    tx.executeSql("INSERT INTO stores (id,store) VALUES (4,'Pacific Market')");
    tx.executeSql("INSERT INTO stores (id,store) VALUES (5,'Safeway')");
    tx.executeSql("INSERT INTO stores (id,store) VALUES (6,'Trader Joes')");
    tx.executeSql("INSERT INTO stores (id,store) VALUES (7,'Whole Foods')");

//  AISLE/LOCATIONS TABLE
	tx.executeSql('DROP TABLE IF EXISTS aislelocations');
	var sql = 
		"CREATE TABLE IF NOT EXISTS aislelocations ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"aislelocation VARCHAR(50))";
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

//  KINDS TABLE
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

// UNITS TABLE
	tx.executeSql('DROP TABLE IF EXISTS units');
	var sql = 
		"CREATE TABLE IF NOT EXISTS units ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"unit VARCHAR(50))";
    tx.executeSql(sql);
    tx.executeSql("INSERT INTO units (id,unit) VALUES (0,'Unit')");
    tx.executeSql("INSERT INTO units (id,unit) VALUES (1,'oz')");
    tx.executeSql("INSERT INTO units (id,unit) VALUES (2,'lb')");
    tx.executeSql("INSERT INTO units (id,unit) VALUES (3,'fl oz')");
    tx.executeSql("INSERT INTO units (id,unit) VALUES (4,'pt')");
    tx.executeSql("INSERT INTO units (id,unit) VALUES (5,'qt')");
    tx.executeSql("INSERT INTO units (id,unit) VALUES (6,'gal')");
    tx.executeSql("INSERT INTO units (id,unit) VALUES (7,'6 pk')");
    tx.executeSql("INSERT INTO units (id,unit) VALUES (8,'dozen')");
    tx.executeSql("INSERT INTO units (id,unit) VALUES (9,'24 pk')");

// ITEMS TABLE
	tx.executeSql('DROP TABLE IF EXISTS items');
	var sql = 
		"CREATE TABLE IF NOT EXISTS items ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"item VARCHAR(50), " +
		"itemgroup_id VARCHAR(50))";
    tx.executeSql(sql);

	// GRAINS
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (0,'Bagels',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (1,'Biscuits',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (2,'Bread, French/sourdough',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (3,'Bread, wheat',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (4,'Bread, white',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (5,'Breading/stuffing',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (6,'Cereal, ready-to-eat',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (7,'Corn grits',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (8,'Cornstarch',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (9,'Crackers',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (10,'English muffins',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (11,'Flour',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (12,'Frankfurter/hotdog rolls',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (13,'Hamburger buns',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (14,'Macaroni and cheese',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (15,'Pasta, macaroni',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (16,'Pasta, spaghetti',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (17,'Pasta, ziti',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (18,'Pie crust',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (19,'Pita bread',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (20,'Pretzels',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (21,'Quick bread mix/Pancakes',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (22,'Rice, white',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (23,'Sweets/Cookies',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (24,'Tortilla, corn',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (25,'Tortilla, wheat',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (26,'Tortilla chips',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (27,'Bread, rye',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (28,'Bread, whole wheat',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (29,'Oatmeal',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (30,'Pasta, whole grain',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (31,'Popcorn',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (32,'Rice, brown',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (33,'Whole grain rolls',0)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (34,'Corn',0)");

	// FRUIT
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (100,'Apple juice',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (102,'Apples',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (103,'Applesauce',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (104,'Apricot',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (105,'Apricot juice/nectar',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (106,'Banana chips',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (107,'Banana juice/nectar',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (108,'Bananas',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (109,'Blackberries',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (110,'Blueberries',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (111,'Boysenberries',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (112,'Cantaloupe',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (113,'Cherries',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (114,'Cherry juice',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (115,'Cranberries',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (116,'Cranberry juice',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (117,'Dates',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (118,'Figs',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (119,'Figs, dried',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (120,'Grape juice',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (121,'Grapefruit',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (122,'Grapefruit juice',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (123,'Grapes',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (124,'Guava',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (125,'Guava juice/nectar',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (126,'Honeydew melon',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (127,'Japanese pears',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (128,'Figs, dried',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (129,'Kiwifruit',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (130,'Lemon juice',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (131,'Lemons',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (132,'Lime',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (133,'Lime juice',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (134,'Lychee',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (135,'Mango',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (136,'Mango juice/nectar',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (137,'Mixed fruit juice',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (138,'Nectarine',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (139,'Orange juice',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (140,'Oranges',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (141,'Papaya',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (142,'Papaya juice/nectar',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (143,'Passion fruit juice/nectar',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (144,'Peach juice/nectar',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (145,'Peaches',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (146,'Peaches or canned',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (147,'Pear juice/nectar',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (148,'Pears',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (149,'Persimmons',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (150,'Pineapple',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (151,'Pineapple juice',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (152,'Plums',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (153,'Pomegranate',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (154,'Prune juice',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (155,'Prunes',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (156,'Raisins, seedless',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (157,'Raspberries',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (158,'Rhubarb',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (159,'Star fruit (carambola)',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (160,'Strawberries',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (161,'Tamarind',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (162,'Tangerine',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (163,'Watermelon',1)");
    tx.executeSql("INSERT INTO items (id,item,itemgroup_id) VALUES (164,'Kiwifruit',1)");

// PRICES TABLE
	tx.executeSql('DROP TABLE IF EXISTS prices');
	var sql = 
		"CREATE TABLE IF NOT EXISTS prices ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"store_id VARCHAR(50), " +
		"aisle_id VARCHAR(50), " +
		"quality_id VARCHAR(50), " +
		"kind_id VARCHAR(50), " +
		"price_date VARCHAR(50), " +
		"price_qty VARCHAR(50), " +
		"unit_id VARCHAR(50), " +
		"price VARCHAR(50))";
    tx.executeSql(sql);
    tx.executeSql("INSERT INTO prices (id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (0,0,0,0,0,'5/17/2014',2,0,'5.00')");
    tx.executeSql("INSERT INTO prices (id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (1,1,1,1,1,'5/17/2014',4,1,'4.00')");
    tx.executeSql("INSERT INTO prices (id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (2,2,2,2,2,'5/17/2014',6,2,'6.00')");
    tx.executeSql("INSERT INTO prices (id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (3,3,3,3,3,'5/17/2014',8,3,'8.00')");

}
