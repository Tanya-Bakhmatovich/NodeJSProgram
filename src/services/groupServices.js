import Group from '../models/Group';

    export const createGroup = (data) => {
        const { name, permission } = data;
        const groupData = {
            name,
            permission
        };

        return new Promise((resolve, reject) => {   
            Group.create(groupData)
                .then((gr) => resolve(gr))
                .catch(() => reject())
        })   
    }

    export const updateGroup = (data, params) => {
        const { name, permission } = data;
        const groupData = {
            name,
            permission
        };

        return new Promise((resolve, reject) => { 
            Group.update(groupData, { where: params})
                .then((gr) => resolve(gr))
                .catch(() => reject())
                
        })   
    }

    export const findAllGroups = (params) => {
        if (!params) {
            return new Promise((resolve, reject) => { 
                Group.findAll()
                    .then((us) => resolve(us))
                    .catch(() => reject())
                    
            }) 
        } else {
            return new Promise((resolve, reject) => { 
                Group.findAll({ where: params })
                    .then((gr) => resolve(gr))
                    .catch(() => reject())
                    
            }) 
        }
    }

    export const deleteGroup = (params) => {
        return new Promise((resolve, reject) => { 
            Group.destroy({ where: params })
                .then((gr) => resolve(gr))
                .catch(() => reject())               
        })   
    }
