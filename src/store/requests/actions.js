export default {
    async contactCoach(context, payload) {
        const newRequest = {
            message: payload.message,
            email: payload.email,
        }

        const response = await fetch(`https://vue-demo-54831-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        })
        const responseData = await response.json()
        if(!response.ok){
            const error  = new Error(responseData.message || ' Something went wrong');

            throw error
        }
        newRequest.id = responseData.name
        newRequest.coachId = payload.coachId

        context.commit('contactCoach', newRequest)
    },

    async loadRequests(context) {
        const coachId = context.rootGetters.getUser
        const token = context.rootGetters.getToken

        const response = await fetch(`https://vue-demo-54831-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`)

        const responseData = await response.json();
        if(!response.ok){
            const error  = new Error(responseData.message || 'Failed to fetch, Something went wrong');

            throw error
        }
        const requests = []

        for (const key in responseData) {
            const request = {
                id: key,
                email: responseData[key].email,
                message: responseData[key].message,
                coachId:coachId
            }
            requests.push(request)
        }
        context.commit('setRequests', requests)
    }
}