'use strict';

angular.module('devtoolsTodoApp',
  ['ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngResource',
    'ngRoute',
    'ui.bootstrap',
    'ui.sortable',
    'LocalStorageModule',
    'mgcrea.ngStrap'])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('ls');
  }])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
