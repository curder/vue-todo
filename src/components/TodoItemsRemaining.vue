<template>
<div>{{ remaining }} items left</div>
</template>
<script>
export default {
    props: {
        remaining: {
            type: Number,
            required: true,
        }
    }
}
</script>