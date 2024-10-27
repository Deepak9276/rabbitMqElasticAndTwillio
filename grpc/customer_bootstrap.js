const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(path.join(__dirname, './protos/student.proto'));
const studentProcedureProto = grpc.loadPackageDefinition(packageDefinition);

let studentProcedureStub;

module.exports.getstudentProcedureStub = () => {
    if(!studentProcedureStub){
        studentProcedureStub = new studentProcedureProto.vm.procedures.vmProcedureService(process.env.VM_GRPC_URL, grpc.credentials.createInsecure());
        return studentProcedureStub;
    }
}