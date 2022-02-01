const dbCon =  require('../../config/db.config');

const users = function (users){
    this.name = users.name
    this.email = users.email
    this.password = users.password
    this.role = users.role
    this.image = users.image 
}

users.getUsersList = (result)=>{
    dbCon.query('select * from users',(err, res)=>{
        if(err){
            throw err;
            result(null, err);
        }
        else{
            console.log('User Data');
            const data = [
                {count:1,},
                {data:res,}
            ]
            result(null, data);
        }  
    })
}
users.getUserById = (id, result)=>{
    dbCon.query("select * from users where id = ? ",id,  (err, res, felds)=>{

        if (err)
        {
            result(null, err);
        }
        else
        {
            const results = {res};
            result(null, results);
        }

    });
}
users.getUserByEmail = (email, result)=>{
    dbCon.query("select * from users where email = ? ",email,  (err, res, felds)=>{

        if (err)
        {
            result(null, err);
        }
        else
        {
            const results = {res};
            result(null, results);
        }

    });
}

users.register = (data, result) => {
    dbCon.query("insert into users set ?", data, (err, res)=>{
        if(err)
        {
            result(null, {status:true, message:err.sqlMessage});
        } 
        else 
        {
            result(null, {status:true, message:res});
        }
    } )
    
}
users.update = (id, data, result) =>{
    dbCon.query('update users set name=?,  image=? where id = ?',[data.name, data.image, id] ,(err, res)=>{
            if(err)
            {
                result(null,  {status:true, message:err});
            }
            else
            {
                result(null,  {status:true, message:res});
            }
    });
    
}



module.exports = users;