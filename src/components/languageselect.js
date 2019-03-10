import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormDialog from './formdialog'

const styles = theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

class LanguageSelect extends React.Component {
    state = {
        open: false
    };

    constructor(props) {
        super(props);
    }

    handleChange = event => {
        if (event.target.value == 'NewLanguage') {
            return;
        }
        this.props.updateState({ language: event.target.value });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    render() {
        const { classes } = this.props;
        const { language, languages } = this.props.state
        console.log('render', this.props)
        return (
            <form autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="language-select">Language</InputLabel>
                    <Select
                        open={this.state.open}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value={language}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'language',
                            id: 'language-select',
                        }}
                    >
                        {languages.reverse()
                            .map(
                                (curr, index) => <MenuItem value={curr.name}>{curr.name}</MenuItem>
                            )
                        }

                        <FormDialog state={this.props.state} updateState={this.props.updateState}></FormDialog>
                    </Select>
                </FormControl>
            </form>
        );
    }
}

LanguageSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LanguageSelect);