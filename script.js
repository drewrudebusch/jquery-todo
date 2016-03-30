$(document).ready(function() {

	$(function() {
	    $( "#sortable" ).sortable();
	    $( "#sortable" ).disableSelection();
	  });

	$('#add-item-form').submit(function(event) {
		event.preventDefault();
		$(this).children('input:text').each(function(index, elem) {
			var newItem = $(elem).val()
			$('#sortable').append(
				'<li class="ui-state-default"><div class="checkbox"><label><input type="checkbox" id="cb'
				+ ($('#sortable').children('li').length + 1)
				+ '">'
				+ newItem
				+ '</label></div></li>');
			$(elem).val('');
		});
	});

$('#check').on('change', function() { 
	if ($(this).is(':checked')) {
		$(this).parent(0).addClass('strike opaque');

		console.log($(this).parents(1).html())
    } else {
    	$(this).parents(0).removeClass('strike opaque');
		console.log($(this).parents(1).html())
    }
});


// $('.check').change(function(event) {
// 	$(this).each(function(index, elem) {.
// 		if ($(elem).prop('checked')) {
// 			$(elem).addClass('strike');
// 		};
// 	});
// });



});