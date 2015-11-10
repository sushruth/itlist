var app = angular.module('itList', ['mdl']);
app.config(function (mdlConfigProvider) {
	"use strict";
	mdlConfigProvider.floating = false;
	mdlConfigProvider.rippleEffect = false;
});
app.controller('itCtrl', function($scope) {
	$scope.entries=[];
	$scope.addFunction = function() {
		console.log('clicked');
		alert($scope.ngModel);
	};
});