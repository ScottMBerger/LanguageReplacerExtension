import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';

export default class FormDialog extends React.Component {
    state = {
        open: false,
        field: ''
    };

    constructor(props) {
        super(props)
        console.log('props', this.props)
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    createNewLanguage = () => {
        this.props.updateState({ language: this.state.field, languages: [...this.props.state.languages, { name: this.state.field, lessons: [] }] });
        this.setState({ open: false });
    }

    handleChange = event => {
        this.setState({ field: event.target.value });
    };

    render() {
        return (
            <div>
                {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Open form dialog
                </Button> */}

                <MenuItem value={'NewLanguage'} onClick={this.handleClickOpen}><em>Add New Language</em></MenuItem>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">New Language</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter your new language name here.
                    </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            fullWidth
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.createNewLanguage} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}