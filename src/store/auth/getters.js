export default {
    getUser(state){
        return state.userId
    },
    isAuthenticated(state){
        return !!state.token
    },
    getToken(state){

        return state.token
    }
}