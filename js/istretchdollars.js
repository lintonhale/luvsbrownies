$.fn.togglepanels = function(){
  return this.each(function(){
    $(this).addClass("ui-accordion ui-accordion-icons ui-widget ui-helper-reset")
  .find("h3")
    .addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-top ui-corner-bottom")
    .hover(function() { $(this).toggleClass("ui-state-hover"); })
    .prepend('<span class="ui-icon ui-icon-triangle-1-e"></span>')
    .click(function() {
      $(this)
      // Don't toggle category headings color to white when child object is made visible 
      //        .toggleClass("ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom")
        .find("> .ui-icon").toggleClass("ui-icon-triangle-1-e ui-icon-triangle-1-s").end()
        .next().slideToggle();
      return false;
    })
    .next()
      .addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom")
      .hide();
  });
};

$("#notaccordion").togglepanels();

$("#notaccordion").on( "filterablefilter", function( event, ui ) {
    var searchstring = $('#search-input');
    //        alert("?");
//    alert( '"' + searchstring.val() + '"' );
    if ( searchstring.val() == "" ) {
        alert('empty, val= "' + searchstring.val() + '"' );
    } else {
//        alert('text, len ' + searchstring.length + ' val= "' + searchstring.val() + '"' );
        ui.items.each(function( index ) {
            $(this)
//              .toggleClass("ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom")
              .find("> .ui-icon").toggleClass("ui-icon-triangle-1-e ui-icon-triangle-1-s").end()
              .next()
                .slideToggle()
                .addClass("ui-corner-top");
//            $(this).collapsible("option", "collapsed", $(this).hasClass(".ui-accordion")).removeClass("ui-screen-hidden");
        });
    }
        
});
