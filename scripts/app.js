var app = angular.module('app',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when("/", {
		templateUrl: "index.html",
		controller: "IndexCtrl"
	});
});

app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

app.controller("IndexCtrl", function($scope, socket){
	// Socket listeners
	// ================
	socket.on('server_player_init_event', function(data) {
		setPlayer(data);
	});
	
	// Internal functions
	// ==================
	var defaultTeam = 0;
	var teams = {0:"Blue", 1:"Red"};
	
	var setPlayer = function(player) {
		$scope.player = player;
		changePlayerTeam(defaultTeam);
	}
	
	var setGame = function(game) {
		$scope.game = game;
	}
	
	var changePlayerTeam = function(idTeam) {
		if (teams[idTeam] != undefined) {
			$scope.player.team = teams[idTeam];
		}
	}
	
	// Methods published to the scope
	// ==============================
	$scope.changeTeam = function(idTeam) {
		changePlayerTeam(idTeam);
	}
});