var db;
var dbCreated = false;
//var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

onDeviceReady();

function onDeviceReady() {
    db = window.openDatabase("iStretchDollarsDB", "1.0", "iStretchDollars", 200000);
    if (dbCreated) {
    	db.transaction(getGroupsData, transaction_error);
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
    db.transaction(getGroupsData, transaction_error);
}

function getGroupsData(tx) {
	// GROUPS DATA
	var sql_groups = "SELECT i.id, i.itemgroup FROM itemgroups i " + 
		      "ORDER BY i.id";

	tx.executeSql(sql_groups, [], loadGroupsData);

//	db = null;
}

// ITEMS DATA
function getItemsData(tx) {
	var sql_items = "SELECT i.itemgroup_id, g.itemgroup, i.id, i.item FROM items i " + 
				"LEFT JOIN itemgroups g ON g.id = i.itemgroup_id " +
//				"GROUP BY i.itemgroup_id, i.item " +
			    "ORDER BY i.itemgroup_id, i.item";

	tx.executeSql(sql_items, [], loadItemsData);
//	db = null;

}

// QUALITIES DATA
function getQualitiesData(tx) {
	var sql_qualities = "SELECT q.id, q.quality FROM qualities q " + 
		      "ORDER BY q.id";

	tx.executeSql(sql_qualities, [], loadQualitiesData);

//	db = null;
}

// UNITS DATA
function getUnitsData(tx) {
	var sql_units = "SELECT u.id, u.unit FROM units u " + 
		      "ORDER BY u.id";

	tx.executeSql(sql_units, [], loadUnitsData);

//	db = null;
}

// KINDS DATA
function getKindsData(tx) {
	var sql_kinds = "SELECT k.id, k.kind FROM kinds k " + 
		      "ORDER BY k.id";

	tx.executeSql(sql_kinds, [], loadKindsData);

//	db = null;
}

// STORES DATA
function getStoresData(tx) {
	var sql_stores = "SELECT s.id, s.store FROM stores s " + 
		      "ORDER BY s.id";

	tx.executeSql(sql_stores, [], loadStoresData);

//	db = null;
}

// LOCATIONS DATA
function getAislelocationsData(tx) {
	var sql_aislelocations = "SELECT a.id, a.aislelocation FROM aislelocations a " + 
		      "ORDER BY a.id";

	tx.executeSql(sql_aislelocations, [], loadAislelocationsData);

//	db = null;
}

// PRICE DATA
function getPricesData(tx) {
	var sql_prices = "SELECT p.id, p.itemgroup_id, p.item_id, p.store_id, p.aisle_id, p.quality_id, p.kind_id, p.price_date, p.price_qty, p.unit_id, p.price, i.item FROM prices p " +
				"LEFT JOIN items i ON i.id = p.item_id "; +
			    "ORDER BY p.itemgroup_id, p.price_date DESC";

	tx.executeSql(sql_prices, [], loadPricesData);
//	db = null;
}

function loadGroupsData(tx, data_results) {
    num_of_groups = data_results.rows.length;

	$('[data-role="content"]').append('<div id="collapsible_set" data-role="collapsible-set"></div>');

	// ADD EACH ITEM GROUP
	for(var g_cnt = 0; g_cnt < num_of_groups;  g_cnt++) {
		thisitem = data_results.rows.item(g_cnt);
// console.log(thisitem);
// console.log(thisitem.itemgroup);

	    $('[data-role="content"]').append('<div data-role="collapsible" data-theme="e" data-content-theme="d" data-inset="false" data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u" id="collapsible_' + g_cnt + '"></div>');
	    $("#collapsible_" + g_cnt ).append('<h2>' + thisitem.itemgroup + '</h2>');
        $("#collapsible_" + g_cnt ).append('<ul data-role="listview" id="item_list_' + g_cnt + '"></ul>');

	}

	$('[data-role="content"]').trigger('create');
  	db.transaction(getItemsData, transaction_error);

//	setTimeout(function(){
//		scroll.refresh();
//	},100);
//	db = null;
}

function loadItemsData(tx, data_results) {
    var num_of_items = data_results.rows.length;

	//  WITHIN EACH ITEM GROUP, SHOW EACH ITEM
	for (g_cnt = 0; g_cnt < num_of_groups;g_cnt++) {   // for each item group
	    for(i_cnt = 0; i_cnt < num_of_items;i_cnt++) {  // within this group,for each item
			var thisitem = data_results.rows.item(i_cnt);
		    results = '';
			if (g_cnt == thisitem.itemgroup_id) {	
//console.log('Group id =' + thisitem.itemgroup_id + ' g_cnt =' + g_cnt + ' Item id =' + thisitem.id + ' thisitem.id= ' + thisitem.id + ' Item= ' + thisitem.item);
//console.log('num_of_items= ' + num_of_items + '  Price= ' + thisitem.item_price + '  Date = ' + thisitem.item_date);
		        results = results + '<table width="100%">';
		        results = results + '<tr><td width="95%"><input type="checkbox" name="checkbox_' + g_cnt + '_' + thisitem.id + '" id="checkbox_' + g_cnt + '_' + thisitem.id + '">';
		        results = results + '<label for="checkbox_' + g_cnt + '_' + thisitem.id + '">' + thisitem.item + '</label></td>';
		        results = results + '<td id="toggleItemDetails_' + g_cnt + '_' + thisitem.id + '"><img src="images/arrow-d.png" onclick="showItem(' + g_cnt + ',' + thisitem.id + ')"></td></tr>';
		   	    results = results + '<tr><td>';

				// CONTAINER AROUND ALL ITEM/PRICE DETAILS FOR ONE ITEM, USED TO SHOW/HIDE VIA UP/DOWN ARROW BUTTONS AT RIGHT OF ITEM NAME
		   	    results = results + '<table width="100%" id="showHideItemDetailsTable_' + g_cnt + '_' + thisitem.id + '" class="itemDetails" border="0">';
		   	    results = results + '<tbody><tr><td></td></tr></tbody></table>';  // END SHOW/HIDE ITEM DETAILS CONTAINER
		   	    
				results = results + '</td>';
		    	// SHOW "+" ICON FOR TO ADD NEW ITEM/PRICE...
			    results = results + '<td valign="top" id="toggleItemEdit_' + g_cnt + '_' + thisitem.id + '" class="toggleItemEdit">';
			    results = results + '<img src="images/plus.png" onclick="showAddPrice(' + g_cnt + ',' + thisitem.id + ')">';
			    results = results + '</td></tr></table>';
			    $("#item_list_" + g_cnt ).append('<li id="item_' + g_cnt + '_' + thisitem.id + '">' + results + '</li>');
			}
	    }
	}
	$('[data-role="content"]').trigger('create');
  	db.transaction(getPricesData, transaction_error);
}

function loadPricesData(tx, data_results) {
    var num_of_prices = data_results.rows.length;

	//  WITHIN EACH ITEM, SHOW EACH ITEM/PRICE
    for(p_cnt = 0; p_cnt < num_of_prices; p_cnt++) {
		thisitem = data_results.rows.item(p_cnt);
//console.log('num_of_prices = ' + num_of_prices + '  Group id = ' + thisitem.itemgroup_id + '  i.id = ' + thisitem.id + '  item_id = ' + thisitem.item_id + '  p_cnt = ' + p_cnt );
//console.log('Price = ' + thisitem.price + ' Date = ' + thisitem.price_date );

		// SHOW ITEM/PRICE DETAILS, AND PENCIL ICON TO EDIT
	    results = '';
        results = results + '<table width="92%" align="right" id="itemDetailsTable_' + thisitem.itemgroup_id + '_' + thisitem.item_id + '_' + p_cnt + '" class="itemDetails" border="0"><tbody>';
        results = results + '<tr><td colspan=2"><b>$' + thisitem.price + ' for ' + thisitem.price_qty + ' unit_id=' + thisitem.unit_id + '</b></td><td align="right" class="price-per">$0.20/oz</td><td align="right"><img src="images/edit.png" onclick="changeItemDetails(' + thisitem.itemgroup_id + ',' + thisitem.item_id + ',' + p_cnt + ')"></td></tr>';
        results = results + '<tr><td colspan="4">quality_id=' + thisitem.quality_id + ', kind_id=' + thisitem.kind_id + '</td></tr>';
        results = results + '<tr><td colspan="4">store_id=' + thisitem.store_id + '</td></tr>';
        results = results + '<td colspan="4">aisle_id=' + thisitem.aisle_id + ', ' + thisitem.price_date + '</td></tr>';
//		if (p_cnt < (??)) {  HOW TO NOT PRINT LINE AFTER LAST PRICE DETAILS...?
			results = results + '<tr><td colspan="4"><hr></td></tr>';
//        }
        
		// EDIT ITEM/PRICE DETAILS, SET UP DATA ENTRY FIELDS AND LOAD DATA, EXCEPT PULL-DOWN SELECT FIELDS WHICH GET DATA LOADED AFTER ADDING ALL SELECT OPTIONS
		// ALSO, SHOW UP ARROW ICON TO EXIT EDIT AND RETURN TO SHOW ITEM/PRICE 
        results = results + '<table width="92%" align="right" id="editItemDetailsTable_' + thisitem.itemgroup_id + '_' + thisitem.item_id + '_' + p_cnt + '" class="editItemDetails" border="0"><tbody>';

		// Price
        results = results + '<tr><td><b>price:</b></td><td class="price"><input id="price_' + thisitem.itemgroup_id + '_' + thisitem.item_id + '_' + p_cnt + '" type="number" step="0.01" name="txtbox[]" size="8"  class="textbox" value="' + thisitem.price + '"></td><td class="price-per">$.20/oz</td><td align="right"><img src="images/arrow-u.png" onclick="viewItemDetails(' + thisitem.itemgroup_id + ',' + thisitem.item_id + ',' + p_cnt + ')"></td></tr>';

		// Qty and unit of measure
        results = results + '<tr><td><b>qty:</b></td><td><input id="item_qty_' + thisitem.itemgroup_id + '_' + thisitem.item_id + '_' + p_cnt + '" type="number" step="0.01" name="txtbox[]" size="5" class="textbox">' + thisitem.price_qty + '</td><td>';
        results = results + '<select name="unit_select_' + thisitem.itemgroup_id + '_' + thisitem.item_id + '_' + thisitem.unit_id + '" id="unit_select_' + thisitem.itemgroup_id + '_' + thisitem.item_id + '_' + p_cnt + '" class="selectmenu"></select>';
        results = results + '</td><td align="right"><img src="images/minus.png" onclick="showDeletePrice(' + thisitem.itemgroup_id + ',' + thisitem.item_id + ',' + p_cnt + ')"></td></tr>';

        // Quality
        results = results + '<tr><td colspan="3"><select name="quality_select_' + thisitem.itemgroup_id + '_' + thisitem.item_id + '_' + p_cnt + '" id="quality_select_' + thisitem.itemgroup_id + '_' + thisitem.item_id + '_' + p_cnt + '" class="selectmenu"></select>';
        results = results + '</td><td>&nbsp;</td></tr>';
        
        // Kind
        results = results + '<tr><td colspan="3"><select name="kind_select_' + thisitem.itemgroup_id + '_' + thisitem.item_id + '_' + p_cnt + '" id="kind_select_' + thisitem.itemgroup_id + '_' + thisitem.item_id + '_' + p_cnt + '" class="selectmenu">';
        results = results + '</select></td><td>&nbsp;</td></tr>';

		// Store where purchased
        results = results + '<tr><td colspan="3"><select name="store_select_' + thisitem.itemgroup_id + '_' + thisitem.item_id + '_' + p_cnt + '" id="store_select_' + thisitem.itemgroup_id + '_' + thisitem.item_id + '_' + p_cnt + '" class="selectmenu">';
        results = results + '</select></td><td>&nbsp;</td></tr>';

        // Location
        results = results + '<tr><td colspan="3"><select name="aisle_select_' + thisitem.itemgroup_id + '_' + thisitem.item_id + '_' + p_cnt + '" id="aisle_select_' + thisitem.itemgroup_id + '_' + thisitem.item_id + '_' + p_cnt + '" class="selectmenu">';
        results = results + '</select></td><td>&nbsp;</td></tr>';
        
		// Date
        results = results + '<tr><td><b>Date:</b></td><td colspan="2"><input id="price_date_' + thisitem.itemgroup_id + '_' + thisitem.item_id + '_' + p_cnt + '" type="date" name="price_date_' + thisitem.itemgroup_id + '_' + thisitem.item_id + '_' + p_cnt + '" value="mm/dd/yyyy" /></td></td></tr>';

		results = results + '<tr><td colspan="4"><hr></td></tr>';
        results = results + '</tbody></table>';  // END EDIT ITEM/PRICE DETAILS
		
	    $("#showHideItemDetailsTable_" + thisitem.itemgroup_id + '_' + thisitem.item_id ).append( results );  // add contents to the show/hide container table for this item

    }

	$('[data-role="content"]').trigger('create');


// STILL TESTING, DON'T HIDE
//   	hideItem(thisitem.itemgroup_id, thisitem.item_id);  // **** NEEDED?

	// hide "edit item details" tables for each PRICE
    for(p_cnt = 0; p_cnt < num_of_prices; p_cnt++) {
		thisitem = data_results.rows.item(p_cnt);

//		var editItemDetails = document.getElementById('editItemDetailsTable_7_701_15' );
		var editItemDetails = document.getElementById('editItemDetailsTable_' + thisitem.itemgroup_id + '_' + thisitem.item_id + '_' + p_cnt );

//console.log('p_cnt =' + p_cnt + '  Group id =' + thisitem.itemgroup_id + '  item_id= ' + thisitem.item_id + '  p.id= ' + thisitem.id + ' Item= ' + thisitem.item);
//console.log('editItemDetails= ' + editItemDetails );
// console.log('thisitem=' + thisitem);

// STILL TESTING, DON'T HIDE
//		editItemDetails.style.setProperty("display", "none");
  
	}

	$('[data-role="content"]').trigger('create');

//	loadUnitsData(data_results);
//  	db.transaction(getUnitsData, transaction_error);
}

// *************
function hideItem(g_cnt, i_cnt) {

	var showHideItemDetails = document.getElementById('showHideItemDetailsTable_' + g_cnt + '_' + i_cnt );

	var itemDetails = document.getElementById('itemDetailsTable_' + g_cnt + '_' + i_cnt );
	var editItemDetails = document.getElementById('editItemDetailsTable_' + g_cnt + '_' + i_cnt );
	var toggleItemDetails = document.getElementById('toggleItemDetails_' + g_cnt + '_' + i_cnt );
	var toggleItemEdit = document.getElementById('toggleItemEdit_' + g_cnt + '_' + i_cnt );

	showHideItemDetails.style.setProperty("display", "none");
	toggleItemDetails.innerHTML = '<img src="images/arrow-d.png" onclick="showItem(' + g_cnt + ',' + i_cnt + ')">';
	toggleItemEdit.style.setProperty("display", "none");
}

function showItem(g_cnt, i_cnt) {

	var showHideItemDetails = document.getElementById('showHideItemDetailsTable_' + g_cnt + '_' + i_cnt );

	var itemDetails = document.getElementById('itemDetailsTable_' + g_cnt + '_' + i_cnt );
	var editItemDetails = document.getElementById('editItemDetailsTable_' + g_cnt + '_' + i_cnt );
	var toggleItemDetails = document.getElementById('toggleItemDetails_' + g_cnt + '_' + i_cnt );
	var toggleItemEdit = document.getElementById('toggleItemEdit_' + g_cnt + '_' + i_cnt );

	showHideItemDetails.style.setProperty("display", "table");

//	itemDetails.style.setProperty("display", "table");
//	editItemDetails.style.setProperty("display", "none");
	toggleItemDetails.innerHTML = '<img src="images/arrow-u.png" onclick="hideItem(' + g_cnt + ',' + i_cnt + ')">';
	toggleItemEdit.style.setProperty("display", "block");
	toggleItemEdit.innerHTML = '<img src="images/plus.png" onclick="showAddPrice(' + g_cnt + ',' + i_cnt + ')">';
}

// show top level price edit details
function viewItemDetails(g_cnt, i_cnt, p_cnt) {
	var itemDetails = document.getElementById('itemDetailsTable_' + g_cnt + '_' + i_cnt + '_' + p_cnt );
	var editItemDetails = document.getElementById('editItemDetailsTable_' + g_cnt + '_' + i_cnt + '_' + p_cnt );
	var toggleItemEdit = document.getElementById('toggleItemEdit_' + g_cnt + '_' + i_cnt );

	itemDetails.style.setProperty("display", "table");
	editItemDetails.style.setProperty("display", "none");
	toggleItemEdit.style.setProperty("display", "block");
	toggleItemEdit.innerHTML = '<img src="images/plus.png" onclick="showAddPrice(' + g_cnt + ',' + i_cnt + ',' + p_cnt + ')">';
}
function changeItemDetails(g_cnt, i_cnt, p_cnt) {
	var itemDetails = document.getElementById('itemDetailsTable_' + g_cnt + '_' + i_cnt + '_' + p_cnt );
	var editItemDetails = document.getElementById('editItemDetailsTable_' + g_cnt + '_' + i_cnt + '_' + p_cnt );
	var toggleItemEdit = document.getElementById('toggleItemEdit_' + g_cnt + '_' + i_cnt );

	itemDetails.style.setProperty("display", "none");
	editItemDetails.style.setProperty("display", "table");
	toggleItemEdit.style.setProperty("display", "block");
	toggleItemEdit.innerHTML = '<img src="images/plus.png" onclick="showAddPrice(' + g_cnt + ',' + i_cnt + ',' + p_cnt + ')">';
}
function hideItemDetails(g_cnt, i_cnt, p_cnt) {
	var itemDetails = document.getElementById('itemDetailsTable_' + g_cnt + '_' + i_cnt + '_' + p_cnt );
	var editItemDetails = document.getElementById('editItemDetailsTable_' + g_cnt + '_' + i_cnt + '_' + p_cnt );
	var toggleItemEdit = document.getElementById('toggleItemEdit_' + g_cnt + '_' + i_cnt );

	itemDetails.style.setProperty("display", "table");
	editItemDetails.style.setProperty("display", "none");
	toggleItemEdit.style.setProperty("display", "block");
	toggleItemEdit.innerHTML = '<img src="images/plus.png" onclick="showAddPrice(' + g_cnt + ',' + i_cnt + ',' + p_cnt + ')">';
}

//	
function showDeletePrice(g_cnt, i_cnt, p_cnt) {
// STILL TO BUILD
}

function showAddPrice(g_cnt, i_cnt, p_cnt) {
// STILL TO BUILD
}

// **********

// LOAD SELECT MENU VALUES AND SAMPLE ITEM/PRICE DATA
function populateDB(tx) {
	$('#busy').show();

//  ITEMGROUPS TABLE
	tx.executeSql('DROP TABLE IF EXISTS itemgroups');
	var sql = 
		"CREATE TABLE IF NOT EXISTS itemgroups ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"itemgroup VARCHAR(50))";
    tx.executeSql(sql);
    tx.executeSql("INSERT INTO itemgroups (id,itemgroup) VALUES (0,'grains')");
    tx.executeSql("INSERT INTO itemgroups (id,itemgroup) VALUES (1,'fruit')");
    tx.executeSql("INSERT INTO itemgroups (id,itemgroup) VALUES (2,'vegetables')");
    tx.executeSql("INSERT INTO itemgroups (id,itemgroup) VALUES (3,'protein')");
    tx.executeSql("INSERT INTO itemgroups (id,itemgroup) VALUES (4,'dairy')");
    tx.executeSql("INSERT INTO itemgroups (id,itemgroup) VALUES (5,'beverages')");
    tx.executeSql("INSERT INTO itemgroups (id,itemgroup) VALUES (6,'household')");
    tx.executeSql("INSERT INTO itemgroups (id,itemgroup) VALUES (7,'other')");

//  STORES TABLE
	tx.executeSql('DROP TABLE IF EXISTS stores');
	var sql = 
		"CREATE TABLE IF NOT EXISTS stores ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"store VARCHAR(50))";
    tx.executeSql(sql);
    tx.executeSql("INSERT INTO stores (id,store) VALUES (0,'store')");
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
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (0,'aisle/location')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (1,'aisle 1')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (2,'aisle 2')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (3,'aisle 3')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (4,'aisle 4')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (5,'aisle 5')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (6,'aisle 6')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (7,'aisle 7')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (8,'aisle 8')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (9,'aisle 9')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (10,'aisle 10')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (11,'aisle 11')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (12,'aisle 12')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (13,'aisle 13')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (14,'aisle 14')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (15,'aisle 15')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (16,'aisle 16')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (17,'aisle 17')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (18,'aisle 18')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (19,'aisle 19')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (20,'aisle 20')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (21,'aisle 21')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (22,'bakery')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (23,'dairy')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (24,'deli')");
    tx.executeSql("INSERT INTO aislelocations (id,aislelocation) VALUES (25,'produce')");

//  QUALITIES TABLE
	tx.executeSql('DROP TABLE IF EXISTS qualities');
	var sql = 
		"CREATE TABLE IF NOT EXISTS qualities ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"quality VARCHAR(50))";
    tx.executeSql(sql);
    tx.executeSql("INSERT INTO qualities (id,quality) VALUES (0,'quality')");
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
    tx.executeSql("INSERT INTO kinds (id,kind) VALUES (0,'kind')");
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
    tx.executeSql("INSERT INTO units (id,unit) VALUES (0,'')");
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
		"itemgroup_id INTEGER, " +
		"item VARCHAR(50))";
    tx.executeSql(sql);
    
    
	// GRAINS
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (0,0,'Bagels')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (1,0,'Biscuits')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (2,0,'Bread, French/sourdough')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (3,0,'Bread, wheat')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (4,0,'Bread, white')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (5,0,'Breading/stuffing')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (6,0,'Cereal, ready-to-eat')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (7,0,'Corn grits')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (8,0,'Cornstarch')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (9,0,'Crackers')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (10,0,'English muffins')");
	// FRUIT
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (35,1,'Apple juice')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (36,1,'Apples')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (37,1,'Applesauce')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (38,1,'Apricot')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (39,1,'Apricot juice/nectar')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (40,1,'Banana juice/nectar')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (41,1,'Bananas')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (42,1,'Blackberries')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (43,1,'Blueberries')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (44,1,'Boysenberries')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (45,1,'Cantaloupe')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (46,1,'Cherries')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (47,1,'Cherry juice')");
    tx.executeSql("INSERT INTO items (id,itemgroup_id,item) VALUES (48,1,'Cranberries')");

// PRICES TABLE
	tx.executeSql('DROP TABLE IF EXISTS prices');
	var sql = 
		"CREATE TABLE IF NOT EXISTS prices ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"itemgroup_id INTEGER, " +
		"item_id INTEGER, " +
		"store_id INTEGER, " +
		"aisle_id INTEGER, " +
		"quality_id INTEGER, " +
		"kind_id INTEGER, " +
		"price_date VARCHAR(50), " +
		"price_qty VARCHAR(50), " +
		"unit_id INTEGER, " +
		"price VARCHAR(50))";
    tx.executeSql(sql);
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (0,0,0,0,0,0,0,'4/16/2014',2,0,'.99')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (1,1,100,1,1,1,1,'5/17/2014',4,1,'1.40')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (2,2,200,2,2,2,2,'6/6/2002',6,2,'2.60')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (3,3,300,3,3,3,3,'5/17/2014',8,3,'3.80')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (4,4,400,0,0,0,0,'5/17/2014',2,0,'4.99')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (5,2,200,2,2,2,2,'5/17/2014',6,2,'5.60')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (6,3,300,3,3,3,3,'5/17/2014',8,3,'6.80')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (7,4,400,0,0,0,0,'5/17/2014',2,0,'7.99')");
    
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (8,0,1,0,0,0,0,'5/17/2014',2,0,'8.99')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (9,1,101,1,1,1,1,'5/17/2014',4,1,'9.40')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (10,2,201,2,2,2,2,'5/17/2014',6,2,'10.60')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (11,3,301,3,3,3,3,'5/17/2014',8,3,'11.80')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (12,4,401,0,0,0,0,'5/17/2014',2,0,'12.99')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (13,5,501,5,5,5,5,'5/17/2014',4,1,'13.40')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (14,6,601,2,2,2,2,'5/17/2014',6,2,'14.60')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (15,7,701,3,3,3,3,'5/17/2014',8,3,'15.80')");

    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (16,0,3,0,0,0,0,'5/17/2014',2,0,'16.99')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (17,1,103,1,1,1,1,'5/17/2014',4,1,'17.40')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (18,2,203,2,2,2,2,'5/17/2014',6,2,'18.60')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (19,3,303,3,3,3,3,'5/17/2014',8,3,'19.80')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (20,4,403,0,0,0,0,'5/17/2014',2,0,'20.99')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (21,5,503,5,5,5,5,'5/17/2014',4,1,'21.40')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (22,6,603,2,2,2,2,'5/17/2014',6,2,'22.60')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (23,7,703,3,3,3,3,'5/17/2014',8,3,'23.80')");

    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (24,0,0,0,0,0,0,'5/17/2014',2,0,'24.99')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (25,1,100,1,1,1,1,'5/17/2014',4,1,'25.40')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (26,2,200,2,2,2,2,'5/17/2014',6,2,'26.60')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (27,3,300,3,3,3,3,'5/17/2014',8,3,'27.80')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (28,4,400,0,0,0,0,'5/17/2014',2,0,'28.99')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (29,3,300,3,3,3,3,'5/17/2014',8,3,'29.80')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (30,4,400,0,0,0,0,'5/17/2014',2,0,'30.99')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (31,4,400,0,0,0,0,'5/17/2014',2,0,'31.99')");

    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (32,0,0,0,0,0,0,'5/17/2014',2,0,'32.99')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (33,1,100,1,1,1,1,'5/17/2014',4,1,'33.40')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (34,2,200,2,2,2,2,'5/17/2014',6,2,'34.60')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (35,3,300,3,3,3,3,'5/17/2014',8,3,'35.80')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (36,4,400,0,0,0,0,'5/17/2014',2,0,'36.99')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (37,3,300,3,3,3,3,'5/17/2014',8,3,'37.80')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (38,4,400,0,0,0,0,'5/17/2014',2,0,'38.99')");
    tx.executeSql("INSERT INTO prices (id, itemgroup_id, item_id, store_id, aisle_id, quality_id, kind_id, price_date, price_qty, unit_id, price) VALUES (39,4,400,0,0,0,0,'5/17/2014',2,0,'39.99')");

}
