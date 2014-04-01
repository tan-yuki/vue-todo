(function(exports) {

    var app = new Vue({
        el: "#main",
        data: {
            todos: [
                {completed: true,  text: "one"},
                {completed: false, text: "two"},
                {completed: true,  text: "three"}
            ]
        },

        methods: {
            removeTodo: function(todo) {
                // - todo.$remove
                // - todo.$destory
                // ではDOMが削除されるだけでthis.todosから削除されない。
                this.todos.$remove(todo.$data);
            },

            editTodo: function(todo) {
                todo.editing = true;

                var $todo_text = $(todo.$el).find('input[type=text]');

                // input todo title
                $todo_text.val(todo.text);

                // focus this text
                setTimeout(function() {
                    $todo_text.focus();
                }, 10);
            },

            completeEditTodo: function(todo) {
                todo.editing = false;

                var $todo_text = $(todo.$el).find('input[type=text]');

                // input todo title
                todo.text = $todo_text.val() || '';
            }
        }
    });

})(this);
