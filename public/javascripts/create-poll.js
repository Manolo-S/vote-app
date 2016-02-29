'use strict';

function storePoll(){
	var pollName = document.getElementById('poll-title').value;
	console.log('pollTitle', pollName);
	var categories = document.getElementById('categories').value.split(',');
	console.log('categories', categories);
	var poll = {pollTitle: pollName, categories: categories};
console.log(poll);
    $.post('http://localhost:3000/create-poll', poll);

}