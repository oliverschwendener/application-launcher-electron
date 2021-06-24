<template>
    <i class="bi" :class="className"></i>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        icon: {
            type: String,
            required: true,
        },
    },

    computed: {
        className(): string {
            return `bi-${this.icon}`;
        },
    },
});
</script>
