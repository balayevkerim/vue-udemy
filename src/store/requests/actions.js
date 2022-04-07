export default {
    contactCoach(context,payload){
        const newRequest = {
            id:new Date().toISOString,
            message:payload.message,
            email:payload.email,
            coachId:payload.coachId
        }

        context.commit('contactCoach',newRequest)
    }
}