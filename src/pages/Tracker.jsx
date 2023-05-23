import React, { useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Timeline } from "../components/Timeline";
import { Box, Stack, Grid } from '@mui/material'
import { Navbar } from "../components/Navbar";
import AddTimelineButton from "../components/AddTimelineButton";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function Tracker() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const [userTimelines, setUserTimelines] = useState({});
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = React.useState(false);

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      description: ""
    }
  );

  const handleSubmit = evt => {
    evt.preventDefault();

    let data = { formInput };
     //TODO REPLACE WITH AXIOS
    fetch("https://pointy-gauge.glitch.me/api/form", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));
  };

  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTimelineSubmit = () => {
    setOpen(false);

  };


  useEffect(() => {
    
  }, []);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else
          toast(`Hi ${data.user} 🦄`, {
            theme: "dark",
          });

          const fetchUserTimelines = async (uid) => {
            try {
              const { data: response } = await axios.get('http://localhost:4000/api/private/user/'+uid);
              setUserTimelines(response);
            } catch (error) {
              console.error(error)
            }
            setLoading(false);
          };

          fetchUserTimelines(data.uid);
          console.log(userTimelines);
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  return (
    <>
      <div className="private">
        <Navbar logOutFunction={logOut}/>
        <hr />
        {loading && <div>Loading...</div>}

        <Box>
          <Grid container >
          {!loading && (userTimelines.timelines.map(item => (
            <Grid xs={3}>
            <Timeline name = {item.name} description = {item.description} tid = {item._id} lastEdited = {item.updatedAt}/>
            </Grid>
          )))}
            <Grid xs={3}>
              <AddTimelineButton viewCreationModal = {handleClickOpen} />
            </Grid>
            
          </Grid>
        </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new Timeline</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a timeline, first enter it's name and description, after this you can start building it.
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="timelineName"
            label="Name"
            name="name"
            fullWidth
            variant="standard"
            onChange={handleInput}
          />
          <TextField
          required
          id="timelineDescription"
          label="Description"
          name="description"
          multiline
          rows={4}
          fullWidth
          variant="standard"
          onChange={handleInput}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleTimelineSubmit}>Create new Timeline</Button>
        </DialogActions>
      </Dialog>
        
      </div>
      <ToastContainer />
    </>
  );
}