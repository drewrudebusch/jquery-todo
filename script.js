$(document).ready(function() {
	var completeTasksHidden = false;

	$(function() {
	    $( "#sortable" ).sortable();
	    $( "#sortable" ).disableSelection();
	});

	$('#new-item-modal').on('shown.bs.modal', function(){
		$(this).find('#add-item').focus();
	});

	$('#add-item-form').submit(function(event) {
		event.preventDefault();
			$(this).children('input:text').each(function(index, elem) {
				var newTask = $(elem).val()
				if (newTask !== "") {
					createNewTask(newTask);
				}
				$(elem).val('');
		});
	});

	$('#sortable').on('change', '.task', function() { 
		if ($(this).is(':checked')) {
			$(this).parent().addClass('strike opaque');
			completeTasksHidden = false;
	    } else {
	    	$(this).parent().removeClass('strike opaque');
	    }
	});

	$('#sortable').on('click', '.delete', function() {
		var taskItem = $(this).parents('.task-item-container');
		taskItem.remove();
	});


	$('#clear-complete').on('click', function() {
		clearCompletedTasks();
		sortCompletedToBottom();
	});		
		

	var clearCompletedTasks = function() {
		if (completeTasksHidden) {
			$('.hidden').removeClass('hidden');
			completeTasksHidden = false;
		} else {
			$('.task').each(function(index, elem) {
				var taskItem = $(this).parents('.task-label')
				var taskItemContainer = $(this).parents('.task-item-container')
					if (taskItem.hasClass('strike')) {
						taskItemContainer.addClass('hidden');
					};
				});
			if($('.hidden').length >= 1) {
				completeTasksHidden = true;
			};
		};
	};

	var createNewTask = function (newTask) {
		$('#sortable').append(
			'<div class="ui-sortable-handle task-item-container"><li class="ui-state-default"><div class="checkbox"><label class="task-label"><input type="checkbox" class="task">' + newTask + '</label><div class="delete btn btn-danger"><span class="glyphicon glyphicon-trash"></span></div></div></li></div>');
	}

	var sortCompletedToBottom = function () {
		$('.task').each(function(index, elem) {
			var taskItem = $(this).parents('.task-label')
			var taskItemContainer = $(this).parents('.task-item-container')
				if (taskItem.hasClass('strike')) {
					taskItemContainer.appendTo('#sortable');
				};
			});
		};
});