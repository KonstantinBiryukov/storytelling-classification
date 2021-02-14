<template>
  <div id="helper-checkbox">
    <input type="checkbox" id="helper" name="helper" v-model="checked">
    <label for="helper">Turn <span id="checkbox-status"> {{ checked ? "off" : "on" }} </span> the helper mode</label>
  </div>
</template>

<script>
export default {
  name: "HelperCheckbox",
  data() {
    return {
      checked: true
    }
  }
}
</script>

<style scoped>
#checkbox-status {
  color: red;
  font-weight: bold;
}

#helper-checkbox {
  text-align: right;
}
</style>