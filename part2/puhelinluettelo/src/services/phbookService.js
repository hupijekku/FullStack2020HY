import axios from 'axios'

const url = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(url)
}

const savePerson = (person) => {
    return axios.post(url, person)
}

const deletePerson = (id) => {
    return axios.delete(`${url}/${id}`)
}

const updatePerson = (id, person) => {
    return axios.put(`${url}/${id}`, person)
}

export default {
    getAll: getAll,
    savePerson: savePerson,
    deletePerson: deletePerson,
    updatePerson: updatePerson
}