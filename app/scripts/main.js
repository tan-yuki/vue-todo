(function(exports) {
    'use strict';

    var filters = {
        active: function(todo) {
            return !todo.completed;
        },

        done: function(todo) {
            return todo.completed;
        }
    };


    var app = new Vue({
        el: '#main',
        data: {
            todos: [
                {completed: true,  text: 'one'},
                {completed: false, text: 'two'},
                {completed: true,  text: 'three'}
            ],
            newTodo: ''
        },

        // Compouted property
        // http://vuejs.org/guide/computed.html
        computed: {
            remaining: function() {
                return this.todos.filter(filters.active);
            },

            doneTodos: function() {
                return this.todos.filter(filters.done);
            }
        },

        methods: {
            addTodo: function() {
                var value = this.newTodo && this.newTodo.trim();
                if (value === '') {
                    return;
                }

                this.todos.push({completed: false, text: value});
                this.newTodo = '';
            },

            removeTodo: function(todo) {
                // - todo.$remove
                // - todo.$destory
                // ではDOMが削除されるだけでthis.todosから削除されない。
                this.todos.$remove(todo.$data);
            },

            editTodo: function(todo) {
                todo.editing = true;

                var $todoText = $(todo.$el).find('.input');

                // input todo title
                $todoText.val(todo.text);

                // focus this text
                setTimeout(function() {
                    $todoText.focus();
                }, 1);
            },

            completeEditTodo: function(todo) {
                todo.editing = false;

                var $todoText = $(todo.$el).find('.input');
                var newText = $todoText.val().trim() || '';

                if (newText === '') {
                    return;
                }

                todo.text = newText;
            },

            deleteDoneTodo: function() {
                this.todos = this.todos.filter(filters.active);
            }
        }
    });

    exports.app = app;

})(this);
