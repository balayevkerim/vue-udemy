<template>
    
    <section>
        <base-card>
            <h2>{{fullName}}</h2>
            <h3>{{rate}} / hour</h3>
        </base-card>
    </section>

    <section>
        <base-card>
            <h2>Interested ? Contact now</h2>
            <base-button link :to="contactLink">Contact</base-button>
            <router-view></router-view>
        </base-card>
    </section>
    <section>
        <base-card>
            <base-badge v-for="area in selectedCoach.areas" 
            :key="area.id"
            :title="area"
            :type="area"></base-badge>
            <p>{{selectedCoach.description}}</p>
        </base-card>
    </section>
</template>

<script>
export default {
    
    props:['id'],
    data(){
        return{
            selectedCoach :null
        }
    },
    
    created(){
        this.selectedCoach =  this.$store.getters['coaches/getCoaches'].find(
            coach=>coach.id==this.id
        )
    },
    computed:{
        fullName(){
            return this.selectedCoach.firstName +' ' + this.selectedCoach.lastName
        },
        rate(){
            return this.selectedCoach.hourlyRate
        },
        contactLink(){
            return '/coaches/' +this.$route.params.id+ '/contact'
        }   
    }
}
</script>