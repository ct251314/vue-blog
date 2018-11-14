import query from '../utils/query'

class UserModel {
    async getUserByName(user){
        return await query(`SELECT user,password FROM user WHERE USER='${user}'`)
    }
}
export default new UserModel()
