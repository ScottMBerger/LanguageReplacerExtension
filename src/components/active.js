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
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class Active extends React.Component {
    constructor(props) {
        super(props)
    }

    handleDelete = (index, name) => () => {
        const { lessons, language } = this.props.state;
        const newLessons = [...lessons];

        newLessons[index].selected = !newLessons[index].selected

        chrome.storage.sync.set({ [language + ' - ' + name]: newLessons[index] })
        this.props.updateState({ lessons: newLessons }, true)
    }

    handleToggle = (index, name) => () => {
        const { lessons, language } = this.props.state;
        const newLessons = [...lessons];

        newLessons[index].active = !newLessons[index].active

        chrome.storage.sync.set({ [language + ' - ' + name]: newLessons[index] })
        this.props.updateState({ lessons: newLessons }, true)
    };

    Item(lesson, index) {
        if (lesson.selected) {
            return (
                <ListItem key={index}>
                    <Checkbox
                        checked={lesson.active}
                        tabIndex={-1}
                        onClick={this.handleToggle(index, lesson.name)}
                    />
                    <ListItemText primary={`${lesson.name} (${lesson.language})`} />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Comments" onClick={this.handleDelete(index, lesson.name)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )
        }
        return null;
    }

    render() {
        const { classes } = this.props;

        return (
            <List dense className={classes.root}>
                {this.props.state.lessons
                    .map(
                        (lesson, index) => this.Item(lesson, index)
                    )
                }
            </List>
        );
    }
}

Active.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Active);