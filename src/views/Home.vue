<template>
  <!--   <div v-if="showAddTask">
        <AddTask 
            @add-task="addTask" 
        />
    </div> -->
   
        <AddTask v-show="showAddTask"
            @add-task="addTask" 
        />

    <Tasks 
        @toggle-reminder="toggleReminder" 
        @delete-task="deleteTask" 
        :tasks="tasks" 
    />
</template>

<script>
import Tasks from '../components/Tasks'
import AddTask from '../components/AddTask'

export default {
    name: 'Home',
    props: {
        showAddTask: Boolean,
    },
    components: {   
        Tasks,
        AddTask
    },
    data() {
        return {
            tasks: [],
        }
    },
    methods: {
   /*  toggleAddTask() {
      //Negate the default value
      this.showAddTask = !this.showAddTask
    }, */ //THIS WE NEED IN APP.VUE

    async addTask(task) {
      const res = await fetch('api/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(task),
      })
 
      const data = await res.json() //Added after json-server

      // this.tasks = [...this.tasks, task] //First spread the current array and add to it! //ADDED JSON SERVER NOW
      this.tasks = [...this.tasks, data] //First spread the current array and add to it!
    },
    async deleteTask(id) {
      // console.log('task: ', id)
      if (confirm('Are you sure?')) {
        const res = await fetch(`api/tasks/${id}`, {
          method: 'DELETE',
        })
      
      res.status === 200 ? (this.tasks = this.tasks.filter((task) => task.id !== id) /*We want everything back except the id that was deleted (clicked)*/) : alert('Error deleting task') 
      }
    },
    async toggleReminder(id) {
      const taskToToggle = await this.fetchTask(id)
      const updTask = {...taskToToggle, reminder: !taskToToggle.reminder} //Toggle the task reminder

      const res = await fetch(`api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',  
        }, 
        body: JSON.stringify(updTask)
      })

      const data = await res.json()

      // console.log(id)
      //on click negate the task.reminder
      // this.tasks = this.tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task)
      this.tasks = this.tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task)
    },
    async fetchTasks() {
      // const res = await fetch('http://localhost:5000/tasks')
      //ADDED vue.config.js => api = localhost....
      const res = await fetch('api/tasks')

      const data = await res.json()

      return data;
    },

    async fetchTask(id) {
      const res = await fetch(`api/tasks/${id}`)

      const data = await res.json()

      return data;
    },
  },
  async created() {
    //Initially hardcoded the "backend"
    /* this.tasks = [
      {
        id: 1,
        text: 'Doctors Appointment',
        day: 'March 3rd at 1pm',
        reminder: true,
      },
       {
        id: 2,
        text: 'Just Appointment',
        day: 'March 1st at 2pm',
        reminder: true,
      },
      {
        id: 3,
        text: 'Go running',
        day: 'March 1st at 2pm',
        reminder: false,
      },
    ] */
    //Now used json-server for imitating a real db
    this.tasks = await this.fetchTasks()
  }
}
</script>