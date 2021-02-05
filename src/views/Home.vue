<template>
  <div class="home">
    <div class="classes">
      <div v-for="classMap in classes" :key="classMap.id">
        <a v-if="classMap.id === 4" href="https://konstantinbiryukov.github.io/last-of-us-map/" target="_blank">
          <h2>
            {{ classMap.name }}
          </h2>
        </a>
        <router-link v-else :to="classMap.routePath">
          <h2>
            {{ classMap.name }}
          </h2>
        </router-link>
        <figure>
          <a v-if="classMap.id === 4" href="https://konstantinbiryukov.github.io/last-of-us-map/" target="_blank">
            <img class="homepage-photo" :src="require(`@/assets/homepage-photos/${classMap.image}`)"
                 :alt="classMap.name">
          </a>
          <router-link v-else :to="classMap.routePath">
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
  name: "Home",
  data() {
    return {
      classes: store.state.classes
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 1400px;
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
  justify-content: space-between;
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
</style>