import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField/TextField";
import React, { useCallback, useState } from 'react';
import { CityType } from "../App";

type EditCityDialogProp = {
    shouldOpen: boolean,
    setOpenEditCityDialog: (value: boolean) => void,
    currentCity: CityType
}

const EditCityDialog = (props: EditCityDialogProp) => {

    const [newCityName, setNewCityName] = useState<String>("");
    const [newCityPhotoUrl, setNewCityPhotoUrl] = useState<String>("");

    const handleClose = () => {
        props.setOpenEditCityDialog(false);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        //TODO: for now let the default behaviour, but need to revisit
        // event.preventDefault();
        const request = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "name": newCityName,
                    "photoUrl": newCityPhotoUrl
                }
            )
        }

        const response = await fetch(`${process.env.REACT_APP_BACKEND_API_CITIES}/${props.currentCity.id}`, request);
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const responseMessage = isJson && await response.json();
    }

    const handleChangeCityName = useCallback((event: React.ChangeEvent<HTMLInputElement>) =>
        setNewCityName(event.target.value), []);

    const handleChangeCityPhotoUrl = useCallback((event: React.ChangeEvent<HTMLInputElement>) =>
        setNewCityPhotoUrl(event.target.value), []);

    return (
        <div>
            <Dialog
                onClose={handleClose}
                open={props.shouldOpen}
                aria-labelledby="simple-dialog-title"
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>{props.currentCity.name}</DialogTitle>
                    <DialogContent>
                        <img
                            src={`${props.currentCity.photoUrl}?fit=crop&auto=format`}
                            srcSet={`${props.currentCity.photoUrl}?&fit=crop&auto=format&dpr=2 2x`}
                            alt={props.currentCity.name}
                            loading="lazy"

                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="City Name"
                            fullWidth
                            variant="standard"
                            onChange={handleChangeCityName}
                        >
                            {props.currentCity.name}
                        </TextField>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Photo URL"
                            fullWidth
                            variant="standard"
                            onChange={handleChangeCityPhotoUrl}
                        >
                            {props.currentCity.photoUrl}
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus type="submit">Save</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}
export default EditCityDialog;