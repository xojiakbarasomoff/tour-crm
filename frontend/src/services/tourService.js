import api from './api'

export const getTours = async () => {
    const response = await api.get('/tours/')
    return response.data
}

export const createTour = async (data) => {
    const response = await api.post('/tours/', data)
    return response.data
}

export const updateTour = async (id, data) => {
    const response = await api.put(`/tours/${id}`, data)
    return response.data
}

export const deleteTour = async (id) => {
    const response = await api.delete(`/tours/${id}`)
    return response.data
}