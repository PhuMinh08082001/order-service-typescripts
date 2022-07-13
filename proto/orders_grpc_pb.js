// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var orders_pb = require('./orders_pb.js');

function serialize_Order(arg) {
  if (!(arg instanceof orders_pb.Order)) {
    throw new Error('Expected argument of type Order');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Order(buffer_arg) {
  return orders_pb.Order.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_OrderDetailRequest(arg) {
  if (!(arg instanceof orders_pb.OrderDetailRequest)) {
    throw new Error('Expected argument of type OrderDetailRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_OrderDetailRequest(buffer_arg) {
  return orders_pb.OrderDetailRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_OrderDetailResponse(arg) {
  if (!(arg instanceof orders_pb.OrderDetailResponse)) {
    throw new Error('Expected argument of type OrderDetailResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_OrderDetailResponse(buffer_arg) {
  return orders_pb.OrderDetailResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_OrderRequestId(arg) {
  if (!(arg instanceof orders_pb.OrderRequestId)) {
    throw new Error('Expected argument of type OrderRequestId');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_OrderRequestId(buffer_arg) {
  return orders_pb.OrderRequestId.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_OrderResponseMade(arg) {
  if (!(arg instanceof orders_pb.OrderResponseMade)) {
    throw new Error('Expected argument of type OrderResponseMade');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_OrderResponseMade(buffer_arg) {
  return orders_pb.OrderResponseMade.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_StatusResponse(arg) {
  if (!(arg instanceof orders_pb.StatusResponse)) {
    throw new Error('Expected argument of type StatusResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_StatusResponse(buffer_arg) {
  return orders_pb.StatusResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_UserRequestId(arg) {
  if (!(arg instanceof orders_pb.UserRequestId)) {
    throw new Error('Expected argument of type UserRequestId');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_UserRequestId(buffer_arg) {
  return orders_pb.UserRequestId.deserializeBinary(new Uint8Array(buffer_arg));
}


var OrderServiceService = exports.OrderServiceService = {
  getOrderById: {
    path: '/OrderService/GetOrderById',
    requestStream: false,
    responseStream: false,
    requestType: orders_pb.OrderRequestId,
    responseType: orders_pb.Order,
    requestSerialize: serialize_OrderRequestId,
    requestDeserialize: deserialize_OrderRequestId,
    responseSerialize: serialize_Order,
    responseDeserialize: deserialize_Order,
  },
  makeOrder: {
    path: '/OrderService/MakeOrder',
    requestStream: false,
    responseStream: false,
    requestType: orders_pb.UserRequestId,
    responseType: orders_pb.OrderResponseMade,
    requestSerialize: serialize_UserRequestId,
    requestDeserialize: deserialize_UserRequestId,
    responseSerialize: serialize_OrderResponseMade,
    responseDeserialize: deserialize_OrderResponseMade,
  },
  makeOrderDetail: {
    path: '/OrderService/MakeOrderDetail',
    requestStream: false,
    responseStream: false,
    requestType: orders_pb.OrderDetailRequest,
    responseType: orders_pb.OrderDetailResponse,
    requestSerialize: serialize_OrderDetailRequest,
    requestDeserialize: deserialize_OrderDetailRequest,
    responseSerialize: serialize_OrderDetailResponse,
    responseDeserialize: deserialize_OrderDetailResponse,
  },
  changeStatusPayment: {
    path: '/OrderService/ChangeStatusPayment',
    requestStream: false,
    responseStream: false,
    requestType: orders_pb.OrderRequestId,
    responseType: orders_pb.StatusResponse,
    requestSerialize: serialize_OrderRequestId,
    requestDeserialize: deserialize_OrderRequestId,
    responseSerialize: serialize_StatusResponse,
    responseDeserialize: deserialize_StatusResponse,
  },
  rollbackPayment: {
    path: '/OrderService/RollbackPayment',
    requestStream: false,
    responseStream: false,
    requestType: orders_pb.OrderRequestId,
    responseType: orders_pb.StatusResponse,
    requestSerialize: serialize_OrderRequestId,
    requestDeserialize: deserialize_OrderRequestId,
    responseSerialize: serialize_StatusResponse,
    responseDeserialize: deserialize_StatusResponse,
  },
};

exports.OrderServiceClient = grpc.makeGenericClientConstructor(OrderServiceService);
