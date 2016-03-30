$(document).ready(function() {
	var completeTasksHidden = false;
	var hiddenTasks = [];
	var visibleTasks = [];
	var loadSavedTasks = function() {
	 	if (localStorage.hiddenTasks) {
		 	var taskList = JSON.parse(localStorage.hiddenTasks);
			if (taskList) {
				console.log(JSON.parse(localStorage.hiddenTasks));
				for(var i = 0; i < taskList.length; i++) {
					$('#sortable').append('<div class="ui-sortable-handle task-item-container hidden">'
					    + taskList[i] +
					  '</div>');
				};
			};
			var taskList = JSON.parse(localStorage.visibleTasks);
		 	// console.log(taskList)
			if (taskList) {;
				for(var i = 0; i < taskList.length; i++) {
					$('#sortable').append('<div class="ui-sortable-handle task-item-container">'
					    + taskList[i] +
					  '</div>');
				};
			};
			$('.task-label').each(function(index, elem){
				 console.log(elem)
				 if ($(elem).hasClass('strike')) {
					$(this).children('.task').prop("checked", true);
					console.log('success');
					console.log($(this).children('.task'))
				};
			});
		};
		if (localStorage.hidden) {
			completeTasksHidden = JSON.parse(localStorage.hidden);
		};
		// clearCompletedTasks();
	};
	var createNewTask = function(newTask) {
		$('#sortable').append(
			'<div class="ui-sortable-handle task-item-container"><li class="ui-state-default"><div class="checkbox"><label class="task-label"><input type="checkbox" class="task">' + newTask + '</label><div class="delete btn btn-danger"><span class="glyphicon glyphicon-trash"></span></div></div></li></div>');
	}
	var clearCompletedTasks = function() {
		if (completeTasksHidden !== false) {
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
		pushToLocalStorage();
	};
	var sortCompletedToBottom = function() {
		$('.task').each(function(index, elem) {
			var taskItem = $(this).parents('.task-label')
			var taskItemContainer = $(this).parents('.task-item-container')
				if (taskItem.hasClass('strike')) {
					taskItemContainer.appendTo('#sortable');
				};
			});
			pushToLocalStorage();
		};
	var pushToLocalStorage = function() {
		$('.task').each(function(index, elem) {
			var taskItem = $(this).parents('.task-item-container');
			var taskItemContents = taskItem.html();
			if(taskItem.hasClass('hidden')) {
				hiddenTasks.push(taskItemContents);
			} else {
				visibleTasks.push(taskItemContents);
			}
			
		});
		localStorage.setItem('hiddenTasks', JSON.stringify(hiddenTasks));
		localStorage.setItem('visibleTasks', JSON.stringify(visibleTasks))
		hiddenTasks = [];
		visibleTasks = [];
		storeHiddenTaskStatus();
	};
	var storeHiddenTaskStatus = function() {
		localStorage.setItem('hidden', JSON.stringify(completeTasksHidden));
	}

	loadSavedTasks();
	// clearCompletedTasks();

	$('#sortable').on('mouseenter mouseleave', function() {
		console.log('pushed to localStorage!')
		pushToLocalStorage();
	});

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
				pushToLocalStorage();
				// tasks.push(newTask);
				// localStorage.setItem('tasks', JSON.stringify(tasks));

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
	    pushToLocalStorage();
	});

	$('#sortable').on('click', '.delete', function() {
		var taskItem = $(this).parents('.task-item-container');
		taskItem.remove();
		pushToLocalStorage();
	});


	$('#clear-complete').on('click', function() {
		clearCompletedTasks();
		sortCompletedToBottom();
		pushToLocalStorage();
	});		
		

	
});
		// var todoIndex = todos.indexOf($(this).prev().text());
		// todos.splice(todoIndex,1);
		// localStorage.setItem('todos', JSON.stringify(todos))