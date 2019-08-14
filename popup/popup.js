 document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('runTestButton').addEventListener('click', runTestButtonClick);
});

function runTestButtonClick(e){
	//localStorage['params'] = 
	localStorage['taskName'] = 'TestTask';

	chrome.tabs.reload();
	window.close();		
}