<template>
  <div class="home">
    <div class="classes">
      <div class="class" v-for="classMap in subclasses" :key="classMap.id">
        <router-link :to="classMap.routePath">
          <h2>
            {{ classMap.id + ". " + classMap.name }}
          </h2>
        </router-link>
        <figure>
          <router-link :to="classMap.routePath">
            <img class="homepage-photo" :src="require(`@/assets/homepage-photos/${classMap.image}`)"
                 :alt="classMap.name">
          </router-link>
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store/store";

export default {
  name: "InteractiveMapClassHome",
  data() {
    return {
      subclasses: store.state.classes[2].subclasses
    }
  }
}
</script>

<style scoped>
.home {
  /*max-width: 1400px;*/
  margin: 0 auto;
  top: 20%;
  position: absolute;
}

img {
  max-width: 200px;
}

.classes {
  display: flex;
  flex-wrap: wrap;
  /*justify-content: space-evenly;*/
}

.class {
  margin: 10px;
}

a {
  color: lightseagreen;
  text-decoration: none;
}

a:hover,
a:visited {
  text-decoration: underline;
}

.homepage-photo {
  width: 250px;
}

@media screen and (max-width: 650px) {
  .home {
    top: 25%;
  }
}
</style>