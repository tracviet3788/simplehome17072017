var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.run(function(){
     
    

})
.constant("PUBLIC",{
        URL:"http://localhost:3000/admin/",
        API:"/",
        DOMAIN:"localhost:3000",
       DESCRIPTION:"Admin SimpleHome"
}).config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'index.html'
        })

        
        // nested list with custom controller
        .state('home.adduser', {
            url: '/adduser',
            templateUrl: 'template/adduser.html',
            controller: function($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })
        
        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'login.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': { 
                    templateUrl: 'table-data.html',
                    controller: 'scotchController'
                }
            }
            
        });
        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
      });
     $urlRouterProvider.otherwise("/");
        
});

routerApp.controller('scotchController', function($scope) {
    
    $scope.message = 'test';
   
    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
    
});