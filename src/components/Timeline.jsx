import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export function Timeline() {
  return (
    <Card sx={{ minWidth: 275, margin:1 }} >
      <CardActionArea>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          Last edited:
        </Typography>
        <Typography variant="h5" component="div">
          Timeline title
        </Typography>
        <br />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          This is the description of the timeline
        </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
  )
}
