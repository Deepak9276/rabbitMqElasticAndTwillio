const express =  require('express');
const router = express.Router();

const studentController =  require('./controllers/studentController');

router.post('/Saved',studentController.register);
router.get('/getStudentByEmail/:email',studentController.getStudentByEmail);

module.exports = router;