<template>
<div>
    <button :class="{'active': filter === 'all'}" @click="changeFilter('all')">All</button>
    <button :class="{'active': filter === 'active'}" @click="changeFilter('active')">Active</button>
    <button :class="{'active': filter === 'completed'}" @click="changeFilter('completed')">Completed</button>
</div>
</template>
<script>
export default {
    props: {
        filter: {
            type: String,
            required: true,
        }
    },

    methods: {
        changeFilter(filter) {
            window.eventBus.$emit('filterChanged', filter)
        }
    }
}
</script>