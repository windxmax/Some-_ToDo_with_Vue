Vue.component('todoElement', {
    template: '\
    <li v-on:mousedown.stop="$emit(\'change\',$event)"> \
        <p>{{ text }}</p>\
        <button class= "todos-elementList-main-element-button" v-on:click.stop="$emit(\'remove\')"></button>\
      </li>\
    ',
    props: ['text']
})

const todoElementList = new Vue({
    el: "#todoElementList",
    data: {
        todoElements    :[],
        todoId          : 0,
        currentDroppable: null, 
    },
    //Если в списке дел есть значения по умолачнию, тут мы сохраняем их в localstorage  и позволяем их модифицировать
    mounted() {
      if (localStorage.getItem('todoElements') && localStorage.getItem('todoId')) {
        try {
          this.todoElements = JSON.parse(localStorage.getItem('todoElements'));
          this.todoId = JSON.parse(localStorage.getItem('todoId'));
        } catch(e) {
          localStorage.removeItem('todoElements');
          localStorage.removeItem('todoId');
        }
      } else {
        let parsedTodoElements = JSON.stringify(this.todoElements)
        let parsedTodoId       = JSON.stringify(this.todoId)
        localStorage.setItem('todoElements', parsedTodoElements)
        localStorage.setItem('todoId', parsedTodoId)
      }
    },

    watch: {
      //Отслеживаеи изменения "todoElements" и записываем в localstorage
      todoElements: function(){
        let parsedNewElements = JSON.stringify(this.todoElements)
        localStorage.setItem('todoElements', parsedNewElements)
      },
      //Отслеживаеи изменения "todoId" и записываем в localstorage
      todoId: function(){
        let parsedNewtodoId = JSON.stringify(this.todoId)
        localStorage.setItem('todoId', parsedNewtodoId)
      }
    },

    methods: {
      //Удаление элемента списка дел "todoElements"
      deleteElement: function (index) {
        this.todoElements.splice(index, 1)
      },
      dragNdrop: function(event) {
        
        let someElement     = document.querySelector(".todos-elementList-main")
        let selectedElemId  = event.target.id
        let targetedElemeId = null 
        let mouseover       = null
        //Ловим выбор элемента списка мышкой
        someElement.addEventListener("mouseover", function(e){
          mouseover = true
        })
        someElement.addEventListener("mouseup", (e)=>{
          //Обрабатываем перемещение задачи в списке.
          //Если происходит движение мышки, при зажатой клавиши
          if(mouseover){
            let checkElement  = e.target.classList.value.split(" ").includes("todos-elementList-main-element")
            targetedElemeId   = e.target.id
            //Если перемещаем элемент на новое место в списке, то меняем порядок элементов.
            if (selectedElemId != targetedElemeId && checkElement){
              let change1         = todoElementList._data.todoElements[selectedElemId]
              let newElementsList = todoElementList._data.todoElements
              newElementsList.splice(selectedElemId, 1)
              newElementsList.splice(targetedElemeId, 0, change1)
              todoElementList._data.todoElements = newElementsList
            }
          }
        })
      
      }
    },
    
})
