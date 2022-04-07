<template>
  <coach-filter @change-filter="setFilters"></coach-filter>
  <section>
    <base-card>
      <div class="controls">
        <base-button @click="loadCoaches" mode="outline">Refresh</base-button>
        <base-button to="/register" link> Register coach</base-button>
      </div>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasCoaches">
        <coach-item
          v-for="coach in getCoaches"
          :key="coach.id"
          :id="coach.id"
          :firstName="coach.firstName"
          :lastName="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        ></coach-item>
      </ul>

      <h2 v-else>No coach found</h2>
    </base-card>
  </section>
</template>
<script>
import CoachItem from '../../components/coaches/CoachItem.vue';

import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  created(){
    this.loadCoaches()
  },
  data() {
    return {
      isLoading:false,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(){
      
      this.isLoading= true;
      setTimeout(async () => {
         await this.$store.dispatch('coaches/loadCoachesFromServer')
      this.isLoading=false
      }, 2000);
     

    }
  },
  
  computed: {
    getCoaches() {
      const coaches =  this.$store.getters['coaches/getCoaches'];
      return coaches.filter(coach=>{
        if(this.activeFilters.frontend && coach.areas.includes('frontend')){
          return true
        }
        if(this.activeFilters.backend && coach.areas.includes('backend')){
          return true
        }
        if(this.activeFilters.career && coach.areas.includes('career')){
          return true
        }
        return false
      })
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>