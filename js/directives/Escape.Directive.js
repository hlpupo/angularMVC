/**
 * Created by Hector Reyes on 10/10/2016.
 */

/**
 * Directive that executes an expression when the element it is applied to gets
 * an `escape` keydown event.
 */
(function () {
  'use strict';
  angular.module('appmvc.Directives').directive('todoEscape', _todoEscape)

  function _todoEscape () {

    var ESCAPE_KEY = 27;

    return function (scope, elem, attrs) {
      elem.bind('keydown', function (event) {
        if ( event.keyCode === ESCAPE_KEY ) {
          scope.$apply(attrs.todoEscape);
        }
      });

      scope.$on('$destroy', function () {
        elem.unbind('keydown');
      });
    };
  } ;
})();

