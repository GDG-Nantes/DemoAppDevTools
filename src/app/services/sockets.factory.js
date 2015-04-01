'use strict';

angular.module('gulpInstall')
.factory('SocketFactory', function($rootScope){

	var socket = io("http://"+location.host+"/browser-sync",{path:"/browser-sync/socket-io"});
    
    socket.on('todo',function(message){
      $rootScope.emit('todoAction', message);
    });

    function emit(data){
    	socket.emit('todo', data);
    }

	return {
		emit : emit
	};

});