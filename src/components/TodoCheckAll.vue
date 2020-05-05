<template>
  <label><input type="checkbox"
                @click="checkAllTodos"
                :checked="!anyRemaining">Check All</label>
</template>

<script>
export default {
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining
    }
  },
  methods: {
    checkAllTodos() {
      this.$store.dispatch('checkAll', event.target.checked)
    }
  }
}
</script>
