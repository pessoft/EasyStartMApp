import {
    CardFieldExpYy as CardFieldExpYyBase
} from 'react-native-cloudipsp'

export class CardFieldExpYy extends CardFieldExpYyBase {
    constructor(props) {
        super(props)
    }

    __onChangeText__ = text => {
        if (this.props.onChangeText) {
            this.props.onChangeText(text)
        }
    }
}