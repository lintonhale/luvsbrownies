            //Create a new Item
            function createNewItem()
            {
                var itemDictionary = {};
                
// LINTON TESTING
                var item="";
                //Append the new Item with the table
                itemDictionary = { check : 0 , text1 : "", text2 : "", text3 : "", text4: ""};
                addTableRow(itemDictionary,false);

//                //Prompt the user to enter Item
//                var item=prompt("Enter new item","");
//                if (item!=null)
//                {
//                    if (item == "")
//                    {
//                        alert("Item can't be empty!");
//                    }
//                    else
//                    {
//                        //Append the new Item with the table
//                        itemDictionary = { check : 0 , text : item};
//                        addTableRow(itemDictionary,false);
//                    }
//                }

                
            }
            
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
                
                //Set up Item TextBox
                var cell2 = row.insertCell(1);
                var element2 = document.createElement("input");
                element2.type = "text";
                element2.name = "txtbox[]";
                element2.size = 24;
                element2.id = "text"+rowID;
                element2.value = itemDictionary["text1"];
                element2.setAttribute("onchange","saveItemList()");
                element2.className = "textbox";
                cell2.appendChild(element2);

                //Set up Size TextBox 
                var cell3 = row.insertCell(2);
                var element3 = document.createElement("input");
                element3.type = "text";
                element3.name = "txtbox[]";
                element3.size = 4;
                element3.id = "text"+rowID;
                element3.value = itemDictionary["text2"];
                element3.setAttribute("onchange","saveItemList()");
                element3.className = "textbox";
                cell3.appendChild(element3);

                //Set up Unit of Measure TextBox 
                var cell4 = row.insertCell(3);
                var element4 = document.createElement("input");
                element4.type = "text";
                element4.name = "txtbox[]";
                element4.size = 4;
                element4.id = "text"+rowID;
                element4.value = itemDictionary["text3"];
                element4.setAttribute("onchange","saveItemList()");
                element4.className = "textbox";
                cell4.appendChild(element4);

                //Set up Price TextBox 
                var cell5 = row.insertCell(4);
                var element5 = document.createElement("input");
                element5.type = "text";
                element5.name = "txtbox[]";
                element5.size = 5;
                element5.id = "text"+rowID;
                element5.value = itemDictionary["text4"];
                element5.setAttribute("onchange","saveItemList()");
                element5.className = "textbox";
                cell5.appendChild(element5);
                
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
                    var textbox = row.cells[1].childNodes[0];
                    var textbox2 = row.cells[2].childNodes[0];
                    var textbox3 = row.cells[3].childNodes[0];
                    var textbox4 = row.cells[4].childNodes[0];
                    
                    //checkbox is checked
                    if(null != chkbox && true == chkbox.checked)
                    {
                        if(null != textbox)
                        {		
                            textbox.style.setProperty("text-decoration", "line-through");
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
                    }
                    
                    //checkbox is not checked
                    else
                    {
                        textbox.style.setProperty("text-decoration", "none");
                        textbox2.style.setProperty("text-decoration", "none");
                        textbox3.style.setProperty("text-decoration", "none");
                        textbox4.style.setProperty("text-decoration", "none");
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
                alert("Selected Items Were Removed Successfully.");
                
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
                        textValue1 = textbox1.value;
                        textValue2 = textbox2.value;
                        textValue3 = textbox3.value;
                        textValue4 = textbox4.value;
                        
                        //Fill the array with check & text data
                        itemArray["row"+i] =
                        {
                            check : checkBoxState,
                            text1 : textValue1,
                            text2 : textValue2,
                            text3 : textValue3,
                            text4 : textValue4
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
