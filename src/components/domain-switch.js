import React from 'react';
import Switch from '@material-ui/core/Switch';

class DomainSwitch extends React.Component {
    state = {
    };

    constructor(props) {
        super(props)
        console.log('dom', props)

    }
    handleChange = name => event => {

        this.props.updateState({ global: !this.props.state.global })
    };

    render() {
        return (
            <div>Enable on all domains
                <Switch
                    checked={this.props.state.global}
                    onChange={this.handleChange('checkedA')}
                    value="checkedA"
                />

            </div>
        );
    }
}

export default DomainSwitch;