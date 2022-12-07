new Vue({
    el: '#app',
    data() {
      return {
        todoList: [
        ],
        new_todo: '',
        showComplete: false,
      };
    },
    mounted() {
      this.getTodos()
    },
    watch: {
      todoList: {
        handler(updatedList) {
          localStorage.setItem('todo_list', JSON.stringify(updatedList));
        },
        deep: true
      }
    },
    computed:{
      pending() {
        return this.todoList.filter(item => !item.done)
      },
      completed() {
        return this.todoList.filter(item => item.done); 
      },
      completedPercentage() {
        return (Math.floor((this.completed.length / this.todoList.length) * 100)) + "%";
      },
      today() {
        var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
  
        if(dd<10) {
            dd = '0'+dd
        } 
  
        if(mm<10) {
            mm = '0'+mm
        } 
  
        today = {
          day: weekday[today.getDay()],
          date:  mm + '/' + dd + '/' + yyyy,
        }
  
        return(today);
      }
    },
    methods: {
      getTodos() {
        if (localStorage.getItem('todo_list')) {
          this.todoList = JSON.parse(localStorage.getItem('todo_list'));
        }
      },
      addItem() {
        if (this.new_todo) {
          this.todoList.unshift({
            id: this.lastId() + 1,
            title: this.new_todo,
            done: false,
          });
        }
        this.new_todo = '';
        return true;
      },
      lastId() {
        idList = this.todoList.map(item => item.id)
        return Math.max(...idList)
      },
      deleteItem(item) {
        this.todoList.splice(this.todoList.indexOf(item), 1);
        lastId = this.lId()
      },
      toggleShowComplete() {
        this.showComplete = !this.showComplete;
      },
      clearAll() {
        this.todoList = [];
      }
    },
  });