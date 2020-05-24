import React from 'react'
import { GridViewButton } from '../buttons/Square/GridViewButton'
import { ListViewButton } from '../buttons/Square/ListViewButton'
import Style from './style'
import { View } from 'react-native'
import { ViewContainerType } from '../../helpers/view-container-type'
import { connect } from 'react-redux'
import { changeProductsViewContainerType } from '../../store/app-settings/actions'

class ViewContainerProductsChanger extends React.Component {
    onPress = newSelectedType => {
        if (newSelectedType != this.props.selectedViewType)
            this.props.changeProductsViewContainerType(newSelectedType)
    }

    render() {
        return (
            <View
                style={[
                    Style.container
                ]}>
                <ListViewButton
                    disabled={false}
                    onPress={() => this.onPress(ViewContainerType.list)}
                    size={20}
                    nonBorder={true}
                    color={
                        this.props.selectedViewType == ViewContainerType.list ?
                            this.props.style.theme.textPrimaryColor.color :
                            this.props.style.theme.secondaryTextColor.color
                    }
                />
                <GridViewButton
                    disabled={false}
                    onPress={() => this.onPress(ViewContainerType.grid)}
                    size={20}
                    nonBorder={true}
                    color={
                        this.props.selectedViewType == ViewContainerType.grid ?
                            this.props.style.theme.textPrimaryColor.color :
                            this.props.style.theme.secondaryTextColor.color
                    }
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedViewType: state.appSetting.selectedProductsViewType,
        style: state.style,
    }
}

const mapDispatchToProps = {
    changeProductsViewContainerType
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainerProductsChanger)