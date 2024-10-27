// const schedule = require('node-schedule');
// const studentService  =  require('../services/studentService');

// const Cron = async()=>{
//     // updateStudentName();
//         const job = schedule.scheduleJob('*/10 * * * * *', async()=>{
//             await updateStudentName();
//             console.log("updated");
//         });
//         console.log("job",job);
// }    
// const updateStudentName =  async()=>{
//     var date = new Date('2024-05-26T10:00:24.149Z');
//     const details =  await studentService.getStudentByEmail('deepak@gmail.com'); 
//     const updateBody ={
//         'email':'deepak@gmail.com',
//         'name':'Rahul'
//     };
//     //console.log();
//     if(true){
//        console.log("commng");
//        const updateStudent =  await studentService.updateStudent(updateBody);
//        console.log(updateStudent);
//     }

// }
// Cron();
