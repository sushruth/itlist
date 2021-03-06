var app = angular.module('itList', ['mdl']);

app.config(function (mdlConfigProvider) {
	"use strict";
	mdlConfigProvider.floating = false;
	mdlConfigProvider.rippleEffect = false;
});

app.controller('itCtrl', function ($scope) {
	
	//Load data from local storage
	if(!localStorage.getObject("entries")) {
		$scope.entries = [];
	} else {
		$scope.entries = localStorage.getObject('entries');
	}
	
	// Add an entry
	$scope.addFunction = function () {
		if (($scope.task !== "") && ($scope.task)) {
			console.log('clicked ' + $scope.task);
			$scope.entries.unshift(parse($scope.task, $scope.entries.length));
			// There is actually a bug related to angular-material-design-lite pachage. I did not intend to name this "ngModel"
			// This is just a shortcut
			$scope.task = "";
			localStorage.setObject('entries', $scope.entries);
		}
	};
	$scope.submitFunction = function (keyEvent) {
		if (keyEvent.which === 13)
			$scope.addFunction();
	}
	
	//Clearing data
	$scope.clearData = function() {
		$scope.entries = [];
		localStorage.clear();
	}
	
	//Debug
	console.log($scope.someone);
});

function parse(currentTask, length) {
	
	var functionList = ["call", "email", "mail", "watch", "listen", "read", "go", "link", "text", "message"];
	var iconList = ["phone", "email", "email", "play_circle_outline", "music_note", "description", "location_on", "link", "message", "message"]; // Material icons
	var entry = {};
	var currentFunction = currentTask.toLowerCase().match(/^([\w\-]+)/g).toString();
	var whichFunction = 0;

	entry.id = length + 1;
	entry.text = currentTask;
	entry.function = [];
	entry.status = 0;

	console.log("currentFunction :: " + currentFunction);

	if (hasurl(currentTask)) {
		entry.function = ["link"];
	}

	if (currentFunction) {
		whichFunction = functionList.indexOf(currentFunction);
	}

	console.log("whichFunction :: " + whichFunction);

	// Map function to icon
	if (whichFunction >= 0) {
		entry.function.push(iconList[whichFunction]);
	}

	return entry;
}

function hasurl(text) {
	// Regex credit :: http://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149
	return text.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/g);
}


// Storing objects in local storage. Credit :: http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}