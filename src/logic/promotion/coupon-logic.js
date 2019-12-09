export class CouponLogic {
    constructor(coupon) {
        this.coupon = coupon
    }

    getDiscount() {

    }

    getProducts() {
        
    }

    getCouponId() {
        if (this.coupon)
            return this.coupon.Id

        return 0
    }
}