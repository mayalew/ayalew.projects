'use strict';

/* App Module */

angular.module('Tictactoe', ['ngRoute']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'index.html',   controller: TicTacToeCntl}).
      otherwise({redirectTo: '/'});
}]);
