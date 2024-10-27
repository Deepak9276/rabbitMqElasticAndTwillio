const studentData  = require('../data/studentData');
const redisService =  require('../redis/redis');
exports.register = async(body)=>{
    try{
        let inputBody ={
            name: body.name,
            mobile_number: body.mobile_number,
            email: body.email,
            password: body.password
        };
        
         const student  = await studentData.register(inputBody);
         // await redisService.saveDataInRedis(student.email,student);
         return {
            status: true,
            data: student
         }
    }catch(err){
        console.log(err);
        return {
            status: false,
            data: err
        }
    }
    
};

exports.getStudentByEmail = async(email) =>{
    //return await redisService.getDataFromRedis(email);
    //console.log(redisData);
    // if(redisData.length > 0 )
    //     return redisData;
    return await studentData.getStudentByEmail(email);
};

exports.updateStudent = async(updateBody)=>{
    return await studentData.updateStudent(updateBody);

}
exports.cornService = async() =>{
   
}