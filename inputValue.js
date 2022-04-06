const inputElement =  new Vue({
    el: "#todoElementAdd",
    data: {
      todoInputValue: ""
    },
    methods: {
        //Добавляем новый элемент в массив компонента "todoElementList"
        addTodoElem: function(elem){
            todoElementList._data.todoId++
            let newId = todoElementList._data.todoId
            todoElementList._data.todoElements.push({id: newId, text: elem})
            this.todoInputValue = ""
        }
    }
})