export default {
    getRequests(state,_2,_,rootGetters){
        const coachId =  rootGetters.getUser

        return state.requests.filter(req=>req.coachId==coachId)
    },

    hasRequests(_,getters){
        return getters.getRequests && getters.getRequests.length > 0
    }
}