'use strict';

angular.module('devtoolsTodoApp')
  .controller('MainCtrl', function($scope, $rootScope, $http, $timeout, localStorageService, SocketFactory) {
    var todosInStore = localStorageService.get('todos');

    $scope.todo = {};
    $scope.todos = todosInStore || [];

    $scope.$watch('todos', function() {
      localStorageService.set('todos', $scope.todos);
    }, true);

    var timeoutIndex = 0;

    $scope.reload = function() {
      $scope.loading = true;
      timeoutIndex += 1;
      if ((timeoutIndex % 3) === 0) {
        $timeout(reloadDefaultValue, 1500);
      } else {
        reloadDefaultValue();
      }
    };

    $scope.changeState = function (item) {
      $timeout(function () {
        item.checked = !item.checked;
      }, 250);
    };

    function reloadDefaultValue() {
      $http.get('plan.json').then(function majTodo(response) {
        return response.data;
      }).then(function setData(todos) {
        $scope.todos = todos;
      }).then(function updateLocalStorage() {
        localStorageService.set('todos', $scope.todos);
      }).then(function disableLoading() {
        $scope.loading = false;
      });
    }

    $scope.addTodo = function() {
      $scope.todos.splice(0, 0, $scope.todo);
     
      $rootScope.$emit('add', $scope.todo);

      $scope.todo = {};

    };
    $scope.removeTodo = function(index) {
      $scope.todos.splice(index, 1);
      $rootScope.$emit('remove', index);     
    };


    $scope.icons = [
      {'value': 'Coder', 'label': '<i class=\'glyphicon glyphicon-pencil\'></i> Coder'},
      {'value': 'Network', 'label': '<i class=\'glyphicon glyphicon-globe\'></i> Network'},
      {'value': 'Responsive', 'label': '<i class=\'glyphicon glyphicon-indent-right\'></i> Responsive'},
      {'value': 'Debugger', 'label': '<i class=\'glyphicon glyphicon-wrench\'></i> Débugger'},
      {'value': 'Optimiser', 'label': '<i class=\'glyphicon glyphicon-road\'></i> Optimiser'}

    ];


  });
