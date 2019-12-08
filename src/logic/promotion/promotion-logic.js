import { StockLogic } from './stock-logic'
import { CouponLogic } from './coupon-logic'
import { ReferralLogic } from './referral-logic'

export class PromotionLogic {
    constructor(stocks, coupon, referralDiscount, promotionSettings) {
        this.stockLogic = new StockLogic(stocks)
        this.couponLogic =  new CouponLogic(coupon)
        this.referralLogic = new ReferralLogic(referralDiscount)
        this.promotionSettings = promotionSettings
    }

    getDiscount() {
        const stockDiscount = this.stockLogic.getDiscount()
        const couponDiscount = this.couponLogic.getDiscount()
        const referralDiscount = this.referralLogic.getDiscount()
    }
}