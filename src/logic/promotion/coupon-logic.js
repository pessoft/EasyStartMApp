import { DiscountType } from './discount-type'
import { RewardType } from './reward-type'
import { getMaxOfArray } from '../../helpers/utils'

export class CouponLogic {
    constructor(coupon) {
        this.coupon = coupon
    }

    getDiscount(discountType) {
        if (this.coupon
            && this.coupon.RewardType == RewardType.Discount
            && this.coupon.DiscountType == discountType) {

            return this.coupon.DiscountValue
        }

        return 0
    }

    getProducts() {
        if (this.coupon
            && this.coupon.RewardType == RewardType.Products) {

            return this.coupon.AllowedBonusProducts
        }

        return []
    }

    getCouponId() {
        if (this.coupon)
            return this.coupon.Id

        return 0
    }

    getAllowedCountSelectBonusProduct() {
        if (this.coupon)
            return this.coupon.CountBonusProducts

        return 0
    }
}