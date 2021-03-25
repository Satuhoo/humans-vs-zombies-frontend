export const login = (userId, isAdmin) => ({
    type: 'LOGIN',
    payload: {
        userId,
        isAdmin
    }
})

export const logout = () => ({
    type: 'LOGOUT'
})