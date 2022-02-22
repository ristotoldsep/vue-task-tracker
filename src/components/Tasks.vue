<template>
    <!-- Vue loops need identical key -->
    <div :key="task.id" v-for="task in tasks">
        <Task v-on:toggle-reminder="$emit('toggle-reminder', task.id)" v-on:delete-task="$emit('delete-task', task.id)" :task="task" />
    </div>
</template>

<script>
    import Task from './Task'

    export default {
        name: 'Tasks',
        props: {
            tasks: Array,
        },
        components: {
            Task,
        },
        emits: ['delete-task', 'toggle-reminder'] //PASSING IT UP THE FILE ARCHITECTURE TO APP.VUE
    }
</script>