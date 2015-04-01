'use strict';

angular.module('devtoolsTodoApp')
  .controller('MainCtrl', function($scope, localStorageService, SocketFactory) {
    var todosInStore = localStorageService.get('todos');

    $scope.todo = {};
    $scope.todos = todosInStore || [];

    $scope.$watch('todos', function() {
      localStorageService.set('todos', $scope.todos);
    }, true);

    $scope.addTodo = function() {
      $scope.todos.push($scope.todo);
      SocketFactory.emit({
        type : 'add',
        data : $scope.todo
      });

      $scope.todo = {};

    };
    $scope.removeTodo = function(index) {
      $scope.todos.splice(index, 1);
      SocketFactory.emit({
        type: 'remove',
        index: index
      });
    };


    $scope.icons = [
      {"value": "Coder", "label": "<i class=\"glyphicon glyphicon-pencil\"></i> Coder"},
      {"value": "Network", "label": "<i class=\"glyphicon glyphicon-globe\"></i> Network"},
      {"value": "Responsive", "label": "<i class=\"glyphicon glyphicon-indent-right\"></i> Responsive"},
      {"value": "Optimiser", "label": "<i class=\"glyphicon glyphicon-road\"></i> Optimiser"},
      {"value": "Débugger", "label": "<i class=\"glyphicon glyphicon-wrench\"></i> Débugger"}

    ];


  });
