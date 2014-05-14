            //Create a new Item
            function createNewItem()
            {
                var itemDictionary = {};
//                var item="";
                //Append the new Item with the table
                itemDictionary = { check : 0 , text1 : "", text2 : "-size-", text3 : "", text4: "-price-", text5: ""};
                addTableRow(itemDictionary,false);
            }

            //Add the header row to the table
//            function addTableHeader()
//            {
//                var table = document.getElementById("dataTable");
//                var row = table.insertRow(0);
//				var cell1 = row.insertCell(0);
//				var cell2 = row.insertCell(1);
//				var cell3 = row.insertCell(2);
//				var cell4 = row.insertCell(3);
//				cell1.innerHTML = "Qtty";
//				cell2.innerHTML = "Size";
//				cell3.innerHTML = "Unit";
//				cell4.innerHTML = "Price";
//               
//                //Save & Update UI
//                checkboxClicked();
//            }

            
            //Add a row to the table
            var rowID = 0;
            function addTableRow(itemDictionary, appIsLoading)
            {
                
                rowID +=1;
                var table = document.getElementById("dataTable");
                var rowCount = table.rows.length;
                var row = table.insertRow(rowCount);
                
                //Set up the CheckBox
                var cell1 = row.insertCell(0);
                var element1 = document.createElement("input");
                element1.type = "checkbox";
                element1.name="chkbox[]";
                element1.checked = itemDictionary["check"];
                element1.setAttribute("onclick","checkboxClicked()");
                element1.className = "checkbox";
                cell1.appendChild(element1);
                
                //Set up Item select drop-down
				// create select
                var cell2 = row.insertCell(1);
                var element2 = document.createElement("select");
				element2.setAttribute("name", "mySelect");
				element2.setAttribute("id", "mySelect");
				element2.style.width = "130px";
				// setting an onchange event
				element2.onchange = function() {saveItemList()};			 
				var option;
				// create options elements
                //fooditems list for select field
				var fooditems_for_select = ['-Choose item-','Alfalfa sprouts','Almonds','Anchovy','Apple juice','Apples','Applesauce','Apricot','Apricot juice','Apricot, dried','Artichokes','Arugula lettuce','Asparagus','Avocado','Bagels','Bamboo Shoots','Banana chips','Banana juice','Bananas','Beans, green','Beef','Beef, ground','Beer','Beets','Biscuits','Black beans','Blackberries','Blackeye peas','Blueberries','Bok choy (Chinese cabbage)','Boysenberries','Brazil nuts','Bread, French/Sourdough','Bread, white','Bread, rye','Bread, whole wheat','Breading/stuffing','Breakfast cereal','Breakfast/Granola bars','Broccoli','Brussels sprouts','Cabbage, green','Cabbage, red (radicchio)','Cactus (nopales)','Cantaloupe','Carp','Carrot juice','Carrots','Cashew nuts','Cassava (tapioca)','Catfish','Cauliflower (broccoflower)','Celery','Chard (incudes escarole)','Cheese spreads, dips','Cheese, American','Cheese, cheddar','Cheese, mozzarella','Cheese, Swiss','Cherries','Cherry juice','Chestnuts','Chicken','Chickpeas','Chives','Clams','Cod','Collard greens','Coriander (cilantro)','Corn','Corn grits','Cornstarch','Cottage cheese','Cowpeas','Crab','Crackers','Cranberries','Cranberry juice','Crayfish','Croaker','Cucumber','Dates','Eggplant','Eggs','English muffins','Fava beans','Figs','Figs, dried','Filberts/hazelnuts','Fish sticks','Flax seeds','Flounder','Flour','French fries','Frog','Frozen yogurt/sherbet','Garlic','Ginger','Grape juice','Grape leaves','Grapefruit','Grapefruit juice','Grapes','Green peas','Guava','Guava juice','Haddock','Halibut','Ham/Pork, cured','Hamburger buns','Herring','Home fries/hash browns','Honeydew melon','Horseradish','Hotdog','Hotdog rolls','Ice cream','Japanese pears','Kale','Kidney beans','Kiwifruit','Lamb','Leeks','Lemon juice','Lemons','Lentils','Lettuce','Lima beans','Lime','Lime juice','Liver','Lobster','Luncheon meat, beef','Luncheon meat, poultry','Lychee','Macadamia nuts','Macaroni and cheese','Mackerel','Mango','Mango juice','Meal supplements','Milk, chocolate','Milk, cow','Milk, evaporated','Milk, goat','Milk, sheep','Mixed fruit juice','Mixed nuts','Mullet','Mung beans','Mushrooms','Mussels','Mustard greens','Nectarine','Oatmeal','Octopus/squid','Okra','Olives','Onions','Orange juice','Oranges','Oysters','Papaya','Papaya juice','Parsley','Passion fruit juice','Pasta, macaroni','Pasta, spaghetti','Pasta, whole grain','Pasta, ziti','Peach juice','Peaches','Peanut butter','Peanuts','Pear juice','Pears','Peas/Snowpeas','Pecans','Peppers, green bell','Peppers, hot chili','Peppers, red bell','Perch','Persimmons','Pickles, cucumber','Pie crust','Pike','Pine nuts','Pineapple','Pineapple juice','Pinto beans','Pistachio nuts','Pita bread','Pizza','Plantains','Plums','Pomegranate','Pompano','Popcorn','Porgy','Pork, fresh','Potato chips','Potato flour','Potatoes','Pretzels','Prune juice','Prunes','Pumpkin','Pumpkin seeds','Quick bread/Pancakes','Radishes','Raisins, seedless','Raspberries','Rhubarb','Rice, brown','Rice, white','Roe','Salmon','Sardines','Scallions','Scallops','Sea bass','Seaweed, wakame','Sesame seeds','Shark','Shrimp','Smelt','Snails','Snapper','Soybeans/Edamame','Soymilk','Spinach','Split peas','Squash, summer','Squash, winter','Star fruit (carambola)','Strawberries','Sunflower seeds','Sweet potatoes/Yams','Sweets/Cookies','Swordfish','Tamarind','Tangerine','Tofu','Tomatillos','Tomato juice','Tomato sauce/marinara','Tomatoes','Tortilla chips','Tortilla, corn','Tortilla, wheat flour','Trout','Tuna-high Omega 3','Tuna-low Omega 3','Turkey','Turnip greens','Turnips','Turtle/terrapin','Veggie burgers','Walnuts','Waterchestnuts','Watercress','Watermelon','White beans','Whiting','Whole grain rolls','Yogurt'];
                //Loop through all rows
                for(var cnt=0; cnt<fooditems_for_select.length; cnt++)
                {
					option = document.createElement("option");
					option.setAttribute("value", cnt);
					option.innerHTML = fooditems_for_select[cnt];
					element2.appendChild(option);
                }
                element2.type = "text";
                element2.name = "txtbox[]";
                element2.id = "text"+rowID;
                element2.value = itemDictionary["text1"];
                element2.className = "textbox";
                cell2.appendChild(element2);


                //Set up foodstandards select drop-down
				// create select
                var cell3 = row.insertCell(2);
                var element3 = document.createElement("select");
				element3.setAttribute("name", "mySelect");
				element3.setAttribute("id", "mySelect");
				element3.style.width = "105px";
				// setting an onchange event
				element3.onchange = function() {saveItemList()};			 
				var option;
				// create options elements
                //foodstandards list for select field
				var foodstandards_for_select = ['','Conventional','Gluten-free','Natural','No antibiotics','No nitrites','GMO-free','Organic','Vegan'];
                //Loop through all rows
                for(var cnt=0; cnt<foodstandards_for_select.length; cnt++)
                {
					option = document.createElement("option");
					option.setAttribute("value", cnt);
					option.innerHTML = foodstandards_for_select[cnt];
					element3.appendChild(option);
                }
                element3.type = "text";
                element3.name = "txtbox[]";
                element3.id = "text"+rowID;
                element3.value = itemDictionary["text2"];
                element3.className = "textbox_standards";
                cell3.appendChild(element3);

                //Set up Item Size TextBox 
                var cell4 = row.insertCell(3);
                var element4 = document.createElement("input");
                element4.type = "number";
                element4.name = "txtbox[]";
                element4.size = 3;
                element4.id = "text"+rowID;
                element4.value = itemDictionary["text3"];
				// setting an onchange event
				element4.onchange = function() {saveItemList()};			 
//                element4.setAttribute("onchange","saveItemList()");
                element4.className = "textbox";
                cell4.appendChild(element4);

                //Set up Unit of Measure select drop-down 
				// create select
                var cell5 = row.insertCell(4);
                var element5 = document.createElement("select");
				element5.setAttribute("name", "mySelect");
				element5.setAttribute("id", "mySelect");
				element5.style.width = "68px";
				// setting an onchange event
				element5.onchange = function() {saveItemList()};			 
				var option;
				// create options elements
                //foodstandards list for select field
				var units_of_measure_for_select = ['','each','oz','lb','fl oz','pt','qt','gal','6 pack','case'];
                //Loop through all rows
                for(var cnt=0; cnt<units_of_measure_for_select.length; cnt++)
                {
					option = document.createElement("option");
					option.setAttribute("value", cnt);
					option.innerHTML = units_of_measure_for_select[cnt];
					element5.appendChild(option);
                }
                element5.type = "text";
                element5.name = "txtbox[]";
                element5.id = "text"+rowID;
                element5.value = itemDictionary["text4"];
                element5.className = "textbox";
                cell5.appendChild(element5);
				
                //Set up Price TextBox 
                var cell6 = row.insertCell(5);
                var element6 = document.createElement("input");
                element6.type = "number";
                element6.name = "txtbox[]";
                element6.size = 4;
                element6.id = "text"+rowID;
                element6.value = itemDictionary["text5"];
				// setting an onchange event
				element6.onchange = function() {saveItemList()};			 
//                element6.setAttribute("onchange","saveItemList()");
                element6.className = "textbox";
                cell6.appendChild(element6);



//  // create a new div element 
//  // and give it some content 
//  var newDiv = document.createElement("div"); 
//  var newContent = document.createTextNode("Hi there and greetings!"); 
//  newDiv.appendChild(newContent); //add the text node to the newly created div. 
//  // add the newly created element and its content into the DOM 
//  my_div = document.getElementById("org_div1"); 
//  document.body.insertBefore(newDiv, my_div); 

                //Set up calculated price-per-unit TextBox 
                var cell7 = row.insertCell(6);
                var element7 = document.createElement("input");
                element7.editable = "false";
                element7.type = "text";
                element7.name = "txtbox[]";
                element7.size = 5;
                element7.id = "text"+rowID;
                
                  if( itemDictionary["text3"] == "" || itemDictionary["text4"] == "" || itemDictionary["text5"] == "" )  // unit of measure value is EMPTY, so do not calculate price-per-unit
                    {
		                element7.value = "";                       
                    }
                  if( (itemDictionary["text4"] == 0 || itemDictionary["text4"] == 1 || itemDictionary["text4"] == 2) && itemDictionary["text3"] != "" &&  itemDictionary["text5"] != "")  // unit of measure = '', 'ea', 'oz', one to one, no calculation needed
                    {
		                element7.value = '$' + parseFloat(itemDictionary["text5"]/itemDictionary["text3"]).toFixed(2) + '/oz';              
                    }
                  if( itemDictionary["text4"] == 3 && itemDictionary["text3"] != "" &&  itemDictionary["text5"] != "")  // unit of measure = 'lb', so divide 1 lb by 16 to get price per oz
                    {
		                element7.value = '$' + parseFloat(itemDictionary["text5"]/16/itemDictionary["text3"]).toFixed(2) + '/oz';              
                    }
                  if( itemDictionary["text4"] == 4 && itemDictionary["text3"] != "" &&  itemDictionary["text5"] != "")  // unit of measure = 'fl oz', one to one, no calculation needed
                    {
		                element7.value = '$' + parseFloat(itemDictionary["text5"]/itemDictionary["text3"]).toFixed(2) + '/fl oz';              
                    }
                  if( itemDictionary["text4"] == 5 && itemDictionary["text3"] != "" &&  itemDictionary["text5"] != "")  // unit of measure = 'pt', so divide 1 pt by 16 to get price per fl oz
                    {
		                element7.value = '$' + parseFloat(itemDictionary["text5"]/16/itemDictionary["text3"]).toFixed(2) + '/fl oz';              
                    }
                  if( itemDictionary["text4"] == 6 && itemDictionary["text3"] != "" &&  itemDictionary["text5"] != "")  // unit of measure = 'qt, so divide 1 qt by 32 to get price per fl oz
                    {
		                element7.value = '$' + parseFloat(itemDictionary["text5"]/32/itemDictionary["text3"]).toFixed(2) + '/fl oz';              
                    }
                  if( itemDictionary["text4"] == 7 && itemDictionary["text3"] != "" &&  itemDictionary["text5"] != "")  // unit of measure = 'gal', so divide 1 pt by 64 to get price per fl oz
                    {
		                element7.value = '$' + parseFloat( itemDictionary["text5"] / 64 /itemDictionary["text3"] ).toFixed(2) + '/fl oz';              
                    } 
                  if( (itemDictionary["text4"] == 8 || itemDictionary["text4"] == 9) && itemDictionary["text3"] != "" &&  itemDictionary["text5"] != "")  // unit of measure = '6 pack' or "case", no calculation needed
                    {
		                element7.value = '$' + parseFloat(itemDictionary["text5"]/itemDictionary["text3"]).toFixed(2) + 'ea';              
                    }

                element7.setAttribute("onchange","saveItemList()");
                element7.className = "textbox";
                cell7.appendChild(element7);

                
//                //Set up the View Button
//                var cell3 = row.insertCell(2);
//                var element3 = document.createElement("input");
//                element3.type = "button";
//                element3.id = rowID;
//                element3.setAttribute("onclick","viewSelectedRow(document.getElementById('text'+this.id))");
//                element3.className = "viewButton";
//                cell3.appendChild(element3);
//                
//                //Set up the Delete Button
//                var cell4 = row.insertCell(3);
//                var element4 = document.createElement("input");
//                element4.type = "button";
//              
//                element4.setAttribute("onclick","deleteSelectedRow(this)");
//                element4.className = "deleteButton";
//                cell4.appendChild(element4);
                
                //Save & Update UI
                checkboxClicked();
                saveItemList();
                
//                if (!appIsLoading)
//                alert("Item Added Successfully.");
            }
                     
            //Add stroke to selected items text
            function checkboxClicked()
            {
                
                //Get current table
                var table = document.getElementById("dataTable");
                var rowCount = table.rows.length;
                
                //Loop through all rows
                for(var i=0; i<rowCount; i++)
                {
                    var row = table.rows[i];
                    var chkbox = row.cells[0].childNodes[0];
                    var textbox1 = row.cells[1].childNodes[0];
                    var textbox2 = row.cells[2].childNodes[0];
                    var textbox3 = row.cells[3].childNodes[0];
                    var textbox4 = row.cells[4].childNodes[0];
                    var textbox5 = row.cells[5].childNodes[0];
                    
                    //checkbox is checked
                    if(null != chkbox && true == chkbox.checked)
                    {
                        if(null != textbox1)
                        {		
                            textbox1.style.setProperty("text-decoration", "line-through");
                        }
                        if(null != textbox2)
                        {		
                            textbox2.style.setProperty("text-decoration", "line-through");
                        }
                        if(null != textbox3)
                        {		
                            textbox3.style.setProperty("text-decoration", "line-through");
                        }
                        if(null != textbox4)
                        {		
                            textbox4.style.setProperty("text-decoration", "line-through");
                        }
                        if(null != textbox5)
                        {		
                            textbox5.style.setProperty("text-decoration", "line-through");
                        }
                    }
                    
                    //checkbox is not checked
                    else
                    {
                        textbox1.style.setProperty("text-decoration", "none");
                        textbox2.style.setProperty("text-decoration", "none");
                        textbox3.style.setProperty("text-decoration", "none");
                        textbox4.style.setProperty("text-decoration", "none");
                        textbox5.style.setProperty("text-decoration", "none");
                    }
                    
                }
                //Save
                saveItemList();
            }
                    
            //Views textField's content of the selected row
            function viewSelectedRow(itemTextField)
            {
                alert(itemTextField.value);
            }
            
            
            //Deletes current row
            function deleteSelectedRow(deleteButton)
            {
                var p=deleteButton.parentNode.parentNode;
                p.parentNode.removeChild(p);
                saveItemList();
            }
                   
            function removeSelectedItems()
            {
                //Get current table
                var table = document.getElementById("dataTable");
                var rowCount = table.rows.length;
                
                //Loop through all rows
                for(var i=0; i<rowCount; i++)
                {
                    //Delete row if checkbox is checked
                    var row = table.rows[i];
                    var chkbox = row.cells[0].childNodes[0];
                    if(null != chkbox && true == chkbox.checked)
                    {
                        table.deleteRow(i);
                        rowCount--;
                        i--;
                    }                   
                }
                
                //Save
                saveItemList();
//                alert("Selected Items Were Removed Successfully.");               
            }
            
            function saveItemList()
            {
                //Create a itemArray
                var itemArray = {};
                var checkBoxState = 0;
                var textValue = "";
                
                //Get current table
                var table = document.getElementById("dataTable");
                var rowCount = table.rows.length;

                if (rowCount != 0)
                {
                    //Loop through all rows
                    for(var i=0; i<rowCount; i++)
                    {
                        var row = table.rows[i];
                        
                        //Add checkbox state
                        var chkbox = row.cells[0].childNodes[0];
                        if(null != chkbox && true == chkbox.checked)
                        {
                            checkBoxState = 1;
                        }
                        else
                        {
                            checkBoxState= 0;
                        }
                     
                        //Add text data
                        var textbox1 = row.cells[1].childNodes[0];
                        var textbox2 = row.cells[2].childNodes[0];
                        var textbox3 = row.cells[3].childNodes[0];
                        var textbox4 = row.cells[4].childNodes[0];
                        var textbox5 = row.cells[5].childNodes[0];
                        textValue1 = textbox1.value;
                        textValue2 = textbox2.value;
                        textValue3 = textbox3.value;
                        textValue4 = textbox4.value;
                        textValue5 = textbox5.value;
                        
                        //Fill the array with check & text data
                        itemArray["row"+i] =
                        {
                            check : checkBoxState,
                            text1 : textValue1,
                            text2 : textValue2,
                            text3 : textValue3,
                            text4 : textValue4,
                            text5 : textValue5
                        };

                    }
                }
                else
                {
                    itemArray = null;
                }
                
                //Use local storage to persist data
                //We use JSON to preserve objects            
                window.localStorage.setItem("itemList", JSON.stringify(itemArray));
            }
            
            function loadItemList()
            {
          
                //Get the saved Item list array by JSON parsing localStorage
                var theList = JSON.parse(window.localStorage.getItem("itemList"));
                
                
                if (null == theList || theList=="null")
                {
                    deleteAllRows();
                }
                else
                {
                    var count = 0;
                    for (var obj in theList)
                    {
                        count++;
                    }
                    
                    //Clear table
                    deleteAllRows();

//					//Add table header
//                    addTableHeader();
		
//					//IF no records THEN add one empty row.
//                    if count = 0
//                      createNewItem();

                    //Loop through all rows
                    for(var i=0; i<count; i++)
                    {
                        //Add row
                        addTableRow(theList["row"+i],true);
                    }
                    
                }
           
            }
            
            function deleteAllRows()
            {
                //Get current table
                var table = document.getElementById("dataTable");
                var rowCount = table.rows.length;
                
                //Loop through all rows
                for(var i=0; i<rowCount; i++)
                {
                    //delete row
                    table.deleteRow(i);
                    rowCount--;
                    i--;
                }
                
                //Save
                saveItemList();
            }
