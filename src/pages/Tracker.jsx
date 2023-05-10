import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Timeline } from "../components/Timeline";
import { Box, Stack, Grid } from '@mui/material'
import { Navbar } from "../components/Navbar";
import AddTimelineButton from "../components/AddTimelineButton";


export default function Tracker() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const [userTimelines, setUserTimelines] = useState({});
  const [loading, setLoading] = useState(true);

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
          console.log(data);
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
        {loading && <div>Loading</div>}
        {!loading && (
          <div>
            <h2>Doing stuff with data </h2>
          </div>
        )}
        <Box>
          <Grid container >
            <Grid xs={3}>
              <Timeline />
            </Grid>
            <Grid xs={3}>
              <Timeline />
            </Grid>
            <Grid xs={3}>
              <Timeline />
            </Grid>
            <Grid xs={3}>
              <Timeline />
            </Grid>
            <Grid xs={3}>
              <Timeline />
            </Grid>
            <Grid xs={3}>
              <AddTimelineButton />
            </Grid>
            
          </Grid>
        </Box>
        
      </div>
      <ToastContainer />
    </>
  );
}