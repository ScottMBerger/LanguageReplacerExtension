/*global chrome*/
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import NewInput from './newinput.js'
import IconButton from '@material-ui/core/IconButton';
import NewLesson from './newlesson'

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class Library extends React.Component {
    state = {
    };

    constructor(props) {
        super(props)
    }

    handleDelete = index => () => {
        const { lessons } = this.props.state;
        const newLessons = [...lessons];
        newLessons.splice(index, 1);

        this.props.updateState({ lessons: newLessons })
    }

    handleActive = index => () => {
        const { lessons } = this.props.state;
        const newLessons = [...lessons];

        newLessons[index].selected = !newLessons[index].selected

        this.props.updateState({ lessons: newLessons })
    };

    startNew() {

    }


    componentDidUpdate() {
        console.log('component updated', this.props)
    }

    render() {
        const { classes } = this.props;
        const { lessons } = this.props.state;

        function PlusMinus(props) {
            if (props.selected) {
                return <RemoveIcon />
            }
            return <AddIcon />
        }
        return (
            <div>
                <List dense className={classes.root}>
                    {lessons.map((lesson, index) => (
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

                <NewLesson state={this.props.state} updateState={this.props.updateState}></NewLesson>
            </div>
        );
    }
}

Library.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Library);