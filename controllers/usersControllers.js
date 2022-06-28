const data  = require('../MOCK_DATA.json')
const mssql = require('mssql')
const sqlConfig = require('../config/config');
const { user } = require('../config/config');
const poolPromise = require('../config/poolPromise')

module.exports = {
    home: (req, res)=>res.send('It feels good to be 127.0.0.1'),

    //get all users
    
    getUsers: async(req, res)=>{
            let pool = await poolPromise()
            pool.query(`select * FROM usersData`).then(results=>{
                console.log(results.recordset)
                res.json({
                    status:200,
                    success: true,
                    message: "success",
                    results:results.recordset})
            }

            )
        

        
    },

    //get user by email
    getUser: (req, res)=>{
        const {email} = req.params
        const user = data.find(user=>user.email===email)
        if(user){
        return res.status(200).json({
            status:200,
            success: true,
            message: "success",
            results:user})}
    
            res.status(404).json({
                status:404,
                success: false,
                message: "not found",
                results:{}})
    },

    // login
    login: (req, res)=>{
        const {email, Password} = req.body
        const user = data.find(user=>user.email===email)
        if(user && user.Password=== Password){
            return res.json({
                status:200,
                success: true,
                message: "Logged in successfully",
                results:user})}
            
            res.status(403).json({
                status:404,
                success: false,
                message: "Wrong credentials",
                results:{}})

        
    },

    create: async(req, res)=>{
        let {id, first_name, last_name, email, gender, Password} = req.body
            let pool = await poolPromise()
            pool.query(`insert into usersData 
                        VALUES('${id}', '${first_name}', '${last_name}', '${email}', '${gender}', '${Password}')`)
                        .then(results=>{
                            if(results.rowsAffected){
                                res.send("user added")
                                console.log("user added")
                            }})
              
        }   
}