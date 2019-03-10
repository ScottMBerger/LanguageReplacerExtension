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
import NewLesson from './newlesson';
import LanguageSelect from './languageselect';


Array.prototype.getIndexBy = function (name, value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][name] == value) {
            return i;
        }
    }
    return -1;
}
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

    handleDelete = name => () => {
        const { lessons, language, languages } = this.props.state;
        const newLessons = [...lessons];
        const newLanguages = [...languages]
        const index = newLessons.getIndexBy('name', name)
        newLessons.splice(index, 1);

        this.props.updateState({ lessons: newLessons }, true)

        newLanguages[newLanguages.getIndexBy('name', language)].lessons.splice(newLanguages[newLanguages.getIndexBy('name', language)].lessons.indexOf(name), 1)
        this.props.updateState({ languages: newLanguages })
    }

    handleActive = name => () => {
        const { lessons, language } = this.props.state;
        const newLessons = [...lessons];
        const index = newLessons.getIndexBy('name', name)
        newLessons[index].selected = !newLessons[index].selected

        chrome.storage.sync.set({ [language + ' - ' + name]: newLessons[index] })
        this.props.updateState({ lessons: newLessons }, true)
    };

    render() {
        const { classes } = this.props;
        const { lessons, language } = this.props.state;

        function PlusMinus(props) {
            if (props.selected) {
                return <RemoveIcon />
            }
            return <AddIcon />
        }

        const LessonItem = props => {
            const { lesson, index } = props;
            if (lesson.language == language) {
                return (
                    <ListItem key={index}>
                        <IconButton aria-label="Comments" onClick={this.handleActive(lesson.name)}>
                            <PlusMinus selected={lesson.selected} />
                        </IconButton>
                        <ListItemText primary={`${lesson.name}`} />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Comments" onClick={this.handleDelete(lesson.name)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            } else {
                return null
            }
        }

        return (
            <div>
                <LanguageSelect state={this.props.state} updateState={this.props.updateState}></LanguageSelect>
                <List dense className={classes.root}>
                    {lessons.map((lesson, index) => (
                        <LessonItem lesson={lesson} index={index}></LessonItem>
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