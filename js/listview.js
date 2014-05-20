$('a').click(function(e){
    e.preventDefault();
    
    var rowdata = "this, that, other';
    var div = '<div data-role="collapsible" data-inset="false" data-iconpos="right"><h3>aa</h3></div>';
  var list =  '<ul data-role="listview" data-theme="b" id="list" />';
    
  var li = '<li><a href="#">data: '+rowdata+'</a></li>';
 list = $(list).append(li);
 
 li = '<li><a href="#">data: '+rowdata+'</a></li>';
 list = $(list).append(li);
       
$(list).appendTo(div).parent().appendTo('[data-role="content"]').end().trigger("create");
$('div[data-role=collapsible]').collapsible({theme:'c',refresh:true});
$('[data-role="listview"]').refresh();
});