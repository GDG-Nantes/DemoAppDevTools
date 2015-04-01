'use strict';

angular.module('devtoolsTodoApp')
  .filter('cat2color', function() {
    return function(value) {
      switch (value) {
        case "Coder":
          return "label-success";
        case "Network":
          return "label-primary";
        case "Responsive":
          return "label-info";
        case "Optimiser":
          return "label-warning";
        case "Debugger":
          return "label-danger";
      }
    }
  });
