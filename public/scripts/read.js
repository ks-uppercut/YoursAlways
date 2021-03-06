$(document).ready(function(){
	$('.page_title').fadeIn('slow');
	$('.letter_container').fadeIn('slow');
	addDeleteListener();
});

function addDeleteListener(){
	$('.button.delete').click(function(event){
		event.preventDefault();
		var letterId = $(this).attr('data-id');
		$('.deleteConfirmation').fadeIn('slow');
		addDeleteConfirmationListener(letterId);
	});
}

function addDeleteConfirmationListener(letterId){
	$('.delete_yes').click(function(){
		$('.delete').closest('#'+letterId).fadeOut('fast');
		$.ajax({
	      url: '/deleteLetter',
	      data: {_id: letterId},
	      method: 'POST'
	    });	
	    $('.deleteConfirmation').fadeOut('fast');
	});

	$('.delete_no').click(function(){
		$('.deleteConfirmation').fadeOut('fast');
	});
}