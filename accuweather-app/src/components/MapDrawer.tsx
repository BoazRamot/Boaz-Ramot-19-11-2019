import {
  AppBar,
  Drawer,
  IconButton,
  useTheme,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React, { ReactEventHandler } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import useStyles from '../helpers/useStyles';
import { closeDrawerAction } from '../store/actions/action.mapReducer';
import GoogleMap from './GoogleMap';


interface IProps {
  closeDrawer: ReactEventHandler;
  isOpen: boolean;
}

const MapDrawer: React.FC<IProps> = ({
  isOpen,
  closeDrawer,
}) => {
 
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={isOpen}
        classes={{ paper: classes.drawerPaper }}
      >
        <div
          className={classes.drawerRoot}
        >
          <AppBar
            position="static"
            color="default"
            className={classes.drawerHeader}
          >
            <h3>Map</h3>
            <IconButton onClick={closeDrawer}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </AppBar>
          <GoogleMap/>
        </div>
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  isOpen: state.map.open,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeDrawer: () => dispatch(closeDrawerAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapDrawer);
