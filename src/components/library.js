/*global chrome*/
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import NewInput from './newinput.js'
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class Library extends React.Component {
    state = {
        lessons: []
    };

    constructor() {
        super()
        chrome.storage.sync.get('lessons', (items) => {
            console.log('WORDS2: Settings retrieved', items);
            this.setState({
                lessons: items.lessons
            });

        });
    }

    handleDelete = index => () => {
        const { lessons } = this.state;
        const newLessons = [...lessons];

        newLessons.splice(index, 1);

        this.setState({
            lessons: newLessons,
        }, () => {
            chrome.storage.sync.set({ 'lessons': this.state.lessons })
        });
    }

    handleActive = index => () => {
        const { lessons } = this.state;
        const newLessons = [...lessons];

        newLessons[index].selected = !newLessons[index].selected
        this.setState({
            lessons: newLessons,
        }, () => {
            chrome.storage.sync.set({ 'lessons': this.state.lessons })
        });
    };

    startNew() {

    }



    render() {
        const { classes } = this.props;

        function PlusMinus(props) {
            if (props.selected) {
                return <RemoveIcon />
            }
            return <AddIcon />
        }

        return (
            <div>
                <List dense className={classes.root}>
                    <ListItem key="-1">
                        <NewInput></NewInput>
                    </ListItem>
                    {this.state.lessons.map((lesson, index) => (
                        <ListItem key={index}>
                            <IconButton aria-label="Comments" onClick={this.handleActive(index)}>
                                <PlusMinus selected={lesson.selected} />
                            </IconButton>
                            <ListItemText primary={`${lesson.name}`} />
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Comments" onClick={this.handleDelete(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                <Fab color="primary" aria-label="Add" onClick={this.startNew()}>
                    <AddIcon />
                </Fab>
            </div>
        );
    }
}

Library.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Library);