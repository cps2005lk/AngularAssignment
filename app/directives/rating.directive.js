(function(){
    'use strict';

    angular
        .module('app')
        .directive('movieRating', movieRating);

    movieRating.$inject = [];

    function movieRating(){
        return {
            restrict: 'E', 
            scope: { 
               'ratingValue': '=rate',
               'max': '=maxRate'
            },
            link: function(scope, element, attributes){
                if ((scope.maxRating >= scope.ratingValue) && (scope.ratingValue >= 0)){
                    var ratingEle = '';
                    for(var i=0; i < scope.maxRating; i++){
                        if (scope.ratingValue >= i + 1){
                            ratingEle += "<span class='star full'></span>";
                        }else if (scope.ratingValue < i + 1 && scope.ratingValue > i){
                            ratingEle += "<span class='star half'></span>";
                        }else{
                            ratingEle += "<span class='star none'></span>";
                        }
                    }
                    ratingEle += "<span class='star-value'>" + scope.ratingValue + " / " + scope.maxRating + "</span>";
                    element.html(ratingEle);
                }
            },
            controller: function($scope){
                if (typeof $scope.ratingValue === "undefined"){
                    $scope.ratingValue = -1;
                }
                if (typeof $scope.max === "undefined"){
                    $scope.maxRating = 10;
                }
            }
        };
    }
}());