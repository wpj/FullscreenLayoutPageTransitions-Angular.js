angular.module('app.directives', [])

.directive('boxContainer', function() {
  return {
    restrict: 'EA',
    transclude: true,
    replace: true,
    template: '<div id="bl-main" class="bl-main" ng-transclude></div>'
  };
})

.directive('box', ["$compile", "$http", "$templateCache", function($compile, $http, $templateCache) {
  return {
    restrict: 'E',
    replace: true,
    // scope: {},
    transclude: true,
    templateUrl: function(elem, attrs) { return attrs.templateUrl; },
    link: function(scope, elem, attrs) {
      var container = elem.parent();
      var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition' : 'transitionend',
      'OTransition' : 'oTransitionEnd',
      'msTransition' : 'MSTransitionEnd',
      'transition' : 'transitionend'
      };
      // transition end event name
      transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
      // support CSS transitions
      supportTransitions = Modernizr.csstransitions;

      var sectionTitle = angular.element(elem.children()[0]);

      sectionTitle.on('click', function() {
        if(!elem.data('open')) {
          elem.data('open', true).addClass('bl-expand bl-expand-top');
          container.addClass('bl-expand-item');
          sectionTitle.addClass('hidden');
        }
      });

      elem.find("i").on('click', function() {

        // close the expanded section and scale up the others
        elem.data('open', false).removeClass('bl-expand').on(transEndEventName, function(event) {
            elem.off(transEndEventName).removeClass('bl-expand-top');
        });

        if(!supportTransitions) elem.removeClass("bl-expand-top");

        container.removeClass("bl-expand-item");
        sectionTitle.removeClass('hidden');
      });

    }
  };
}])

.directive('workItems', [function() {
  return {
    restrict: 'E',
    templateUrl: 'work-items.html'
  };
}]);