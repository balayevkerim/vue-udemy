export default {
    getCoaches(state){
        return state.coaches
    },

    hasCoaches(state){
        return state.coaches && state.coaches.length >0
    },
    isCoach(state,_,_2,rootGetters){
        const userId= rootGetters.getUser
        return state.coaches.some(coach=>coach.id==userId)
    }
}
