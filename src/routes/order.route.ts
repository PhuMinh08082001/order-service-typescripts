import { Router } from "express";
import { Request, Response, NextFunction, ErrorRequestHandler, Application } from "express";
import { OrderController } from "../controllers/order.controller";
import { OrderDetailRequest, OrderMadeResponse } from "../models/order.model";
const router = Router();

const orderController = new OrderController();

router.post("/make-order", async (req, res) => {
    const userId = req.body.userId
    const data = await orderController.makeOrder(userId as Number)

    if (Object.prototype.hasOwnProperty.call(data, "error")) {
        res.status(500).json(data);
    } else {
        res.status(200).json(data);
    }

})

router.post("/make-order-detail", async (req, res) => {
    const orderDetails: OrderDetailRequest[] = req.body
    const data = await orderController.makeOrderDetail(orderDetails)

    if (Object.prototype.hasOwnProperty.call(data, "error")) {
        res.status(500).json(data);
    } else {
        res.status(200).json(data);
    }
})

router.get("/:orderId", async (req, res) => {
    const orderId: string = req.params.orderId
    const data = await orderController.getOrderById(orderId)

    if (Object.prototype.hasOwnProperty.call(data, "error")) {
        res.status(500).json(data);
    } else {
        res.status(200).json(data);
    }
})

router.get("/:userId/get-list-order-id", async (req, res) => {
    const status: any = req.query.status;
    const userId: string = req.params.userId
    const data = await orderController.getOrderIds(userId, status)

    if (Object.prototype.hasOwnProperty.call(data, "error")) {
        res.status(500).json(data);
    } else {
        res.status(200).json(data);
    }
})

router.get("/:orderId/complete-payment", async (req, res) => {
    const orderId: string = req.params.orderId
    const data = await orderController.changeStatusPayment(orderId)

    if (Object.prototype.hasOwnProperty.call(data, "error")) {
        res.status(500).json(data);
    } else {
        res.status(200).json(data);
    }
})

router.get("/:orderId/rollback-payment", async (req, res) => {
    const orderId: string = req.params.orderId
    const data = await orderController.rollbackPayment(orderId)

    if (Object.prototype.hasOwnProperty.call(data, "error")) {
        res.status(500).json(data);
    } else {
        res.status(200).json(data);
    }
})

export default router;