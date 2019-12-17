import React from 'react'
import { TouchableWithoutFeedback, ActivityIndicator, View } from 'react-native'
import Style from './style'
import { getSVGColor } from '../../../helpers/color-helper'

export class IconButton extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showIndicator: false
        }

        this.defaultColor = '#000'
        this.unmount = false
    }

    renderIcon() {
        const Icon = this.props.icon

        return <Icon
            key={new Date().getTime().toString()}
            width={this.props.size}
            height={this.props.size}
            color={getSVGColor(this.props.color)} />
    }

    isNonBorder = () => {
        if (this.props.nonBorder)
            return {
                borderWidth: 0,
                padding: 0
            }
        return {}
    }

    componentWillUnmount() {
        this.unmount = true
    }

    onPress = () => {
        if (!this.props.disabled && this.props.onPress)
            this.setState({ showIndicator: true },
                () => setTimeout(() => {
                    this.props.onPress()
                    if (!this.unmount) {
                        this.setState({ showIndicator: false })
                    }
                }, 250))
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.onPress}>
                <View style={[
                    Style.iconSquareButton,
                    this.isNonBorder(),
                    {
                        borderColor: this.props.borderColor || this.defaultColor,
                        backgroundColor: this.props.backgroundColor
                    }]}>
                    {!this.state.showIndicator && this.renderIcon()}
                    {this.state.showIndicator && <ActivityIndicator size={this.props.size} color={this.props.color} />}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}