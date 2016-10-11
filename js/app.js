/**
 * Created by Hector Reyes on 10/10/2016.
 */
(function () {
  'use strict';
  /**
   * The main appmvc app module
   *
   * @type {angular.Module}
   */
  angular.module('appmvc').config(_config)
  _config.$inject = ['$routeProvider'];
  function _config ($routeProvider) {
    'use strict';

    var routeConfig = {
      controller : 'TodoCtrl',
      templateUrl : 'js/controllers/Todo.html',
      resolve : {
        store : function (todoStorage) {
          // Get the correct module (API or localStorage).
          return todoStorage.then(function (module) {
            module.get(); // Fetch the todo records in the background.
            return module;
          });
        }
      }
    };

    $routeProvider
        .when('/', routeConfig)
        .when('/:status', routeConfig)
        .otherwise({
          redirectTo : '/'
        });
  };

  angular.module("appmvc").run(runTemplate);
  runTemplate.$inject = ['$templateCache'];
  function runTemplate($templateCache){
    $templateCache.put('appmvc-index.html', '<section id="todoapp"><header id="header"><form id="todo-form" ng-submit="addTodo()"><input id="new-todo" placeholder="Enter Todo List" ng-model="newTodo" ng-disabled="saving" autofocus></form></header><section id="main" ng-show="todos.length" ng-cloak> <input id="toggle-all" type="checkbox" ng-model="allChecked" ng-click="markAll(allChecked)"><label for="toggle-all">Mark all as complete</label> <ul id="todo-list"><li ng-repeat="todo in todos | filter:statusFilter track by $index" ng-class="{completed: todo.completed, editing: todo == editedTodo}"><div class="view"><input class="toggle" type="checkbox" ng-model="todo.completed" ng-change="toggleCompleted(todo)"> <label ng-dblclick="editTodo(todo)">{{todo.title}}</label> <button class="destroy" ng-click="removeTodo(todo)"></button> </div> <form ng-submit="saveEdits(todo, "submit")"> <input class="edit" ng-trim="false" ng-model="todo.title" todo-escape="revertEdits(todo)" ng-blur="saveEdits(todo, "blur")" todo-focus="todo == editedTodo"></form></li></ul></section> <footer id="footer" ng-show="todos.length" ng-cloak><span id="todo-count"><strong>{{remainingCount}}</strong> <ng-pluralize count="remainingCount" when="{ one: "item left", other: "items left" }"></ng-pluralize> </span><ul id ="filters"><li> <a ng-class="{selected: status == ""} " href="#/">All</a></li><li><a ng-class="{selected: status == "active"}" href="#/active">Active</a></li><li><a ng-class="{selected: status == "completed"}" href="#/completed">Completed</a> </li></ul><button id="clear-completed" ng-click="clearCompletedTodos()" ng-show="completedCount">Clear completed</button></footer></section>');
  };
})();

