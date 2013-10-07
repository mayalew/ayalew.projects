'use strict';

/* App Module */

angular.module('Tictactoe', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'index.html',   controller: TicTacToeCntl}).
      otherwise({redirectTo: '/'});
}]);
