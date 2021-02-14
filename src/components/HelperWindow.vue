<template>
  <div v-if="isHelperActive" id="helper-window">
    <button id="show-modal" @click="showModal = true">Show Modal</button>
    <modal v-if="showModal" @close="showModal = false">
      <!--    <h3 slot="header">custom header</h3>-->
    </modal>
    <v-dialog persistent v-model="showModal" max-width="290">

    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "HelperWindow",
  data() {
    return {
      showModel: false,
      isHelperActive: true
    }
  }
}
</script>

<style scoped>
#helper-window {

}
</style>