export class ReferralLogic {
    constructor(referralDiscount) {
        this.referralDiscount = referralDiscount || 0
    }

    getDiscount() {
        return this.referralDiscount
    }
}