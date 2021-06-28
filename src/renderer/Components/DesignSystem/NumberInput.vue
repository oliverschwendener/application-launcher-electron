<template>
    <input class="input" type="number" v-model="localValue" @change="changed" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        value: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            localValue: this.value,
        };
    },

    methods: {
        changed() {
            this.$emit("changed", Number(this.localValue));
        },
    },
});
</script>

<style scoped>
.input {
    width: 100%;
    background-color: var(--ueli-black-800);
    border: 1px solid var(--ueli-black-700);
    padding: var(--ueli-spacing-1x);
    box-sizing: border-box;
    border-radius: var(--ueli-corners);
    color: var(--ueli-white);
    transition: var(--ueli-transition);
    font-family: var(--ueli-font-family);
}

.input:focus {
    border: 1px solid var(--ueli-black-400);
    outline: none;
}
</style>
