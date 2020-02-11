import User from '../models/User';

    export const createUser = (data) => {
        const { age, login, password, groupId } = data;
        const userData = {
            Age: age,
            Login: login,
            Password: password,
            groupId
        };

        return new Promise((resolve, reject) => {
            User.findOne({ where: { Login: login }})
            .then((existedUser) => {
                if (existedUser) {
                    User.update(userData, { where: { Login: login }})
                        .then((us) => resolve(us))
                        .catch(() => reject())
                } else {
                    User.create(userData)
                        .then((us) => resolve(us))
                        .catch(() => reject())
                }
            })
        })   
    }

    export const updateUser = (data, params) => {
        const { age, login, password, groupId } = data;
        const userData = {
            Age: age,
            Login: login,
            Password: password,
            groupId
        };

        return new Promise((resolve, reject) => { 
            User.update(userData, { where: params})
                .then((us) => resolve(us))
                .catch(() => reject())
                
        })   
    }

    export const findAllUsers = (params) => {
        if (!params) {
            return new Promise((resolve, reject) => { 
                User.findAll()
                    .then((us) => resolve(us))
                    .catch(() => reject())
                    
            }) 
        } else {
            return new Promise((resolve, reject) => { 
                User.findAll({ where: params })
                    .then((us) => resolve(us))
                    .catch(() => reject())
                    
            }) 
        }
    }

    export const deleteUser = (params) => {
        return new Promise((resolve, reject) => { 
            User.destroy({ where: params })
                .then((us) => resolve(us))
                .catch(() => reject())
                
        })   
    }
