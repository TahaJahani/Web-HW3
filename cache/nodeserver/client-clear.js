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

const ClearCacheService = apiProto.ClearCacheService;

const client = new ClearCacheService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.Clear(null, (error, _) => {
    console.log("Cleared cache");
});