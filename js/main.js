var app = {

	renderHomeView: function() {
	    $('body').html(this.homeTpl());
	    $('.search-key').on('keyup', $.proxy(this.findByName, this));
	},

	showAlert: function (message, title) {
	    if (navigator.notification) {
	        navigator.notification.alert(message, null, title, 'OK');
	    } else {
	        alert(title ? (title + ": " + message) : message);
	    }
	},
	
findByName: function() {
    var self = this;
    this.store.findByName($('.search-key').val(), function(employees) {
        $('.employee-list').html(self.employeeLiTpl(employees));
    });
},
//    findByName: function() {
//        console.log('findByName');
//        this.store.findByName($('.search-key').val(), function(employees) {
//            var l = employees.length;
//            var e;
//            $('.employee-list').empty();
//            for (var i=0; i<l; i++) {
//                e = employees[i];
//                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
//            }
//        });
//    },

	initialize: function() {
	    var self = this;
	    this.store = new MemoryStore(function() {
	        self.renderHomeView();
	    });
	    this.homeTpl = Handlebars.compile($("#home-tpl").html());
	    this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
	}

};

app.initialize();