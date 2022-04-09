<template>
  <base-dialog :show="!!error" title="Error occured" @close="closeDialog">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h3>Request Received</h3>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="!isLoading && hasRequests">
        <request-item
          v-for="request in requestReceived"
          :key="request.id"
          :email="request.email"
          :message="request.message"
        ></request-item>
      </ul>
      <h3 v-else>No Request received</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
  components: {
    RequestItem,
  },
  data() {
    return {
      error: null,
      isLoading: false,
    };
  },
  created() {
    this.fetchRequest();
  },
  computed: {
    requestReceived() {
      return this.$store.getters['requests/getRequests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },
  },

  methods: {
    closeDialog() {
      this.error = null;
    },
    async fetchRequest() {
      try {
        this.isLoading = true;
        await this.$store.dispatch('requests/loadRequests');
        this.isLoading = false;
      } catch (error) {
        console.log(error, 'err');
        this.error = error.message || 'Something went wrong.';

        this.isLoading = false;
      }
    },
  },
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