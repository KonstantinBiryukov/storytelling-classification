// Vue Router Named Routes and Params
// 1) If we click on 'Root' in DevTools we will see that we have the special '$route' property. Via this variable we have
// an access not just to 'path' and 'name', but also 'params', 'query' and 'meta'.
// 2) We can access all this data in our components - because we use the router plugin with the Vue.use(router), we can
// actually access the router instance under this.$route in any component, since it's made globally available on
// the main Vue instance.
// 3) In a normal travel app we would have hundreds of destinations, and we cannot afford to create a page for each one.
// By using 'route' params, we can load only one page, but with the correct details for each destination
// 4) We proceed from creating DestinationDetails.vue and adding it to the router file
// 5) Then, in our Home page we need to make our destination name and image link to this new page.
// We will use named routes instead of linking directly to each path. Named roots allows us to link directly to the route
// without knowing the path, which means if you later change the path, then we don't need to refactor anything here
// or in any other component that links to that page as everything is controlled in router.js. It's recommended ALWAYS
// use named routes.
// 6) To use 'named routes' we just need to add an Object with the 'name' property and the value being the name
// of the page you want to link to. We have to change the path of our details route in router.js.
// 7) So, now all our links leads to DestinationDetails component and shows its template. Now we have to add the 'id'
// of the Destination, so when we click on destination, it will show the correct id. To do this, we need to use 'params'.
// In our Home page we need to tell the router link to pass params of id and make it equal to the id that comes from
// our destination data.

// 1) we add params that are available to us trough the route property
<!--<template>-->
<!--<p>The destination is : {{ this.$route.params.id }}</p>-->
<!--</template>-->

// 2) we add the destination name, the description and the photos.
// 3) But how it works ? How will it know which destination to show ? Let's add a computed property with a function called
// 'destination'
<template>
  <section class="destination">
    <!--    <h1> {{ classMap.id + ". " + classMap.name }}</h1>-->
    <div class="destination-details">
      <!--      <img :src="require(`@/assets/${classMap.image}`)" alt="classMap.name">-->
      <!--      <p> {{ classMap.description }}</p>-->
    </div>
  </section>
</template>

<script>
import store from "@/store/store";

export default {
  // 1) we need to retrieve the value from the params, so we'll create a new data property called destinationId and
  // give it a value of this.$route.params.id
  // 2)  It's great to use id, but wouldn't it be better if we could see the name of the destination in the URL
  // instead of an id (in router.js). let's change the params from 'id' to 'slug' and we'll change our
  // destination id for slug in DestinationDetails as well.
  // 3)  using $route component creates a tight coupling with the route which limits the flexibility of the components,
  // as it can only be used on certain URLs. To decouple this component from the router, we can use props. Let's refractor
  // our app to use props instead of the $route. In our router.js file let's add the props property.
  // Then, we need to add our props in DestinationDetails, so we don't need slug in data anymore, we are now
  // getting this value directly from props
  data() {
    return {
      // slug: this.$route.params.slug
    }
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  // computed allows us to define properties in the same way as in 'data' section, but it also have some extra
  // custom logic that is cached based on its dependencies. We can use JS 'find' method which returns the value
  // of the 1st element in the array that satisfies the provided testing function. We can run 'find' method
  // on the 'store.destinations'. We do that by changing it to the end of the 'store.destinations' and inside the
  // brackets we create an arrow function and pass in the destination. We then check to see if the destination.id
  // is equal to the destinationId, which is our '$route.params.id'. By returning it we get the value we want.
  // Basically, we are saying :
  // 1) Go to the store;
  // 2) Use 'destinations' array;
  // 3) Find the destination whose id is equal to the 'destinationId' that we get from the params;
  // now we will see id in the end of the url. details/1, and we can check all info in Route tab of DevTools
  computed: {
    classMap() {
      return store.state.classes.find(classMap => classMap.slug === this.slug);
    }
  }
}
</script>

<style scoped>
img {
  max-width: 600px;
  height: auto;
  width: 100%;
  max-height: 400px;
}

.destination-details {
  display: flex;
  justify-content: space-between;
}

p {
  margin: 0 40px;
  font-size: 20px;
  text-align: left;
}
</style>