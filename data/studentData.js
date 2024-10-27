const studenModel = require('../models/studenModel');

exports.register = async(body) => {
    let student = new studenModel(body);
    return student.save();
}

exports.getStudentByEmail = async(email) => {
    return await studenModel.find({'email':email});
}

exports.updateStudent = async(updateBody)=>{
    return await studenModel.updateOne({"email":updateBody.email},{$set:{'name':updateBody.name}})

}
