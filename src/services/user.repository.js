const UserRepository = (userDAO) => {
    
    const getAll = async() => await userDAO.getAll()
    const getById = async(id) => await userDAO.getById(id)
    const create = async(data) => await userDAO.create(data)
    const update = async(id, data) => await userDAO.update(id, data)
    const delet = async(id) => await userDAO.delete(id) 
    const findOne = async (query) => await userDAO.findOne(query)

    
    return {
        getAll,
        getById,
        create,
        update,
        delet,
        findOne,
    }
}
    export default UserRepository