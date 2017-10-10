import React, {
    Component,
    PropTypes,
} from 'react';

import {
    View,
    TouchableOpacity,
    Text
} from 'react-native';

import Collapsible from 'react-native-collapsible/Collapsible';

const COLLAPSIBLE_PROPS = Object.keys(Collapsible.propTypes);
const VIEW_PROPS = Object.keys(View.propTypes);

class AccordionList extends Component {
    static propTypes = {
        sections: PropTypes.array.isRequired,
        renderHeader: PropTypes.func.isRequired,
        renderContent: PropTypes.func.isRequired,
        onChange: PropTypes.func,
        align: PropTypes.oneOf(['top', 'center', 'bottom']),
        duration: PropTypes.number,
        easing: PropTypes.string,
        initiallyActiveSection: PropTypes.number,
        activeOpacity: PropTypes.number
    };

    static defaultProps = {
        activeOpacity: '0.75'
    };

    constructor(props) {
        super(props);

        this.state = {
            activeSection: props.initiallyActiveSection
        };
    }

    _toggleSection(section) {
        const activeSection = this.state.activeSection === section ? false : section;
        this.setState({activeSection});
        if (this.props.onChange) {
            this.props.onChange(activeSection);
        }
    }

    render() {
        let viewProps = {};
        let collapsibleProps = {};
        Object.keys(this.props).forEach((key) => {
            if (COLLAPSIBLE_PROPS.indexOf(key) !== -1) {
                collapsibleProps[key] = this.props[key];
            } else if (VIEW_PROPS.indexOf(key) !== -1) {
                viewProps[key] = this.props[key];
            }
        });

        return (
            <View {...viewProps}>
                {this.props.sections.map((section, key) => (
                    <View key={key}>
                        <TouchableOpacity onPress={() => this._toggleSection(key)}
                                          activeOpacity={this.props.activeOpacity || defaultProps.activeOpacity}>
                            {this.props.renderHeader(section, key, this.state.activeSection === key)}
                        </TouchableOpacity>
                        <Collapsible collapsed={this.state.activeSection !== key} {...collapsibleProps}>
                            {this.props.renderContent(section, key, this.state.activeSection === key)}
                        </Collapsible>
                    </View>
                ))}
            </View>
        );
    }
}

module.exports = AccordionList;
