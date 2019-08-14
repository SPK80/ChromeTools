window.onload = function(){
    getTask();
}

function getTask(){
    chrome.runtime.sendMessage({type:'getTask'}, function(ret){
        //console.log(ret);
        if(!ret) {
            console.log("Error send message " + chrome.runtime.lastError);
            return;
        }
        else {            
            runTask(ret.taskName, ret.params, ret.step);
        }
    });
}

function runTask(taskName, params, step){   
 
    //console.log('runTask', taskName, params, step);

    if (tasks.has(taskName)){
        tasks.get(taskName)(params, step);        
    }        
}

var baseTask = {

    tryRun (taskRun) {
        try {
            taskRun();
        }
        catch(e) {
            console.log('catch', e);
            this.finish();
        }
    },

    finish() {        
        chrome.runtime.sendMessage({type:'finish'}, function(ret){            
            if(!ret) {
                console.log("Error send message "+ chrome.runtime.lastError); 
                return;
            }
        });
    }
}

let tasks= new Map();

tasks.set('TestTask', 
(params, step) => {

        console.log('run TestTask', params, step);

        baseTask.tryRun(function() {            

            if (step==0) {
                logHello(step);
                setTimeout(()=>location.reload(), 3000);
            }
            else if (step==1) {
                logHello(step);
                setTimeout(()=>location.reload(), 3000);
            }        
            else if (step==2) {
                logHello(step);
                setTimeout(()=>location.reload(), 3000);
            }
            else {
                console.log('finish TestTask', params, step);
                baseTask.finish();
            }
        });
    }
);

function logHello(num){
    console.log(`Hello ${'!'.repeat(num)}`);
}