import exp from 'constants';
import { Kafka } from 'kafkajs'

import { OrderService } from "../services/order.service";

import logger from '../config/login.config';
const orderService = new OrderService();

const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "node-service-group-id" });
const run = async () => {
    logger.info('Starting listen on Kafka ....')
    //   await producer.connect();
    // await producer.send({
    //   topic: "test-topic",
    //   messages: [{ value: "Hello KafkaJS user!" }],
    // });

    await consumer.connect();
    await consumer.subscribe({
        topics: ["get_order_bill_request", "paid_status_payment_request"],
    });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (topic == "get_order_bill_request") {
                let orc;
                if (message.value !== null) {
                    orc = JSON.parse(message.value.toString());
                }
                let orderBill = await orderService.getOrderByIdKafka(
                    orc.orderBill.orderId
                );
                orc.orderBill.products = orderBill.products;
                orc.orderBill.totalCost = orderBill.totalCost;
                orc.status = "COMPLETED";
                await producer.connect();
                await producer.send({
                    topic: "get_order_bill_response",
                    messages: [{ value: JSON.stringify(orc) }],
                });
            } else if (topic == "paid_status_payment_request") {
                let orc;
                if (message.value !== null) {
                    orc = JSON.parse(message.value.toString());
                }
                await orderService.changeStatusPayment(orc.orderBill.orderId);
                orc.status = "COMPLETED";
                await producer.connect();
                await producer.send({
                    topic: "completed_payment_request",
                    messages: [{ value: JSON.stringify(orc) }],
                });
            }
        },
    });
};

export default run;
