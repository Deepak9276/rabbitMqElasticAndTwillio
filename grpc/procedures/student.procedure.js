const studentService =  require('../../services/studentService');

async function getStudentById(call,callback){
    const studentData  =  await studentService.getStudentById(call.request.id);
    studentData.on('data', doc =>{
        call.write({data: JSON.stringify(doc)});
    }).on('end', () => {
        console.log('Send Data');
        call.end();
    })
}