<template>
    <n-config-provider :theme-overrides="{ common: { fontWeightStrong: '600' } }" >
      <n-global-style />
      <n-loading-bar-provider>
          <n-message-provider>
            <n-dialog-provider>
              <slot/>
            </n-dialog-provider>
          </n-message-provider>
        </n-loading-bar-provider>
    </n-config-provider>


</template>
<script lang='ts'>
  import { defineComponent } from 'vue'
  import { darkTheme } from 'naive-ui'
  export default defineComponent({
    setup() {
      return {
        darkTheme
      }
    }
  })
</script>
