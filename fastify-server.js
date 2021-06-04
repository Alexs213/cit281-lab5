const students = [
    {
      id: 1,
      last: "Last1",
      first: "First1",
    },
    {
      id: 2,
      last: "Last2",
      first: "First2",
    },
    {
      id: 3,
      last: "Last3",
      first: "First3",
    }
  ];

// Require the Fastify framework and instantiate it
const fastify = require("fastify")();
// Handle GET verb for / route using Fastify
// Note use of "chain" dot notation syntax
//student route
fastify.get("/cit/student", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(students);
});
//student ID route
fastify.get("/cit/student/:id", (request, reply) => {
    //Recieve Request
    console.log(request);
   // let studentIDFormClient = request.params.id;
    let studentIDClient = request.params.id;
    //Do something with the information in the request
    //let studentToGiveToClient = null;
    let studentToGiveClient = null;

    for (studentFromArray of students) {
        //if (studentFromArray.id == studentIDFormClient){
          if (studentFromArray.id == studentIDClient){
            //studentToGiveToClient = studentFromArray;
            studentToGiveClient = studentFromArray;
            break;
        }
    }
    //Provide a response
    //if (studentToGiveToClient != null){
      if (studentToGiveClient != null){
        reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      //.send(studentToGiveToClient);
      .send(studentToGiveClient);
    }
    else {
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send("Could not find student with given ID");
    }
  });

  // An undefined/wildcard route

  fastify.get("*", (request, reply) => {
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("<h1>At Wildcard Route</h1>");
  });

  fastify.post("/cit/students/add", (request, reply) => {
    // get requesst from client
  
    let dataclient = JSON.parse(request.body)
    //console.log(dataclient);
    //do something with the req
  
    // 1. figure out the max id currently in the array 'students'
      let maxID = 0;
      for (individualStudent of students) {
        if (maxID < individualStudent.id){
          maxID = individualStudent.id;
        }
      }
  
    // 2. create a new student object
      //fname = dataclient.firstname
      // ..
      // id = maxID + 1
   let generatedStudent = {
        id: maxID+1,
        last: dataclient.lname,
        first: dataclient.fname,
      };
    // 3. add student object in 2 into array
    students.push(generatedStudent);
    // 4. send student object created in 2. back to the client
  
    // reply to client
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(generatedStudent);
  });


  // Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});