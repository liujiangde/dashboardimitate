<template>
    <n-config-provider :theme="darkTheme">
      <n-global-style />
      <n-message-provider>
        <n-dialog-provider>
          <slot/>
        </n-dialog-provider>
      </n-message-provider>
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
