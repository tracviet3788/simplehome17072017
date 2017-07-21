'use strict';

angular.
  module('phonecatApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/phones', {
          template: '<phone-list></phone-list>'
        }).
        when('/phones/:phoneId', {
          template: '<phone-detail></phone-detail>'
        }).
        otherwise('/phones');
    }
  ]);
angular.
  module('adminsphApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/dashboard', {
          template: '<phone-list></phone-list>'
        }).
        when('/phones/:phoneId', {
          template: '<phone-detail></phone-detail>'
        }).
        otherwise('/phones');
    }
  ]);
angular.module("yukita",["ui.router","yukita.controllers","yukita.services",'pascalprecht.translate',"ngSanitize","ngCookies","ngMaterial"])
.run(function(){
   
    

})



.constant("PUBLIC",{
        URL:"http://yukita.local",
        API:"/API/",
        DOMAIN:"yukita.local",
        PICTURE:"http://yukita.local/img/bg_yukita.jpg",
       DESCRIPTION:" Yukita"
})

.config(function($stateProvider,$urlRouterProvider,$locationProvider,$translateProvider) {
$translateProvider.determinePreferredLanguage();
 $translateProvider
  .useStaticFilesLoader({
    prefix: '/translations/',
    suffix: '.json'
  })
  .preferredLanguage('vn')

$translateProvider.useSanitizeValueStrategy('escapeParameters');
$translateProvider.useCookieStorage();


  $stateProvider
    
    .state("home",
        {
            
            url:"/",
       //    templateUrl : 'template/home.html',
           controller: 'HomeCtr'
       
         
        }
      )
    
 


     /*

      $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
      });

     $urlRouterProvider.otherwise("/");*/

   

})

.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
}])  