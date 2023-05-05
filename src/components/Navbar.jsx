import { AppBar, styled, Toolbar, Typography, Button} from "@mui/material";
import React from 'react'



const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
});

export const Navbar = (props) => {
  return (
    <AppBar position = "static">
        <StyledToolbar>
            <Typography variant="h6">Habitracker</Typography>
            <Button variant="outlined" color="success" onClick={() => props.logOutFunction()}>LOG OUT</Button>
        </StyledToolbar>
        
    </AppBar>
    
  )
}
