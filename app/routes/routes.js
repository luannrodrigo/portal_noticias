// angular.module('MyApp', ['ui.router'])
//     .config(function($stateProvider, $urlRouterProvider) {

//         $urlRouterProvider.otherwise('/home');

//         $stateProvider
//             .state('home', {
//                 url: '/home',
//                 templateUrl: '/views/home.html',
//                 controller: 'entradaController'
//             })

//         .state('censo', {
//             url: '/censo',
//             templateUrl: '/views/censo.html',
//             controller: 'entradaController'
//         })

//         .state('simples', {
//             url: '/simples',
//             templateUrl: '/views/simples.html',
//             controller: 'entradaController'
//         })

//         .state('estratificada', {
//             url: '/estratificada',
//             templateUrl: '/views/estratificada.html',
//             controller: 'entradaController'
//         })

//         .state('sistematica', {
//             url: '/sistematica',
//             templateUrl: '/views/sistematica.html',
//             controller: 'entradaController'
//         })

//         .state('organizacao', {
//             url: '/organizacao',
//             templateUrl: '/views/organizacao.html',
//             controller: 'entradaController'
//         })

//         .state('probabilidades', {
//             url: '/probabilidades',
//             templateUrl: '/views/probabilidades.html',
//             controller: 'entradaController'
//         })

//         .state('qualitativa-dash', {
//             url: '/qualitativa-dash',
//             templateUrl: '/views/qualitativa-dash.html',
//             controller: 'entradaController'
//         })

//         .state('discreta-dash', {
//             url: '/discreta-dash',
//             templateUrl: '/views/discreta-dash.html',
//             controller: 'entradaController'
//         })

//         .state('distribuicao-normal', {
//             url: '/distribuicao-normal',
//             templateUrl: '/views/distribuicao-normal.html',
//             controller: 'probabilidadesController'
//         })

//         .state('intervalo', {
//             url: '/intervalo',
//             templateUrl: '/views/intervalo.html',
//             controller: 'probabilidadesController'
//         })

//         .state('distribuicao-binomial', {
//             url: '/distribuicao-binomial',
//             templateUrl: '/views/distribuicao-binomial.html',
//             controller: 'probabilidadesController'
//         })

//         .state('continua-dash', {
//             url: '/continua-dash',
//             templateUrl: '/views/continua-dash.html',
//             controller: 'entradaController'
//         });
//     });