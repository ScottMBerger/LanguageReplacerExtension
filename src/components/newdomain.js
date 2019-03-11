import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';

const styles = theme => ({
    container: {
        display: 'flex',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});

class NewDomain extends React.Component {
    state = {
        domain: ''
    };

    constructor(props) {
        super(props)
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleAdd = () => {
        const { state } = this.props;
        this.props.updateState({ domains: [...state.domains, this.state.domain] })
        this.setState({
            domain: ''
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <ListItem key="19999">

                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        required
                        id="domain"
                        name="domain"
                        className={classes.textField}
                        defaultValue=""
                        value={this.state.domain}
                        margin="normal"
                        onChange={this.handleChange('domain')}
                    />
                    <ListItemSecondaryAction onClick={this.handleAdd}>
                        <IconButton aria-label="Check">
                            <CheckIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </form>

            </ListItem>
        );
    }
}

NewDomain.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewDomain);