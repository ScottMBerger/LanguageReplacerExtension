import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NewInput from './newinput'
import TextField from '@material-ui/core/TextField';

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class NewLesson extends React.Component {
    state = {
        open: false,
        words: [],
        name: ''
    };

    constructor(props) {
        super(props);
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleAdd = (obj) => {
        const { words } = this.state
        const newWords = [...words]

        newWords.push(obj)
        this.setState({ words: newWords })
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSave = () => {
        const { lessons } = this.props.state;
        const { words, name } = this.state;
        const newLessons = [...lessons];

        const currentLesson = { name, "selected": false, "language": "Chinese", "active": true, words }
        newLessons.push(currentLesson)
        console.log('saved les', newLessons)
        this.props.updateState({ lessons: newLessons })
        this.setState({
            open: false,
            words: [],
            name: ''
        });
    }

    render() {
        const { classes } = this.props;
        const { words } = this.state
        console.log('render state', this.state.words)
        console.log('r1')
        return (
            <div>
                <Fab color="primary" aria-label="Add" onClick={this.handleClickOpen}>
                    <AddIcon />
                </Fab>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                New Lesson
                            </Typography>
                            <Button color="inherit" onClick={this.handleSave}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <List>

                        <ListItem button key="-1">
                            <TextField
                                required
                                id="name"
                                name="name"
                                label="Lesson Name"
                                className={classes.textField}
                                defaultValue=""
                                margin="normal"
                                onChange={this.handleChange('name')}
                            />
                        </ListItem>
                        <ListItem button key="-1">
                            <NewInput handleAdd={this.handleAdd}></NewInput>
                        </ListItem>
                        <Divider />

                        {words.reverse()
                            .map(
                                (word, index) => <ListItem button><ListItemText primary={word.input} secondary={word.output} /></ListItem>
                            )
                        }

                    </List>
                </Dialog>
            </div>
        );
    }
}

NewLesson.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewLesson);