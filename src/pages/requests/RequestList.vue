<template>
  <section>
    <base-card>
      <header>
        <h3>Request Received</h3>
      </header>
      <ul v-if="hasCoaches">
          <request-item v-for="request in requestReceived" 
          :key="request.id" 
          :email="request.email"  
          :message="request.message"></request-item>
      </ul>
      <h3 v-else> No Request received</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
  components: {
    RequestItem,
  },
    computed:{
        requestReceived(){
            return this.$store.getters['requests/getRequests']
        },
        hasCoaches(){
            return this.$store.getters['requests/hasRequests']
        }
    }
};
</script>
<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>