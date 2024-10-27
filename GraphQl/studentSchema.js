// schema/schema.js
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLScalarType,
} = require("graphql");
const Student = require("../models/studenModel");

// Student Type
const StudentType = new GraphQLObjectType({
  name: "Student",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    student: {
      type: StudentType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        // Fetch data from MongoDB using Mongoose
        return Student.findById(args._id);
      },
    },
    students: {
      type: new GraphQLList(StudentType),
      resolve() {
        return Student.find();
      },
    },
  },
});

// Mutations (Create, Update, Delete)
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addStudent: {
      type: StudentType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(parent, args) {
        const student = new Student({
          name: args.name,
          email: args.email,
        });
        return student.save();
      },
    },
    deleteStudent: {
      type: StudentType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        return Student.findByIdAndDelete(args._id);
      },
    },
    updateStudent: {
      type: StudentType,
      args: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Student.findByIdAndUpdate(
          args.id,
          { $set: { name: args.name, age: args.email } },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

/****
 * 
 * Get All Students
 * {
  students {
    _id
    name
    email
  }
}

 * 
Get Single Records
{
  student(_id: "STUDENT_ID_HERE") {
    name
    email
  }
}

 * 

Add new Students
mutation {
  addStudent(name: "John Doe", email: 22, major: "Computer Science") {
    _id
    name
    email
  }
}

 * 
 * 
 * 
 Update Students
 mutation {
  updateStudent(_id: "STUDENT_ID_HERE", name: "Jane Doe", email: 23) {
    _id
    name
    email
  }
}

 * 
 * 
 Delete Student

 mutation {
  deleteStudent(_id: "STUDENT_ID_HERE") {
    _id
    name
  }
}

 * 
 * 
 */
