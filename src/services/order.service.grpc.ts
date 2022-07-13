import DB from '../config/db/knex.config'
import { ErrorResponse } from '../models/common.model'

import * as grpc from "grpc";

export class OrderService {
    public async makeOrder(call: any, callback: any) {
        let orderArray = await DB("ordertable")
            .returning("id")
            .insert({ user_id: call.request.userId });

        callback(null, orderArray[0]);
    }

    public async makeOrderDetail(call: any, callback: any) {
        let order = await DB("order_detail")
            .returning("id")
            .insert(call.request.orderdetails);

        callback(null, { ids: order });
    }


    public async getOrderById(call: any, callback: any) {
        let order = await DB("ordertable")
            .select("id", "user_id", "total", "status")
            .where({ id: call.request.id })
            .first();

        if (typeof order == "undefined")
            return callback({
                code: 400,
                message: "Order " + call.request.id + " not found",
                status: grpc.status.INTERNAL,
            });

        let orderDetail = await DB("order_detail")
            .select("product_id", "quantity", "price")
            .where({ order_id: call.request.id });

        order["products"] = orderDetail;
        callback(null, order);
    }

    // public async getOrderIds(userId: string, status: string) {
    //     let orderIds = await DB("ordertable")
    //         .select("id")
    //         .where({ user_id: userId, status: status });
    //     return orderIds;
    // }

    async changeStatusPayment(call: any, callback: any) {
        let status = await DB("ordertable")
            .where({ id: call.request.id })
            .update({ status: "paid" })
            .then(function (response) {
                return {
                    status: "Order " + call.request.id + " are paid successfully",
                };
            });
        callback(null, status);
    }

    public async rollbackPayment(call: any, callback: any) {
        let status = await DB("ordertable")
            .where({ id: call.request.id })
            .update({ status: "unpaid" })
            .then(function (response) {
                return {
                    status: "Order " + call.request.id + " rollback successfully",
                };
            });
        callback(null, status);
    }


}