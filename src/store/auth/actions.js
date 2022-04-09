let timer;
export default {

    autoLogin(context) {

        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        const expirationDate = localStorage.getItem('expiresIn')
        const isExpired = +expirationDate - new Date().getTime()

        if (isExpired < 0) {
            return
        }
        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId
            })
        }
    },
    async login(context, payload) {
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
        console.log(responseData)
        const expiresIn = +responseData.expiresIn *1000
        const expirationDate = new Date().getTime() + expiresIn
        localStorage.setItem('token', responseData.idToken)
        localStorage.setItem('userId', responseData.localId)
        localStorage.setItem('expiresIn', expirationDate)

        timer = setTimeout(() => {
            context.dispatch('logout')
        }, expiresIn);
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to sign up!')
            throw error
        }
        const loggedInUser = {
            userId: responseData.localId,
            token: responseData.idToken,
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
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to sign up!')
            throw error
        }
        const newUser = {
            userId: responseData.localId,
            token: responseData.idToken,
        }
        context.commit('setUser', newUser)
    },

    logout(context) {
        localStorage.clear()
        context.commit('setUser', {
            userId: null,
            token: null,
        })
        clearTimeout(timer)
    }
}