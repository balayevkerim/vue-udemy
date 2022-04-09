
export default {

    async login(context,payload) {
        const body = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
        }
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDpU53d-uZecfy1K3gBeAy7347R5a_0wwY"
            , {
                method: 'POST',
                body: JSON.stringify(body)
            })

        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to sign up!')
            throw error
        }
        const loggedInUser = {
            userId: responseData.localId,
            token: responseData.idToken,
            tokenExpiration: responseData.expiresIn
        }

        context.commit('setUser', loggedInUser)

    },
    async signUp(context, payload) {
        const body = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
        }
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDpU53d-uZecfy1K3gBeAy7347R5a_0wwY"
            , {
                method: 'POST',
                body: JSON.stringify(body)
            })

        const responseData = await response.json();
        console.log(responseData)
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to sign up!')
            throw error
        }
        const newUser = {
            userId: responseData.localId,
            token: responseData.idToken,
            tokenExpiration: responseData.expiresIn
        }
        context.commit('setUser', newUser)
    },

    logout(context){
        context.commit('setUser',{
            userId:null,
            token:null,
            tokenExpiration:null
        })
    }
}