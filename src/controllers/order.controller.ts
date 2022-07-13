import e, { Request, Response, NextFunction, ErrorRequestHandler, Application } from "express";
import { ErrorResponse } from "../models/common.model";
import { OrderBillResponse, OrderDetailRequest, OrderMadeResponse } from "../models/order.model";
import { OrderService } from "../services/order.service";

export class OrderController {

  orderService = new OrderService()

  public async makeOrder(userId: Number): Promise<OrderMadeResponse | ErrorResponse | undefined> {
    try {
      let orderIds = await this.orderService.makeOrder(userId);
      return orderIds
    } catch (err) {
      return {
        error: err
      }
    }
  }

  public async makeOrderDetail(orderDetails: OrderDetailRequest[]) {
    try {
      return this.orderService.makeOrderDetail(orderDetails)
    } catch (err) {
      return {
        error: err
      }
    }
  }

  public async getOrderById(orderId: string): Promise<OrderBillResponse | ErrorResponse | undefined> {
    try {
      return this.orderService.getOrderById(orderId)
    } catch (err) {
      return {
        error: err
      }
    }
  }

  public async getOrderIds(userId: string, status: string) {
    try {
      return this.orderService.getOrderIds(userId, status)
    } catch (err) {
      return {
        error: err
      }
    }
  }

  public async changeStatusPayment(orderId: string) {
    try {
      return this.orderService.changeStatusPayment(orderId)
    } catch (err) {
      return {
        error: err
      }
    }
  }

  public async rollbackPayment(orderId: string) {
    try {
      return this.orderService.rollbackPayment(orderId)
    } catch (err) {
      return {
        error: err
      }
    }
  }

}
