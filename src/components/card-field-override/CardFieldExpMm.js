import {
    CardFieldExpMm as CardFieldExpMmBase
} from 'react-native-cloudipsp'

export class CardFieldExpMm extends CardFieldExpMmBase {
    constructor(props) {
        super(props)
    }

    __onChangeText__ = text => {
        if (this.props.onChangeText) {
            this.props.onChangeText(text)
        }
    }
}