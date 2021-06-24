<template>
    <div class="icon-button"><Icon :icon="icon" /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Icon from "./Icon.vue";

export default defineComponent({
    components: {
        Icon,
    },

    props: {
        icon: {
            type: String,
            required: true,
        },
    },
});
</script>

<style scoped>
.icon-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    transition: var(--ueli-transition);
    cursor: pointer;
    opacity: 0.8;
    width: 20px;
    height: 20px;
}

.icon-button:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.2);
}

.icon-button:active {
    background-color: rgba(0, 0, 0, 0.3);
}
</style>
