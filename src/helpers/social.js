import EmailIcon from '../images/font-awesome-svg/at.svg'
import FacebookIcon from '../images/font-awesome-svg/facebook-f.svg'
import InstagramIcon from '../images/font-awesome-svg/instagram.svg'
import VkIcon from '../images/font-awesome-svg/vk.svg'

export const socialType = {
    email: 0,
    vkontakte: 1,
    facebook: 2,
    instagram: 3
}

const socialName = {
    0: 'E-mail',
    1: 'VKontakte',
    2: 'Facebook',
    3: 'Instagram'
}

const socialIco = {
    0: EmailIcon,
    1: VkIcon,
    2: FacebookIcon,
    3: InstagramIcon
}

export const getSocialData = socialType => {

    return {
        type: socialType,
        name: socialName[socialType],
        icon: socialIco[socialType]
    }

}