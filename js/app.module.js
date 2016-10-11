/**
 * Created by Hector Reyes on 10/10/2016.
 */

(function () {
    'use strict';

    angular.module('appmvc.Controllers', []);
    angular.module('appmvc.Services', []);
    angular.module('appmvc.Directives', []);
    angular.module('appmvc.Factory', []);
    angular.module('appmvc.Filter', []);
    angular.module('appmvc', [
        'appmvc.Controllers',
        'appmvc.Directives',
        'appmvc.Services',
        'appmvc.Filter',
        'appmvc.Factory',
        'ngRoute'
    ]);
})();
