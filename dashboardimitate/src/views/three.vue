<template>
  <div>
     <h1>three</h1>
     <div ref="myRef" id="container"></div>
  </div>
</template>

<script lang='ts' setup >
  import * as THREE from 'three'
  import { ref, onMounted } from 'vue';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
  import { WEBGL } from 'three/examples/jsm/WebGL.js';
  import Stats from 'three/examples/jsm/libs/stats.module.js';
  import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
  import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

</script>
<style scoped lang="scss">
#threeDemo {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
</style>
