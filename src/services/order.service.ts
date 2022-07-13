
import DB from '../config/db/knex.config'
import { ErrorResponse } from '../models/common.model'
import { OrderBillResponse, OrderDetailRequest, OrderMadeResponse, ProductDetail } from '../models/order.model'

export class OrderService {
    public async makeOrder(userId: Number): Promise<OrderMadeResponse | ErrorResponse | undefined> {
        try {
            let order: OrderMadeResponse[] = await DB("ordertable").returning("id").first().insert({ user_id: userId })
            return order[0]
        }
        catch (e) {
            console.log(e)
        }
    }

    public async makeOrderDetail(orderDetails: OrderDetailRequest[]) {
        try {
            let order = await DB("order_detail").insert(orderDetails);
            return order;
        }
        catch (e) {
            console.log(e)
        }
    }

    public async getOrderById(orderId: string): Promise<OrderBillResponse | ErrorResponse | undefined> {
        let order: OrderBillResponse = await DB("ordertable")
            .select("id", "user_id", "total", "status")
            .where({ id: orderId })
            .first();

        if (typeof order == "undefined")
            throw new Error("Order " + orderId + " not found");

        let orderDetail: ProductDetail[] = await DB("order_detail")
            .select("product_id", "quantity", "price")
            .where({ order_id: orderId });

        order.products = orderDetail
        return order
    }

    public async getOrderByIdKafka(orderId: string) {
        let order = await DB("ordertable")
            .select("id", "user_id as userId", "total as totalCost", "status")
            .where({ id: orderId })
            .first();

        if (typeof order == "undefined")
            throw new Error("Order " + orderId + " not found");

        let orderDetail = await DB("order_detail")
            .select("product_id as productId", "quantity", "price")
            .where({ order_id: orderId });

        order["products"] = orderDetail;

        return order;
    }

    public async getOrderIds(userId: string, status: string) {
        let orderIds = await DB("ordertable")
            .select("id")
            .where({ user_id: userId, status: status });
        return orderIds;
    }

    public async changeStatusPayment(orderId: string) {
        let status = await DB("ordertable")
            .where({ id: orderId })
            .update({ status: "paid" })
            .then(function (response) {
                return { status: "Order " + orderId + " are paid successfully" };
            });
        return status;
    }

    public async rollbackPayment(orderId: string) {
        let status = await DB("ordertable")
            .where({ id: orderId })
            .update({ status: "unpaid" })
            .then(function (response) {
                return { status: "Order " + orderId + " rollback sucessfully" };
            });
        return status;
    }


}