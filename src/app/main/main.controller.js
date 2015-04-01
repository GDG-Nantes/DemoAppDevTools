'use strict';

angular.module('devtoolsTodoApp')
  .controller('MainCtrl', function($scope, $http, $timeout, localStorageService, SocketFactory) {
    var todosInStore = localStorageService.get('todos');

    $scope.todo = {};
    $scope.todos = todosInStore || [];

    $scope.$watch('todos', function() {
      localStorageService.set('todos', $scope.todos);
    }, true);

    var timeoutIndex = 0;

    $scope.reload = function() {
      timeoutIndex += 1;
      if ((timeoutIndex % 3) === 0) {
        $timeout(reloadDefaultValue, 1000);
      } else {
        reloadDefaultValue();
      }
    };

    function reloadDefaultValue() {
      $http.get("plan.json").then(function majTodo(response) {
        return response.data;
      }).then(function setData(todos) {
        $scope.todos = todos;
      }).then(function updateLocalStorage() {
        localStorageService.set('todos', $scope.todos);
      });
    }

    $scope.addTodo = function() {
      $scope.todos.splice(0, 0, $scope.todo);
      SocketFactory.emit({
        type: 'add',
        data: $scope.todo
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
      {"value": "Debugger", "label": "<i class=\"glyphicon glyphicon-wrench\"></i> Débugger"},
      {"value": "Optimiser", "label": "<i class=\"glyphicon glyphicon-road\"></i> Optimiser"}

    ];


  });
