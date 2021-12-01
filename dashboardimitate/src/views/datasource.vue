<!-- 数据概览 data-overview -->
<template>
  <div class="data-overview-content">
      <div class="data-overview-content-l">
        <div class="data-content">
          <div>头部</div>
          <div class="data-list-content">
              <div class="data-list-info">
                <p>近30天的订单量</p>
                <span>1</span>
              </div>
              <div class="data-list-info">
                <p>近30天的订单量</p>
                <span>1</span>
              </div>
              <div class="data-list-info">
                <p>近30天的订单量</p>
                <span>1</span>
              </div>
              <div class="data-list-info">
                <p>近30天的订单量</p>
                <span>1</span>
              </div>
            </div>
        </div>
      </div>
      <div class="data-overview-content-r">

      </div>
  </div>
</template>

<script lang="ts"  setup >
</script>
<style lang="scss" scoped>
  .data-overview-content{
    display: flex;
    width: 100%;
    .data-overview-content-l{
      width: 75%;
      height: 100%;
      .data-content{
        padding: 12px;
        .data-list-content{
        display: flex;
        justify-content: space-around;
        width: 100%;
        height: 100px;
        .data-list-info{
          width: 25%;
          > span{
            font-size: 20px;
          }
        }
      }
      }

    }
    .data-overview-content-r{
      width: 25%;
      height: 100%;
    }
  }
</style>
