<template>
    <div class="todo-item">
        <div class="todo-item-left">
            <input type="checkbox" v-model="completed" @change="doneEdit" />
            <div v-if="!editing" 
                class="todo-item-label"
                :class="{'completed': completed}"
                @dblclick="editTodo">{{ title }}</div>
            <input v-else 
                v-focus 
                class="todo-item-edit" 
                type="text"
                @blur="doneEdit"
                @keyup.enter="doneEdit"
                @keyup.esc="cancelEdit"
                :tabindex="index"
                v-model="title" />
        </div>
        <div class="remove-item" @click="removeTodo(index)">&times;</div>
    </div>
</template>
<script>
    export default {
        props: {
            todo: {
                type: Object,
                required: true,
            },
            index: {
                type: Number,
                required: true,
            },
            checkAll: {
                type: Boolean,
                required: true,
            }
        },

        watch: {
            checkAll() {
                this.completed = this.checkAll ? true: this.todo.completed
            }
        },

        directives: {
            focus: {
                inserted(el) {
                    el.focus()
                }
            }
        },

        data() {
            return {
                id: this.todo.id,
                title: this.todo.title,
                completed: this.todo.completed,
                editing: this.todo.editing,
                beforeEditCache: this.todo.beforeEditCache,
            }
        },

        methods: {
            editTodo() {
                this.beforeEditCache = this.title
                this.editing = true
            },

            doneEdit() {
                if (this.title.trim() === '') {
                    this.title = this.beforeEditCache
                }
                this.editing = false
                this.$emit("finishedEdit", {
                    index: this.index,
                    todo: {
                        id: this.id,
                        title: this.title,
                        completed: this.completed,
                        editing: this.editing,
                    }
                })
            },

            cancelEdit() {
                this.title = this.beforeEditCache
                this.editing = false
            },

            removeTodo(index) {
                this.$emit("removeTodo", index)
            }
        }
    }
</script>