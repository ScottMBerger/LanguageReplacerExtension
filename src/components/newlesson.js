/*global chrome*/
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
import ImportExportIcon from '@material-ui/icons/ImportExport';
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
    handleImportMemrise = () => {
        // this.setState({ open: true });
        function scrape() {
            //You can play with your DOM here or check URL against your regex
            let list = document.querySelector(".things")
            if (!list) { return 'not on memrise' }
            let defs = list.getElementsByClassName("thing")
            let words = [];
            if (defs) {
                for (var i = 0; i < defs.length; i++) {
                    if (defs[i]) {
                        let input = []
                        let output = []
                        try {
                            input = defs[i].getElementsByClassName('text')[3].innerText
                            output = defs[i].getElementsByClassName('text')[1].innerText.split('; ');
                        } catch (e) {
                        }
                        for (const index in output) {
                            try {
                                words.push({ input: ' ' + input + ' ', output: ' ' + output[index] + ' ' })
                            } catch (e) {

                            }
                        }

                    }
                }
                const obj = { words: words, name: document.querySelector(".progress-box-title").innerText }
                return obj
            }
        }
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

            // since only one tab should be active and in the current window at once
            // the return variable should only have one entry
            var activeTab = tabs[0];
            var activeTabId = activeTab.id; // or do whatever you need
            if (activeTab.url.includes('memrise.com/course/')) {
                //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
                chrome.tabs.executeScript({
                    code: '(' + scrape + ')();' //argument here is a string but function.toString() returns function's code
                }, (result) => {
                    if (result) {
                        // console.log(this.state.words, result)
                        // console.log([...this.state.words, ...result])
                        this.setState({ name: result[0].name, words: [...this.state.words, ...result[0].words] })
                    }

                });
            }
        });

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
        Array.prototype.getIndexBy = function (name, value) {
            for (var i = 0; i < this.length; i++) {
                if (this[i][name] == value) {
                    return i;
                }
            }
            return -1;
        }

        const { lessons, language, languages } = this.props.state;
        const { words, name } = this.state;
        const newLessons = [...lessons];
        const newLanguages = [...languages]
        newLanguages[newLanguages.getIndexBy('name', language)].lessons.push(name)

        const currentLesson = { name, "selected": true, "language": language, "active": true, words }
        newLessons.push(currentLesson)

        this.props.updateState({ [language + ' - ' + name]: currentLesson, languages: newLanguages })
        this.props.updateState({ lessons: newLessons }, true)
        this.setState({
            open: false,
            words: [],
            name: ''
        });
    }

    render() {
        const { classes } = this.props;
        const { words } = this.state


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
                                value={this.state.name}
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

                    <Fab variant="extended" color="primary" aria-label="Add" onClick={this.handleImportMemrise}>
                        <ImportExportIcon />
                        Import from Memrise
                    </Fab>
                </Dialog>
            </div>
        );
    }
}

NewLesson.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewLesson);