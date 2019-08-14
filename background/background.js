var step=0;

chrome.runtime.onMessage.addListener(
    function(req, sender, response){		

		console.log(req);

		if (req.type == 'finish') {
			localStorage.clear();
			response(req.type);
			step=0;
		}

		else if (req.type =='getTask' && localStorage['taskName'] != undefined) {

			var params = localStorage['params'];
			var taskName = localStorage['taskName'];
			
			response({
				taskName: taskName,
				params: params,
				step: step
			});

			step++;
		}
		else if (req.type == 'result') {
			console.log(req.result);
			response({});
			step++;
		}
		else response({});
    }
);
