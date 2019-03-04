import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

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

class NewInput extends React.Component {
    state = {
        input: '',
        output: ''
    };

    constructor(props) {
        super(props)
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleAdd = () => {
        this.props.handleAdd({ input: ` ${this.state.input} `, output: ` ${this.state.output} ` })
        this.setState({
            input: '',
            output: ''
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    required
                    id="input"
                    name="input"
                    className={classes.textField}
                    defaultValue=""
                    value={this.state.input}
                    margin="normal"
                    onChange={this.handleChange('input')}
                />
                <TextField
                    required
                    id="output"
                    name="output"
                    className={classes.textField}
                    value={this.state.output}
                    defaultValue=""
                    margin="normal"
                    onChange={this.handleChange('output')}
                />

                <ListItemSecondaryAction onClick={this.handleAdd}>
                    <IconButton aria-label="Check">
                        <CheckIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </form>
        );
    }
}

NewInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewInput);