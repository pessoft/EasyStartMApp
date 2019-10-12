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

class ColorThemeScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Цветовые темы',
    }

    render() {
        return (
            <Animated.ScrollView>
                <ColorThemeItem
                    style={BlueGreyTheme}
                    onPress={() => this.props.changeColorTheme(BlueGreyTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Blue Grey'}
                />
                <ColorThemeItem
                    style={BlueTheme}
                    onPress={() => this.props.changeColorTheme(BlueTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Blue'}
                />
                <ColorThemeItem
                    style={CaynTheme}
                    onPress={() => this.props.changeColorTheme(CaynTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Cayn'}
                />
                <ColorThemeItem
                    style={DarkTheme}
                    onPress={() => this.props.changeColorTheme(DarkTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Dark'}
                />
                <ColorThemeItem
                    style={DeepOrangeTheme}
                    onPress={() => this.props.changeColorTheme(DeepOrangeTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Deep Orange'}
                />
                <ColorThemeItem
                    style={DeepPurpleTheme}
                    onPress={() => this.props.changeColorTheme(DeepPurpleTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Deep Purple'}
                />
                <ColorThemeItem
                    style={GreenTheme}
                    onPress={() => this.props.changeColorTheme(GreenTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Green'}
                />
                <ColorThemeItem
                    style={IndigoTheme}
                    onPress={() => this.props.changeColorTheme(IndigoTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Indigo'}
                />
                <ColorThemeItem
                    style={LightBlueTheme}
                    onPress={() => this.props.changeColorTheme(LightBlueTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Light Blue'}
                />
                <ColorThemeItem
                    style={OrangeTheme}
                    onPress={() => this.props.changeColorTheme(OrangeTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Orange'}
                />
                <ColorThemeItem
                    style={PurpleTheme}
                    onPress={() => this.props.changeColorTheme(PurpleTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Purple'}
                />
                <ColorThemeItem
                    style={RedTheme}
                    onPress={() => this.props.changeColorTheme(RedTheme)}
                    fontSize={this.props.style.fontSize.h8.fontSize}
                    text={'Red'}
                />
            </Animated.ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        style: state.style
    }
}

export default connect(mapStateToProps, { changeColorTheme })(ColorThemeScreen)