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
    client.SetKey({ id: key, contents: value }, (error, e2) => {
        console.log("Saved into cache");
    });
}

export function get(key, onFetch) {
    const GetCacheService = apiProto.GetCacheService;
    const client = new GetCacheService(
        "localhost:50051",
        grpc.credentials.createInsecure()
    );
    client.GetKey({ id: key }, (error, cacheItem) => {
        if (cacheItem.contents == -1)
            onFetch(null)
        else {
            onFetch(JSON.parse(cacheItem.contents))
            console.log("Successfully fetched from cache");
        }
    });
}

export function clear() {
    const ClearCacheService = apiProto.ClearCacheService;
    const client = new ClearCacheService(
        "localhost:50051",
        grpc.credentials.createInsecure()
    );

    client.Clear(null, (error, _) => {
        console.log("Cleared cache");
    });
}