import PepperIcon from '../images/font-awesome-svg/pepper-hot.svg'
import AppleIcon from '../images/font-awesome-svg/apple-alt.svg'
import BadgePercentIcon from '../images/font-awesome-svg/badge-percent.svg'
import NewIcon from '../images/font-awesome-svg/new.svg'
import HitIcon from '../images/font-awesome-svg/hit.svg'
import { TypeProduct } from './type-product'

export const getProductTypes = (productTypes, style) => {
    const items = []

    if (hasProductType(productTypes, TypeProduct.New) && items.length < 3)
        items.push({ icon: NewIcon, color: style.newColor.color, type: TypeProduct.New })

    if (hasProductType(productTypes, TypeProduct.Hit) && items.length < 3)
        items.push({ icon: HitIcon, color: style.hitColor.color, type: TypeProduct.Hit })

    if (hasProductType(productTypes, TypeProduct.Vegetarion) && items.length < 3)
        items.push({ icon: AppleIcon, color: style.vegetarionColor.color, type: TypeProduct.Vegetarion })

    if (hasProductType(productTypes, TypeProduct.Stock) && items.length < 3)
        items.push({ icon: BadgePercentIcon, color: style.stockColor.color, type: TypeProduct.Stock })

    if (hasProductType(productTypes, TypeProduct.HotPeppers) && items.length < 3)
        items.push({ icon: PepperIcon, color: style.pepperHotColor.color, type: TypeProduct.HotPeppers })

    return items
}

const hasProductType = (productTypes, productType) => (productTypes & productType) == productType