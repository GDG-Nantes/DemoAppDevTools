'use strict';

angular.module('devtoolsTodoApp')
  .factory('SocketFactory', function($rootScope) {


    $rootScope.$on('add',function onTest(event, data){
        console.log('add Data %s',data);
    });

    $rootScope.$on('remove',function onTest(event, data){
        console.log('remove index %s',data);
    });

    /*var socket = io("http://" + location.host + "/browser-sync", {path: "/browser-sync/socket-io"});

    socket.on('todo', function(message) {
      $rootScope.emit('todoAction', message);
    });
    */
    function emit(data) {
      //socket.emit('todo', data);
    }

    return {
      emit: emit
    };

  });
