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

export function set(key, value) {
    const SetCacheService = apiProto.SetCacheService;
    const client = new SetCacheService(
        "localhost:50051",
        grpc.credentials.createInsecure()
    );
    client.SetKey({ id: 'hi', contents: 'hello' }, (error, e2) => {
        console.log("Saved hi->hello into cache");
    });
}

export function get(key) {
    const GetCacheService = apiProto.GetCacheService;
    const client = new GetCacheService(
        "localhost:50051",
        grpc.credentials.createInsecure()
    );
    client.GetKey({ id: 'hi' }, (error, cacheItem) => {
        console.log(cacheItem.id, cacheItem.contents); // if contents = -1 then key doesnt exist in the cache
    });
}

export function clear(key) {
    const ClearCacheService = apiProto.ClearCacheService;
    const client = new ClearCacheService(
        "localhost:50051",
        grpc.credentials.createInsecure()
    );

    client.Clear(null, (error, _) => {
        console.log("Cleared cache");
    });
}