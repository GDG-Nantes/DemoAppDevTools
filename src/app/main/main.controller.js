'use strict';

angular.module('gulpInstall')
  .controller('MainCtrl', function ($scope, localStorageService, SocketFactory) {
    var todosInStore = localStorageService.get('todos');

    $scope.todos = todosInStore || [];

    $scope.$watch('todos', function () {
      localStorageService.set('todos', $scope.todos);
    }, true);

    $scope.addTodo = function () {
      $scope.todos.push($scope.todo);
      SocketFactory.emit({
        type : 'add',
        data : $scope.todo
      });

      $scope.todo = '';

    };
    $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
      SocketFactory.emit({
        type : 'remove',
        index : index
      });
    };


    

  });
