console.log('js is loaded');

//const app = angular.module('ToDoApp', []); //"ToDoApp" is name of ng-app
const todoList = angular.module('todoList', []);

//app.controller('ToDoController', ['$http', function($http) {
//let self = this;
//self.todoArray = [];
//"ToDoController as vm" is name of ng-controller; worm hole to DOM

todoList.controller('TodoController', ['$http', function($http){
    console.log('todoController is loaded');

    let todo = this;

    todo.todoArray = [];

    //GET
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

    //POST
    todo.addTask = function(newTask) {
        console.log('inside addTask', newTask);
    //takes input value and passes it to router...to db
        $http({
            method: 'POST',
            url: '/todo',  
            data: newTask
        }).then(function(response){
            console.log('POST response', response);
            todo.getTodo();
            todo.newTask.taskName = '';
            todo.newTask.taskType = '';
        }).catch(function(error){
            console.log('Error in POST', error);
        });
    }
    
    //PUT
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

    //DELETE vanilla-style
    // todo.taskDelete = function (taskId) {
    //     console.log('client.js DELETE task function is started', taskId);
    //     $http({
    //         method: 'DELETE',
    //         url: '/todo/' + taskId,
    //         data: { taskDone: status }
    //     }).then(function (response) {
    //         console.log('Task deleted', response);
    //         todo.getTodo();
    //     }).catch(function (error) {
    //         console.log('Error', error);
    //     });
    // }

    //DELETE
    todo.taskDelete  = function (taskId) {
        swal({
            title: "Are you sure you want to delete?",
            buttons: true,
            dangerMode: true,
        })
            .then((value) => {
                if (value === true) {
                    swal("Task has been deleted!", {
                        icon: "success"
                    })
                    $http({
                        method: 'DELETE',
                        url: '/todo/' + taskId
                    }).then(function (response) {
                        console.log('Successfully deleted: ', response);
                        
                    todo.getTodo();

                    }).catch(function (error) {
                        console.log('Error in deleting entry', error);
                    })
                }
         });

    }

}]);