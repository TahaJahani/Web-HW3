const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./apifile.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const apiProto = grpc.loadPackageDefinition(packageDefinition);

const SetCacheService = apiProto.SetCacheService;

const client = new SetCacheService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.SetKey({id: 'hi', contents: 'hello'}, (error, e2) => {
    console.log("Saved hi->hello into cache");
});