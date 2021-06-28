<template>
    <div class="container">
        <div v-if="hasTitle" class="title">{{ title }}</div>
        <div class="settings">
            <slot name="settings"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        title: {
            type: String,
            required: false,
            default: "",
        },
    },

    computed: {
        hasTitle(): boolean {
            return this.title !== "";
        },
    },
});
</script>

<style scoped>
.container {
    padding: var(--ueli-spacing-4x);
    box-sizing: border-box;
}

.title {
    font-size: var(--ueli-font-size-24);
}

.settings {
    display: flex;
    flex-direction: column;
    width: 100%;
}
</style>
