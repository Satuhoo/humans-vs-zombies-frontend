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

export const setUserName = (name) => ({
    type: 'SET_NAME',
    name: name
})