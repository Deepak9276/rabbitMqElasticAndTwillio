const express =  require('express');
const app = express();
require('dotenv').config();
const rabit = require('./app');
const elastic = require('./elasticSearch');
const sendEmail  = require('./email_config');



app.use(express.json());

app.get("/send-msg", async(req, res) => {
    
  // data to be sent
  const data = {
      title  : "Six of Crows",
      author : "Leigh Burdugo"
  }
  const reps = await rabit.sendData(data);  // pass the data to the function we defined
  console.log("A message is sent to queue")
  res.send(reps); //response to the API request
  
})
//Elastic Search 
 // 1.Make a Index
 app.post('/elastic_index',async(req,res)=>{  
  const res_data  =  await elastic.create_index(req.body.index,req.body.body);
  res.json({status:true,data:res_data});
 })
 //2.Create Document
 app.post('/insert_document',async(req,res)=>{
  const res_data  =  await elastic.insert_document(req.body.index,req.body.document);
  res.json({status:true,data:res_data});
})

//3. Get Documents
app.get('/get_documents/:record',async(req,res)=>{
  const res_data  =  await elastic.getAllDocuments(req.params.record);
  res.json({status:true,data:res_data});
})

//4. Delete Documents
app.delete('/delete_document/:index/:documentId',async(req,res)=>{
  const res_data  =  await elastic.deleteDocument(req.params.index,req.params.documentId);
  res.json({status:true,data:res_data});
})

//Update Document
//5. Update Documents
app.put('/update_document',async(req,res)=>{
  const res_data  =  await elastic.updateDocument();
  res.json({status:true,data:res_data});
})

//6. Search Documents
app.get('/search',async(req,res)=>{
  const res_data  =  await elastic.searchDocuments(req.body.index,req.body.prefix);
  res.json({status:true,data:res_data});
})
app.listen(4000,async()=>{
  console.log(
    `\n Server listening on port: 4000`
  );
})

/***
 * Delete Index
 */
app.delete('/delete_index/:index',async(req,res)=>{
  const res_data  =  await elastic.delete_index(req.params.index);
  res.json({status:true,data:res_data});
})

app.post("/autoCompleteSearch",async(req,res)=>{
    const resp =  await elastic.autoCompleteSearch(req.body.index,req.body.text);
    res.json({status:true,data:resp});
});
app.post("/DjangoautoCompleteSearch",async(req,res)=>{
  const resp =  await elastic.DjangoautoCompleteSearch(req.body.index,req.body.text);
  res.json({status:true,data:resp});
});
// 1.Django a Index
app.post('/Django_elastic_index',async(req,res)=>{  
  const res_data  =  await elastic.create_index(req.body.index,req.body.body);
  res.json({status:true,data:res_data});
 })
//Update Index
app.put('/update_index',async(req,res)=>{  
  const res_data  =  await elastic.update_index(req.body.index,req.body.body);
  res.json({status:true,data:res_data});
 })
 
//Twillio For Send Msg
  app.post('/send_sms', async(req,res)=>{
      const accountSid = process.env.accountSid;
      const authToken = process.env.authToken;
      const client = require('twilio')(accountSid, authToken);
      await client.messages
          .create({
                    body:"Hii Dear",
                    from: process.env.twi_from,
                    to: process.env.twi_to
          })
          .then(message => console.log(message.sid))
  })

elastic.elastic_connection();
// rabit.send();


app.post('/Send_email',async(req,res)=>{
  await sendEmail.sendEmail();
})