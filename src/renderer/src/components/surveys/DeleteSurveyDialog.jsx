import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";

export default function DeleteSurveyDialog({ open, handleClose, survey, onDelete, ...props }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        try {
            await window.api.forms.delete(survey.id);
            if (onDelete) {
                onDelete();
            }
            handleClose();
        } catch (err) {
            setError('Failed to delete survey. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!survey) {
        return null;
    }

    return (
        <>
            <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
                <DialogTitle>Delete Survey</DialogTitle>
                <DialogContent>
                <Typography>Are you sure you want to delete the survey "{survey.name}"? This action cannot be undone.</Typography>
                {survey?.provider === "google_forms" && (
                    <Typography mt={2} color="textSecondary">
                        Note: This only deletes the survey and its imported responses from this application. The original form still exists in your Google Drive and is not changed.
                    </Typography>
                )}
                {error && <Typography color="error">{error}</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button disabled={loading} onClick={handleClose}>Cancel</Button>
                    <Button disabled={loading} color="error" variant="contained" onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
