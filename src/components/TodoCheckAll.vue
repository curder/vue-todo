<template>
    <label><input type="checkbox" 
                @click="checkAllTodos"
                :checked="!anyRemaining">Check All</label>
</template>

<script>
    export default {
        props: {
            anyRemaining: {
                type: Boolean,
                required: true,
            }
        },
        methods: {
            checkAllTodos() {
                window.eventBus.$emit('checkAllChanged', this.anyRemaining)
            }
        }
    }
</script>