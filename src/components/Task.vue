<template>
    <div @click="$emit('toggle-reminder', task.id)" :class="[task.reminder ? 'reminder' : '', 'task']">
        <h3>{{ task.text }}
            <!-- this is another method to emit method (need to declare it below) -->
            <i @click="onDelete(task.id)" class="fas fa-times"></i>
        </h3>
        <p>{{ task.day }}</p>
    </div>
    
</template>

<script>
    export default {
        name: 'Task',
        props: {
            task: Object,
        },
        methods: {
            onDelete(id) {
                // console.log(id)
                this.$emit('delete-task', id) //PASSING THE METHOD UP TO TASKS.VUE, and there passing it up to App.vue
            },
        }
    }
</script>

<style scope>
.fas {
  color: red;
}
.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.task.reminder {
  border-left: 5px solid green;
}
.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>