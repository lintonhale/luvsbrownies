var db;
var dbCreated = false;
//var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

// onDeviceReady();  NOT YET TESTING DATABASE FUNCTION IN THIS VERSION

function onDeviceReady() {
    db = window.openDatabase("iStretchDollarsDB", "1.0", "iStretchDollars", 200000);
    if (dbCreated)
    	db.transaction(getitemsdata, transaction_error);
    else
    	db.transaction(populateDB, transaction_error, populateDB_success);
}

function transaction_error(tx, error) {
	$('#busy').hide();
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

// now go and do something with the data...?  maybe don't loaddata() from the <body>, but instead call here after populating data?

//	setTimeout(function(){
//		scroll.refresh();
//	},100);
	db = null;
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
}

function loadData() {
	$('#formfields_container').append('<ul id="fieldset-0" data-role="listview" data-theme="e" data-content-theme="d" data-inset="false" data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u"></ul>').trigger("create");

	$('#fieldset-0').append('<li data-role="fieldcontain">');
	
	****************  LOOK UP EXAMPLE OF LI + FIELDSET APPEND **************
		'<fieldset data-role="controlgroup">' +
	    '<legend>Sex Toys</legend>' +
		'<table width="100%"><tbody><tr>' +
		'<td width="95%"><input type="checkbox" name="checkbox-1-a" id="checkbox-1-a">' + 
		'<label for="checkbox-1-a">Dildo</label></td>' +
		'<td id="toggleItemDetails"><img src="images/arrow-d.png" onclick="showItem()"></td></tr>' +
		'<tr><td><table width="95%" id="itemDetailsTable" class="itemDetails" border="0" onclick="editItemDetails()"><tbody>' +
		'<tr><td colspan="4">Community Market, Aisle 6</td></tr>' +
		'<tr><td colspan="4">organic, boiled</td></tr>' +
		'<tr><td>5/17/14</td><td>12 oz</td><td>$2.40</td><td class="price-per">$0.20/oz</td></tr>' +
		'</tbody></table>' +
		'<table width="95%" id="editItemDetailsTable" class="editItemDetails" border="0"><tbody><tr><td colspan="3">' +
		'<select name="store-select" id="store-select" class="selectmenu">' +
		'<option value="0">Store</option>' +
		'<option value="1">Andys Market</option>' +
		'<option value="2">Community Market</option>' +
		'</select></td></tr>' +
		'<tr><td colspan="3"><select name="aisle-select" id="aisle-select" class="selectmenu">' +
		'<option value="0">Aisle/location</option>' +
		'<option value="1">Aisle 1</option>' +
		'<option value="2">Aisle 2</option>' +
		'<option value="3">Produce</option>' +
		'</select></td></tr>' +
		'<tr><td colspan="3"><select name="quality-select" id="quality-select" class="selectmenu">' +
		'<option value="0">Quality</option>' +
		'<option value="1">conventional</option>' +
		'<option value="2">gluten free</option>' +
		'</select></td></tr>' +
		'<tr><td colspan="3"><select name="kind-select" id="kind-select" class="selectmenu">' +
		'<option value="0">Kind</option>' +
		'<option value="1">all-purpose</option>' +
		'<option value="2">baked</option>' +
		'</select></td></tr>' +
		'<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<b>Date:</b></td>' +
		'<td colspan="2"><input id="price-date" type="date" name="date" value="mm/dd/yyyy" /></td></td></tr>' +
		'<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<b>Qty:</b></td>' +
		'<td><input id="item-qty-1-a" type="number" step="0.01" name="txtbox[]" size="5" class="textbox"></td>' +
		'<td><select name="unit-select" id="unit-select" class="selectmenu">' +
		'<option value="0">Unit</option>' +
		'<option value="1">dozen</option>' +
		'<option value="2">oz</option>' +
		'<option value="3">lb</option>' +
		'</select></td></tr>' +
		'<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<b>Price:</b></td>' +
		'<td class="price"><input id="price-1-a" type="number" step="0.01" name="txtbox[]" size="8"  class="textbox"></td>' +
		'<td class="price-per">$0.20/oz</td>' +
		'</tr></tbody></table>' +
		'</td><td VALIGN="TOP" id="toggleItemEdit" class="toggleItemEdit"><img src="images/edit.png" onclick="editItemDetails()"><br><img src="images/plus.png" onclick="">  <!-- showAddPrice()">   -->' +
		'</td></tr>' +
		'<tr><td><input type="checkbox" name="checkbox-2-a" id="checkbox-2-a"><label for="checkbox-2-a">Vibrator</label></td>' +
		'<td><img src="images/arrow-d.png"></td></tr>' +
		'<tr><td><input type="checkbox" name="checkbox-3-a" id="checkbox-3-a"><label for="checkbox-3-a">Flavored condoms</label></td><td><img src="images/arrow-d.png"></td></tr>' +
		'<tr><td width="90%"><input type="checkbox" name="checkbox-4-a" id="checkbox-4-a"><label for="checkbox-4-a">Lubrication</label></td>' +
		'<td><img src="images/arrow-d.png"></td></tr>' +
		'</table></fieldset></li>').listview("refresh");
	
	//</fieldset>' +
	//	'<fieldset data-role="collapsible" data-theme="e" data-content-theme="d" data-inset="false" data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u">' +
	//	'<legend>Fruit</legend><div >' +
	//	'<table width="100%"><tr>' +
	//	'<td width="90%"><input type="checkbox" name="checkbox-1-a" id="checkbox-1-a"><label for="checkbox-1-a">Bananas</label></td>' +
	//	'<td><img src="images/arrow-d.png"></td></tr>' +
	//	'<tr><td><input type="checkbox" name="checkbox-2-a" id="checkbox-2-a"><label for="checkbox-2-a">Oranges</label></td>' +
	//	'<td><img src="images/arrow-d.png"></td></tr>' +
	//	'<tr><td><input type="checkbox" name="checkbox-3-a" id="checkbox-3-a"><label for="checkbox-3-a">Rhubarb</label></td>' +
	//	'<td><img src="images/arrow-d.png"></td></tr>' +
	//	'</table></div>

	db = null;
}

// hide or show top level price details
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

// hide or show top level price edit details
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

//	when viewing price show "plus" sign to add new price, else when editing show "minus" sign to delete this price
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
