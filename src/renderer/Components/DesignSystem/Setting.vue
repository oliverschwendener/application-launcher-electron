<template>
    <div class="setting">
        <div class="setting-label">
            <slot name="label"></slot>
        </div>
        <div class="setting-body">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style scoped>
.setting {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: var(--ueli-spacing-4x);
    box-sizing: border-box;
}

.setting-label {
    width: 50%;
    padding-right: var(--ueli-spacing-4x);
}

.setting-body {
    width: 50%;
}
</style>
