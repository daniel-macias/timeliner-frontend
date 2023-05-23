import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function AddTimelineButton(props) {
  return (
    //TODO figure out why the height is different on the cards but not on the button
    
    <Card sx={{ minWidth: 275, margin:1} } style={{height: '89%'}}>
      <CardActionArea style={{height: '100%'}} onClick={() => props.viewCreationModal()}>
      <CardContent>
        <Typography variant="h5" color="text.secondary" component="div">
          Add Timeline...
        </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
  )
}
