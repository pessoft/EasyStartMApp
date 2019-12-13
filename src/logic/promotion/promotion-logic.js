import { StockLogic } from './stock-logic'
import { CouponLogic } from './coupon-logic'
import { ReferralLogic } from './referral-logic'
import { PromotionSection } from './promotion-section'
import { BitOperation } from '../../helpers/bit-operation'
import { getMaxOfArray } from '../../helpers/utils'

export class PromotionLogic {
    /***
     * stockOption = {stocks, deliveryType, orderSum, basketProducts}
     */
    constructor(stockOption, coupon, referralDiscount, promotionSettings) {
        this.stockLogic = new StockLogic(stockOption)
        this.couponLogic = new CouponLogic(coupon)
        this.referralLogic = new ReferralLogic(referralDiscount)
        this.promotionSettings = promotionSettings
        this.applySectionForDiscount = PromotionSection.Unknown
        this.applySectionForProduct = PromotionSection.Unknown
    }

    getDiscount(discountType) {
        const discountItem = {}

        discountItem[PromotionSection.Stock] = this.stockLogic.getDiscount(discountType)
        discountItem[PromotionSection.Coupon] = this.couponLogic.getDiscount(discountType)
        discountItem[PromotionSection.Partners] = this.referralLogic.getDiscount()

        const sections = []
        for (var key in discountItem) {
            if (discountItem[key] != 0)
                sections.push(key)
        }

        if (sections.length == 0)
            return 0;

        const applySection = sections.length > 1 ? this.filterSectionBySetting(sections) : sections[0]
        BitOperation.Add(this.applySectionForDiscount, applySection)

        let discount = 0
        for (const key in PromotionSection) {
            const section = PromotionSection[key]

            if (section == PromotionSection.Unknown)
                continue

            if (BitOperation.isHas(applySection, section)) {
                discount += discountItem[section]
            }
        }

        return discount
    }

    filterSectionBySetting(sections) {
        let applySection = PromotionSection.Unknown

        if (sections) {
            for (const setting of this.promotionSettings) {
                if (sections.indexOf(setting.PromotionSection) == -1)
                    continue

                if (applySection == PromotionSection.Unknown) {
                    BitOperation.Add(applySection, setting.PromotionSection)
                    BitOperation.Add(applySection, setting.Intersections)
                } else if (BitOperation.isHas(applySection, setting.PromotionSection)) {
                    BitOperation.Add(applySection, setting.Intersections)
                }
            }
        }

        return applySection
    }

    getApplyStockIds() {
        let stockIds = []
        const updateStockIds = ids => stockIds = [...stockIds, ids]

        if (BitOperation.isHas(this.applySectionForDiscount, PromotionSection.Stock)) {
            const ids = this.stockLogic.getStockIdsForCurrentOrder()

            updateStockIds(ids)
        }

        if (BitOperation.isHas(this.applySectionForProduct, PromotionSection.Stock)) {
            const ids = this.stockLogic.getStockIdsProductForCurrentOrder()

            updateStockIds(ids)
        }

        return stockIds
    }

    getApplyCouponId() {
        if (BitOperation.isHas(this.applySectionForDiscount, PromotionSection.Coupon)
            || BitOperation.isHas(this.applySectionForProduct, PromotionSection.Coupon))
            return this.couponLogic.getCouponId()

        return 0
    }

    getReferralDiscount() {
        if (BitOperation.isHas(this.applySectionForDiscount, PromotionSection.Partners)
            || BitOperation.isHas(this.applySectionForProduct, PromotionSection.Partners))
            return this.referralLogic.getDiscount()

        return 0
    }

    getBonusProducts() {
        const bonusProductsItem = {}

        bonusProductsItem[PromotionSection.Stock] = this.stockLogic.getProducts()
        bonusProductsItem[PromotionSection.Coupon] = this.couponLogic.getProducts()

        const sections = []
        for (var key in bonusProductsItem) {
            if (bonusProductsItem[key].length > 0)
                sections.push(key)
        }

        if (sections.length == 0)
            return [];

        const applySection = sections.length > 1 ? this.filterSectionBySetting(sections) : sections[0]
        BitOperation.Add(this.applySectionForProduct, applySection)

        const products = []
        for (const key in PromotionSection) {
            const section = PromotionSection[key]

            if (section == PromotionSection.Unknown)
                continue

            if (BitOperation.isHas(applySection, section)) {
                for (const id of bonusProductsItem[section]) {
                    if (products.indexOf(id) == -1)
                        products.push(id)
                }
            }
        }

        return products
    }

    getAllowedCountSelectBonusProduct() {
        const counts = [
            this.stockLogic.getAllowedCountSelectBonusProduct(),
            this.couponLogic.getAllowedCountSelectBonusProduct()
        ]

        return getMaxOfArray(counts)
    }

    equalsPromotionData(promotionData) {
        if (this.stockLogic.deliveryType != promotionData.deliveryType
            || this.stockLogic.orderSum != promotionData.orderSum)
            return false

        return true
    }
}
