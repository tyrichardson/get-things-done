console.log('js is loaded');

const todoList = angular.module('todoList', []);

todoList.controller('TodoController', ['$http', function($http){
    console.log('todoController is loaded');

    let todo = this;

    todo.todoArray = [];

    todo.addTask = function(newTask) {
        console.log('inside addTask', newTask);
        $http({
            method: 'POST',
            url: '/todo',
            data: newTask
        }).then(function(response){
            console.log('POST response', response);
            todo.getTodo();
        }).catch(function(error){
            console.log('Error in POST', error);
        });
    }
    
    todo.getTodo = function () {
        $http({  
            method: 'GET',
            url: '/todo'
        }).then(function (response) {
            console.log('GET response', response);
            todo.todoArray = response.data;
        }).catch(function (error) {
            console.log('Error in GET', error);
        });
    }
    todo.getTodo();

    todo.taskDone = function (taskId, status) {
        console.log('client.js PUT mark task completed function is started', taskId);
        $http({
            method: 'PUT',
            url: '/todo/' + taskId,
            data: { taskDone: status }
        }).then(function (response) {
            console.log('Task now marked as done', response);
            todo.getTodo();
        }).catch(function (error) {
            console.log('Error', error);
        });
    }

    todo.taskDelete = function (taskId) {
        console.log('client.js DELETE task function is started', taskId);
        $http({
            method: 'DELETE',
            url: '/todo/' + taskId,
            data: { taskDone: status }
        }).then(function (response) {
            console.log('Task deleted', response);
            todo.getTodo();
        }).catch(function (error) {
            console.log('Error', error);
        });
    }

}]);