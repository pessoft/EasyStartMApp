import EmailIco from '../images/font-awesome-svg/at.svg'
import FacebookIco from '../images/font-awesome-svg/facebook-f.svg'
import InstagramIco from '../images/font-awesome-svg/instagram.svg'
import VkIco from '../images/font-awesome-svg/vk.svg'

export const socilaType = {
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
    0: EmailIco,
    1: VkIco,
    2: FacebookIco,
    3: InstagramIco
}

export const getSocialData = socialType => {

    return {
        name: socialName[socialType],
        ico: socialIco[socialType]
    }

}