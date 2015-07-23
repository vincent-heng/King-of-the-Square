var app = angular.module('app',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when("/", {
		templateUrl: "index.html",
		controller: "IndexCtrl"
	});
});

app.controller("IndexCtrl", function($scope){
	var defaultTeam = 0;
	
	var teams = {0:"Blue", 1:"Red"};
	
	$scope.setPlayer = function(player) {
		$scope.player = player;
		$scope.player.team = teams[defaultTeam];
	}
	
	$scope.setGame = function(game) {
		$scope.game = game;
	}
	
	$scope.changeTeam = function(idTeam) {
		if (teams[idTeam] != undefined) {
			$scope.player.team = teams[idTeam];
		}
	}
	
	// On test purpose
	$scope.setPlayer({nbTokens:1});
});