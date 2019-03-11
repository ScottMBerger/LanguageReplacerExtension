/*global chrome*/
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import DomainSwitch from './domain-switch';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import NewDomain from './newdomain';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class Settings extends React.Component {
    state = {
        domain: ''
    }

    constructor(props) {
        super(props)
    }

    handleChange = name => event => {
        console.log('change')
        this.setState({ [name]: event.target.value });
        console.log('change', this.state)
    };

    handleDelete = index => () => {
        const { domains } = this.props.state;
        const newDomains = [...domains]
        newDomains.splice(index, 1);

        this.props.updateState({ domains: newDomains })
    }

    handleAdd = () => {
        const { state } = this.props;
        this.props.updateState({ domains: [...state.domains, this.state.domain] })
        this.setState({
            domain: ''
        })
    }

    render() {
        const { classes, state } = this.props;
        console.log('my settings state', state)
        const DomainList = () => {
            if (!state.global) {
                return (
                    <NewDomain state={state} updateState={this.props.updateState}></NewDomain>
                )
            } else {
                return null
            }
        }

        const DomainsList = () => {
            if (!state.global) {
                return state.domains.map((domain, index) =>
                    (<ListItem key={index}>
                        <ListItemText primary={`${domain}`} />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Comments" onClick={this.handleDelete(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>))
            } else {
                return null
            }

        }

        return (
            <React.Fragment>
                <DomainSwitch state={this.props.state} updateState={this.props.updateState}></DomainSwitch>
                <List dense className={classes.root}>
                    <DomainList></DomainList>
                    <DomainsList></DomainsList>

                </List>
            </React.Fragment>
        );
    }
}

Settings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);