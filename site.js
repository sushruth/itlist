var app = angular.module('itList', ['mdl']);

app.config(function (mdlConfigProvider) {
	"use strict";
	mdlConfigProvider.floating = false;
	mdlConfigProvider.rippleEffect = false;
});

// Preserve html in text angularJS. Credit :: http://creative-punch.net/2014/04/preserve-html-text-output-angularjs/
app.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

app.controller('itCtrl', function ($scope) {
	if(!localStorage.getObject("entries"))
		$scope.entries = [];
	else
		$scope.entries = localStorage.getObject('entries');
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
	console.log($scope.someone);
});

function parse(currentTask, length) {
	var functionList = ["call", "email", "mail", "watch", "listen", "read", "go", "link", "text", "message"];
	var iconList = ["phone", "email", "email", "play_circle_outline", "music_note", "description", "location_on", "link", "message", "message"]; // Material icons
	var entry = {};
	var currentFunction = currentTask.toLowerCase().match(/^([\w\-]+)/g).toString();

	entry.id = length + 1;
	entry.text = currentTask;
	entry.function = [];
	var whichFunction = 0;

	console.log("currentFunction :: " + currentFunction);

	if (hasurl(currentTask)) {
		entry.function = ["link"];
	}

	if (currentFunction) {
		whichFunction = functionList.indexOf(currentFunction);
	}

	console.log("whichFunction :: " + whichFunction);


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