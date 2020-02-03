import React from 'react'
import { Animated } from 'react-native'
import { connect } from 'react-redux'
import { changeColorTheme } from '../../../store/style/actions'
import {
    BlueGreyTheme,
    BlueTheme,
    CaynTheme,
    DarkTheme,
    DeepOrangeTheme,
    DeepPurpleTheme,
    GreenTheme,
    IndigoTheme,
    LightBlueTheme,
    OrangeTheme,
    PurpleTheme,
    RedTheme
} from '../../../style/themes'
import { ColorThemeItem } from '../../../components/color-theme-item/ColorThemeItem'
import { resetMainData } from '../../../store/main/actions'

class ColorThemeScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Цветовые темы',
    }

    changeColorTheme = theme => {
        if (!this.props.isLogin)
            this.props.resetMainData()

        this.props.changeColorTheme(theme)
    }

    render() {
        return (
            <Animated.ScrollView>
                <ColorThemeItem
                    style={BlueGreyTheme}
                    onPress={() => this.changeColorTheme(BlueGreyTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Blue Grey'}
                />
                <ColorThemeItem
                    style={BlueTheme}
                    onPress={() => this.changeColorTheme(BlueTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Blue'}
                />
                <ColorThemeItem
                    style={CaynTheme}
                    onPress={() => this.changeColorTheme(CaynTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Cayn'}
                />
                <ColorThemeItem
                    style={DarkTheme}
                    onPress={() => this.changeColorTheme(DarkTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Dark'}
                />
                <ColorThemeItem
                    style={DeepOrangeTheme}
                    onPress={() => this.changeColorTheme(DeepOrangeTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Deep Orange'}
                />
                <ColorThemeItem
                    style={DeepPurpleTheme}
                    onPress={() => this.changeColorTheme(DeepPurpleTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Deep Purple'}
                />
                <ColorThemeItem
                    style={GreenTheme}
                    onPress={() => this.changeColorTheme(GreenTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Green'}
                />
                <ColorThemeItem
                    style={IndigoTheme}
                    onPress={() => this.changeColorTheme(IndigoTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Indigo'}
                />
                <ColorThemeItem
                    style={LightBlueTheme}
                    onPress={() => this.changeColorTheme(LightBlueTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Light Blue'}
                />
                <ColorThemeItem
                    style={OrangeTheme}
                    onPress={() => this.changeColorTheme(OrangeTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Orange'}
                />
                <ColorThemeItem
                    style={PurpleTheme}
                    onPress={() => this.changeColorTheme(PurpleTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Purple'}
                />
                <ColorThemeItem
                    style={RedTheme}
                    onPress={() => this.changeColorTheme(RedTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Red'}
                />
            </Animated.ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        style: state.style,
        isLogin: state.user.isLogin
    }
}

const mapDispatchToProps = {
    changeColorTheme,
    resetMainData
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorThemeScreen)