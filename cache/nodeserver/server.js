// used code in https://daily.dev/blog/build-a-grpc-service-in-nodejs

const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./apifile.proto";
const {Mutex} = require("async-mutex");
var protoLoader = require("@grpc/proto-loader");

const mutex = new Mutex();

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const apiProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

// https://www.section.io/engineering-education/lru-cache-implementation-in-javascript/

var LRUCache = function (capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = {};
    this.tail = {};
    this.head.next = this.tail;
    this.tail.prev = this.head;
};

LRUCache.prototype.get = function (key) {
    if (this.map.has(key)) {
      let c = this.map.get(key);
      c.prev.next = c.next;
      c.next.prev = c.prev;
  
      this.tail.prev.next = c; 
      c.prev = this.tail.prev; 
      c.next = this.tail;
      this.tail.prev = c; 
  
      return c.value;
    } else {
      return -1;
    }
};

LRUCache.prototype.put = async function (key, value) {
    const release = await mutex.acquire();
    try {
        if (this.get(key) !== -1) {
        // if key does not exist, update last element value
        this.tail.prev.value = value;
        } else {
        // check if map size is at capacity
        if (this.map.size === this.capacity) {
            //delete item both from map and DLL
            this.map.delete(this.head.next.key); // delete first element of list
            this.head.next = this.head.next.next; // update first element as next element
            this.head.next.prev = this.head;
        }
    
        let newNode = {
            value,
            key,
        }; // each node is a hashtable that stores key and value
    
        // when adding a new node, we need to update both map and DLL
        this.map.set(key, newNode); // add current node to map
        this.tail.prev.next = newNode; // add node to end of the list
        newNode.prev = this.tail.prev; // update prev and next pointers of newNode
        newNode.next = this.tail;
        this.tail.prev = newNode; // update last element
        }
    } finally {
        release();
    }
};

let cache = new LRUCache(4);

server.addService(apiProto.GetCacheService.service, {
    GetKey: (inputItem, callback) => {
        callback(null, {id: inputItem.request.id, contents: cache.get(inputItem.request.id)});
    },
});

server.addService(apiProto.SetCacheService.service, {
    SetKey: (cacheItem, callback) => {
        cache.put(cacheItem.request.id, cacheItem.request.contents);
        callback(null, null);
    },
});

server.addService(apiProto.ClearCacheService.service, {
    Clear: (_, callback) => {
        cache = new LRUCache();
        callback(null, null);
    },
});

server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      console.log("Server running at http://127.0.0.1:50051");
      server.start();
    }
);