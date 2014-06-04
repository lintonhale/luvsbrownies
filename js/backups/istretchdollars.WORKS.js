var db;
var dbCreated = false;

// var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

// onDeviceReady();

function loadData() {

	$('#mainform').append('<fieldset data-role="collapsible" data-theme="e" data-content-theme="d" data-inset="false" data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u">');
	$('#mainform').append('<legend>Grains</legend>');
	$('#mainform').append('<table width="100%"><tbody><tr>');
	$('#mainform').append('<td width="95%"><input type="checkbox" name="checkbox-1-a" id="checkbox-1-a"><label for="checkbox-1-a">Bagels</label></td>');
	$('#mainform').append('<td id="toggleItemDetails"><img src="images/arrow-d.png" onclick="showItem()"></td></tr>');
	$('#mainform').append('<tr><td><table width="95%" id="itemDetailsTable" class="itemDetails" border="0" onclick="editItemDetails()"><tbody>');
	$('#mainform').append('<tr><td colspan="4">Community Market, Aisle 6</td></tr>');
	$('#mainform').append('<tr><td colspan="4">organic, boiled</td></tr>');
	$('#mainform').append('<tr><td>5/17/14</td><td>12 oz</td><td>$2.40</td><td class="price-per">$0.20/oz</td></tr>');
	$('#mainform').append('</tbody></table>');
	$('#mainform').append('<table width="95%" id="editItemDetailsTable" class="editItemDetails" border="0"><tbody><tr><td colspan="3">');
	$('#mainform').append('<select name="store-select" id="store-select" class="selectmenu">');
	$('#mainform').append('<option value="0">Store</option>');
	$('#mainform').append('<option value="1">Andys Market</option>');
	$('#mainform').append('<option value="2">Community Market</option>');
	$('#mainform').append('</select></td></tr>');
	$('#mainform').append('<tr><td colspan="3"><select name="aisle-select" id="aisle-select" class="selectmenu">');
	$('#mainform').append('<option value="0">Aisle/location</option>');
	$('#mainform').append('<option value="1">Aisle 1</option>');
	$('#mainform').append('<option value="2">Aisle 2</option>');
	$('#mainform').append('<option value="3">Produce</option>');
	$('#mainform').append('</select></td></tr>');
	$('#mainform').append('<tr><td colspan="3"><select name="quality-select" id="quality-select" class="selectmenu">');
	$('#mainform').append('<option value="0">Quality</option>');
	$('#mainform').append('<option value="1">conventional</option>');
	$('#mainform').append('<option value="2">gluten free</option>');
	$('#mainform').append('</select></td></tr>');
	$('#mainform').append('<tr><td colspan="3"><select name="kind-select" id="kind-select" class="selectmenu">');
	$('#mainform').append('<option value="0">Kind</option>');
	$('#mainform').append('<option value="1">all-purpose</option>');
	$('#mainform').append('<option value="2">baked</option>');
	$('#mainform').append('</select></td></tr>');
	$('#mainform').append('<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<b>Date:</b></td>');
	$('#mainform').append('<td colspan="2"><input id="price-date" type="date" name="date" value="mm/dd/yyyy" /></td></td></tr>');
	$('#mainform').append('<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<b>Qty:</b></td>');
	$('#mainform').append('<td><input id="item-qty-1-a" type="number" step="0.01" name="txtbox[]" size="5" class="textbox"></td>');
	$('#mainform').append('<td><select name="unit-select" id="unit-select" class="selectmenu">');
	$('#mainform').append('<option value="0">Unit</option>');
	$('#mainform').append('<option value="1">dozen</option>');
	$('#mainform').append('<option value="2">oz</option>');
	$('#mainform').append('<option value="3">lb</option>');
	$('#mainform').append('</select></td></tr>');
	$('#mainform').append('<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<b>Price:</b></td>');
	$('#mainform').append('<td class="price"><input id="price-1-a" type="number" step="0.01" name="txtbox[]" size="8"  class="textbox"></td>');
	$('#mainform').append('<td class="price-per">$0.20/oz</td>');
	$('#mainform').append('</tr></tbody></table>');
	$('#mainform').append('</td><td VALIGN="TOP" id="toggleItemEdit" class="toggleItemEdit"><img src="images/edit.png" onclick="editItemDetails()"><br><img src="images/plus.png" onclick="">  <!-- showAddPrice()">   -->');
	$('#mainform').append('</td></tr>');
	$('#mainform').append('<tr><td><input type="checkbox" name="checkbox-2-a" id="checkbox-2-a"><label for="checkbox-2-a">Biscuits</label></td>');
	$('#mainform').append('<td><img src="images/arrow-d.png"></td></tr>');



	$('#mainform').append('<tr><td><input type="checkbox" name="checkbox-3-a" id="checkbox-3-a"><label for="checkbox-3-a">Bread</label></td><td><img src="images/arrow-d.png"></td></tr>');
	$('#mainform').append('<tr><td width="90%"><input type="checkbox" name="checkbox-4-a" id="checkbox-4-a"><label for="checkbox-4-a">Breading/stuffing</label></td>');
	$('#mainform').append('<td><img src="images/arrow-d.png"></td></tr>');
	$('#mainform').append('</table></div></fieldset>');
	$('#mainform').append('<fieldset data-role="collapsible" data-theme="e" data-content-theme="d" data-inset="false" data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u">');
	$('#mainform').append('<legend>Fruit</legend><div >');
	$('#mainform').append('<table width="100%"><tr>');
	$('#mainform').append('<td width="90%"><input type="checkbox" name="checkbox-1-a" id="checkbox-1-a"><label for="checkbox-1-a">Bananas</label></td>');
	$('#mainform').append('<td><img src="images/arrow-d.png"></td></tr>');
	$('#mainform').append('<tr><td><input type="checkbox" name="checkbox-2-a" id="checkbox-2-a"><label for="checkbox-2-a">Oranges</label></td>');
	$('#mainform').append('<td><img src="images/arrow-d.png"></td></tr>');
	$('#mainform').append('<tr><td><input type="checkbox" name="checkbox-3-a" id="checkbox-3-a"><label for="checkbox-3-a">Rhubarb</label></td>');
	$('#mainform').append('<td><img src="images/arrow-d.png"></td></tr>');
	$('#mainform').append('</table></div></fieldset>');

//	setTimeout(function(){
//		scroll.refresh();
//	},100);
	db = null;
}

