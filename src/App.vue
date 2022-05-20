<template>
  <div :class="preClass">
    <hello-world/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ClassConstant } from "@config/index";
import HelloWorld from "./components/HelloWorld.vue";

@Options({
  components: { HelloWorld },
})
export default class App extends Vue {
  private preClass = `${ClassConstant.PRE_CLASS}-home-Main`;
}
</script>

<style lang="scss">
$preClass: getClass("home-Main");
* {
  margin: 0;
}
.#{$preClass} {
  height: 100vh;
  width: 100%;
}
</style>
