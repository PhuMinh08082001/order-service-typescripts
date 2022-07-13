import { Router } from "express";
import OrderRoute from './order.route'
const router = Router();

router.use("/orders", OrderRoute)
export default router;
