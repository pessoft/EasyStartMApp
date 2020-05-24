import {
    CardFieldCvv as CardFieldCvvBase
} from 'react-native-cloudipsp'

export class CardFieldCvv extends CardFieldCvvBase {
    constructor(props) {
        super(props)
    }

    __onChangeText__ = text => {
        if (this.props.onChangeText) {
            this.props.onChangeText(text)
        }
    }
}