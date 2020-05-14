import {
    CardFieldNumber as CardFieldNumberBase
} from 'react-native-cloudipsp'

export class CardFieldNumber extends CardFieldNumberBase {
    constructor(props) {
        super(props)
    }

    __onChangeText__ = text => {
        if (this.props.onChangeText) {
            this.props.onChangeText(text)
        }
    }
}