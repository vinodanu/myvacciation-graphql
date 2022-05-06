const express = require('express')
require('./db')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const PatientModel = require('./model/patient.model')
const cors = require('cors')
const {v4} = require('uuid');
const app = express();
const AdministratorModel = require('./model/adminstrator.model')
app.use(cors());

const administrators = [];

const patients = [
    {id : "1011", name : 'kattappa', dob: new Date(1900,2,4), gender : "male", place : 'mahishmathi', bloodGroup : "O+", height : "168", weight : "90"}
]

const schema = buildSchema(`
    type Query {
        hello : String!
        patients : [Patient!]!
        patient : Patient!   
        administrators : [Administrator!]!
        administrator : Administrator!   
    }
    type Mutation {
        createPatient(data : CreatePatientInput) : Patient!
        createAdministrator(data : CreateAdminstratorInput) : Administrator!
    }
    input SearchPatientInput{
        name : String
    }
    input CreatePatientInput {
        name : String!
        dob : String!
        place : String!
        bloodGroup : String
        gender : String!
        height : String
        weight : String
    }
    input CreateAdminstratorInput {
        name : String!
        dob : String!
        vaccine : String!
        brand : String!
        hospital : String!
        dateAdministrated : String
        complete : String
    }
    type Patient {
        id : ID!
        name : String!
        dob : String!
        place : String!
        bloodGroup : String
        gender : String!
        height : String
        weight : String
    }
    type Administrator {
        id : ID!
        name : String!
        dob: String!
        vaccine : String!
        brand : String!
        hospital : String!
        dateAdministrated : String
        complete : String
    }
`)

const rootValue = {
    hello : () => "world",
    patients : () => PatientModel.find(),
    administrators : () => AdministratorModel.find(),
    createPatient: async (args) => {
        try{
            const newPatient = new PatientModel(args.data)
            const createdPatient = await newPatient.save()
            return { ...createdPatient._doc, id: createdPatient._id}
        }catch(error) {
            throw new Error(error)
        }
    },
    createAdministrator : async(args) => {
        try{
            console.log(args.data)
            const newAdmin = new AdministratorModel(args.data)
            const createdAdmin = await newAdmin.save();
            return {createdAdmin}
        }catch(error) {
            throw new Error(error)
        }
    },
    patientName : async(args) => {
        try{
            const {name} = args.search
            const isFound = await PatientModel.findOne({name})
            return isFound;
        }catch(err){
            throw new Error(err)
        }
    },
    vaccines : async(args) => {
        try{
            const vaccines = AdministratorModel.find()
            return vaccines
        }catch(err){
            console.log(err)
        }
    }
} 
app.use('/gq', graphqlHTTP({
    schema,
    rootValue,
    graphiql : true
}))

app.listen(9090, () => console.log("server started at port : 9090"))