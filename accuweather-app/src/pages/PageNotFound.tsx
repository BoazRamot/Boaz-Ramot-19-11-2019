import React, { useEffect } from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {createStyles, IconButton, makeStyles, Theme} from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {resetPageNotFoundAction, setPageNotFoundAction} from "../store/actions/action.userDataReducer";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { closeDrawerAction } from '../store/actions/action.mapReducer';
import clsx from 'clsx';
import useStyles from '../helpers/useStyles';

const useStylesIn = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      minWidth: 275,
    },
    header: {
      fontSize: '22px',
      lineHeight: '24px',
      fontWeight: 'bold',
    },
    link: {
      margin: 0,
      textDecoration: 'none',
      fontWeight: 600,
      lineHeight: '24px',
      color: '#00ad9f',
    }
  }),
);

interface IProps {
  setPageNotFound: Function;
  resetPageNotFound: Function;
  closeDrawer: Function;
  isOpen: boolean;
}

const PageNotFound: React.FC<IProps> = ({setPageNotFound, resetPageNotFound, closeDrawer, isOpen}) => {
  const classesIn = useStylesIn();
  const classes = useStyles();

  useEffect(() => {
    setPageNotFound();
    closeDrawer();
    // eslint-disable-next-line
  }, []);

  const handleBackToSite = () => {
    resetPageNotFound();
  };

  return (
    <Box 
      className={clsx(classes.content, {
        [classes.contentShift]: isOpen,
      })}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        background: 'rgb(14, 30, 37)',
        overflow: 'hidden',
        padding: 0,
        paddingBottom: 57
    }}>
      <Card className={classesIn.card}>
        <CardContent>
          <Typography
            className={classesIn.header}
            variant={"h5"}
            component={"h1"}
            gutterBottom
            style={{
              display: 'block',
              marginBlockStart: '0.67em',
              marginBlockEnd: '0.67em',
              marginInlineStart: '0px',
              marginInlineEnd: '0px',
              fontWeight: 'bold',
            }}
          >
            Page Not Found
          </Typography>
          <Typography
            component="p"
            style={{
              display: 'block',
              marginBlockStart: '1em',
              marginBlockEnd: '1em',
              marginInlineStart: '0px',
              marginInlineEnd: '0px',}}
          >
            Looks like you've followed a broken link or entered
            <br />
            a URL that doesn't exist on this site.
          </Typography>
        </CardContent>
        <CardActions>
          <RouterLink
            to={`/`}
            onClick={handleBackToSite}
          >
            <IconButton >
              <ChevronLeftIcon />
              <Typography className={classesIn.link}>
                Back to our site
              </Typography>
            </IconButton>
          </RouterLink>
        </CardActions>
      </Card>
    </Box>
  );
};


const mapStateToProps = (state: any) => ({
  isOpen: state.map.open,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setPageNotFound: () => dispatch(setPageNotFoundAction()),
  resetPageNotFound: () => dispatch(resetPageNotFoundAction()),
  closeDrawer: () => dispatch(closeDrawerAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageNotFound);
