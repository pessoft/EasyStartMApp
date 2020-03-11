import React from 'react'
import { GridViewButton } from '../buttons/Square/GridViewButton'
import { ListViewButton } from '../buttons/Square/ListViewButton'
import Style from './style'
import { View } from 'react-native'
import { ViewContainerType } from '../../helpers/view-container-type'
import { connect } from 'react-redux'
import { changeCategoryViewContainerType } from '../../store/app-settings/actions'

class ViewContainerCategoryChanger extends React.Component {
    onPress = newSelectedType => {
        if (newSelectedType != this.props.selectedViewType)
            this.props.changeCategoryViewContainerType(newSelectedType)
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
        selectedViewType: state.appSetting.selectedCategoryViewType,
        style: state.style,
    }
}

const mapDispatchToProps = {
    changeCategoryViewContainerType
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainerCategoryChanger)