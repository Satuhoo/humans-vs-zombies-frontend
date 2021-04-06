export const login = (userId, isAdmin, name) => ({
    type: 'LOGIN',
    payload: {
        userId,
        isAdmin,
        name
    }
})

export const logout = () => ({
    type: 'LOGOUT'
})