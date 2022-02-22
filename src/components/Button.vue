<template>
    <!--we can use @click instead of v-on:click="" -->
    <button @click="onClick()" :style="{background: color}" class="btn">{{text}}</button> 
</template>

<script>
    export default {
        name: 'Button',
        props: {
            text: String,
            color: String
        },
        methods: {
            onClick() {
                console.log("CLICK")
            }
        }
    }
</script>