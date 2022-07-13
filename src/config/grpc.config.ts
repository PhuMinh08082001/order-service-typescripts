var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
// var PROTO_PATH = __dirname + "/orders.proto";
var PROTO_PATH = __dirname + "./../../proto/orders.proto";
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

var orderServiceGrpc = require('../services/order.service.grpc')

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const orderService = protoDescriptor;

function getServerGrpc() {
    let serverGrpc = new grpc.Server();
    serverGrpc.addService(orderService.OrderService.service, {
        getOrderById: orderServiceGrpc.getOrderById,
        makeOrder: orderServiceGrpc.makeOrder,
        makeOrderDetail: orderServiceGrpc.makeOrderDetail,
        changeStatusPayment: orderServiceGrpc.changeStatusPayment,
        rollbackPayment: orderServiceGrpc.rollbackPayment,
    });
    return serverGrpc;
}


export default getServerGrpc;