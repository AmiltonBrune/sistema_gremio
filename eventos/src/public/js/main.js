(function () {
	"use strict";

	var treeviewMenu = $('.app-menu');

	// Toggle Sidebar
	$('[data-toggle="sidebar"]').click(function(event) {
		event.preventDefault();
		$('.app').toggleClass('sidenav-toggled');
	});

	// Activate sidebar treeview toggle
	$("[data-toggle='treeview']").click(function(event) {
		event.preventDefault();
		if(!$(this).parent().hasClass('is-expanded')) {
			treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
		}
		$(this).parent().toggleClass('is-expanded');
	});

	// Set initial active toggle
	$("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');

	//Activate bootstrip tooltips
	$("[data-toggle='tooltip']").tooltip();

})();

$(function() {
	$('.material-card > .mc-btn-action').click(function () {
		var card = $(this).parent('.material-card');
		var icon = $(this).children('i');
		icon.addClass('fa-spin-fast');

		if (card.hasClass('mc-active')) {
			card.removeClass('mc-active');

			window.setTimeout(function() {
				icon
					.removeClass('fa-arrow-left')
					.removeClass('fa-spin-fast')
					.addClass('fa-bars');

			}, 800);
		} else {
			card.addClass('mc-active');

			window.setTimeout(function() {
				icon
					.removeClass('fa-bars')
					.removeClass('fa-spin-fast')
					.addClass('fa-arrow-left');

			}, 800);
		}
	});
});

$(document).ready(function(){
	var zindex = 10;
	
	$("div.card").click(function(e){
	  e.preventDefault();
  
	  var isShowing = false;
  
	  if ($(this).hasClass("show")) {
		isShowing = true
	  }
  
	  if ($("div.cards").hasClass("showing")) {
		// a card is already in view
		$("div.card.show")
		  .removeClass("show");
  
		if (isShowing) {
		  // this card was showing - reset the grid
		  $("div.cards")
			.removeClass("showing");
		} else {
		  // this card isn't showing - get in with it
		  $(this)
			.css({zIndex: zindex})
			.addClass("show");
  
		}
  
		zindex++;
  
	  } else {
		// no cards in view
		$("div.cards")
		  .addClass("showing");
		$(this)
		  .css({zIndex:zindex})
		  .addClass("show");
  
		zindex++;
	  }
	  
	});
  });
