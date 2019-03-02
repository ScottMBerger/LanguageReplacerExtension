/*global chrome*/
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

import DeleteIcon from '@material-ui/icons/Delete';


import IconButton from '@material-ui/core/IconButton';
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class CheckboxListSecondary extends React.Component {
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

  handleToggle = index => () => {
    const { lessons } = this.state;
    const newLessons = [...lessons];

    newLessons[index].active = !newLessons[index].active
    this.setState({
      lessons: newLessons,
    }, () => {
      chrome.storage.sync.set({ 'lessons': this.state.lessons })
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <List dense className={classes.root}>
        {this.state.lessons.map((lesson, index) => (
          <ListItem key={index}>
            <Checkbox
              checked={lesson.active}
              tabIndex={-1}
              onClick={this.handleToggle(index)}
            />
            <ListItemText primary={`${lesson.name}`} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Comments" onClick={this.handleDelete(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxListSecondary);