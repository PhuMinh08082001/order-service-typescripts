export interface OrderMadeResponse {
    id?: string
}

export interface OrderBillResponse extends OrderMadeResponse {
    user_id: number,
    total: number,
    status: string,
    products?: ProductDetail[]
}

export interface ProductDetail {
    product_id: number,
    quantity: number,
    price: number
}

export interface OrderDetailRequest extends ProductDetail {
    order_id: number
}
