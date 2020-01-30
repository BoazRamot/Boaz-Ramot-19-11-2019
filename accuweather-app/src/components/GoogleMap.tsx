import {
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { useLoadScript } from '@react-google-maps/api';
import React from 'react';
import keys from '../config/keys';
import GoogleMapService from './GoogleMapService';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2),
    },
  }),
);

const libraries = ['places'];
const googleMapsApiKey = process.env.GOOGLE_API_KEY || keys.googleMapsApiKey

const GoogleMap: React.FC = () => {
  const classes = useStyles();
  const { isLoaded } = useLoadScript({
    id: 'script-loader',
    googleMapsApiKey,
    version: 'weekly',
    libraries,
    language: 'en',
  });

  return isLoaded ? (
    <GoogleMapService />
  ) : (
    <CircularProgress className={classes.progress} />
  );
};

export default GoogleMap;