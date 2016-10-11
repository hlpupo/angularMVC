/**
 * Created by Hector Reyes on 10/10/2016.
 */

/**
 * Directive that places focus on the element it is applied to when the
 * expression it binds to evaluates to true
 */
(function () {
	'use strict';
	angular.module('appmvc.Directives').directive('todoFocus', _todoFocus);
	
			_todoFocus.$inject = ['$timeout'];

			function _todoFocus($timeout) {
				return function (scope, elem, attrs) {
					scope.$watch(attrs.todoFocus, function (newVal) {
						if (newVal) {
							$timeout(function () {
								elem[0].focus();
							}, 0, false);
						}
					});
				};
			};
})()

