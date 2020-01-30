import { createStyles, makeStyles, Theme } from '@material-ui/core';

const drawerWidth = '50vw';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'calc(100vh - 57px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    toogleRoot: {
      height: 'calc(100vh - 57px)',
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerRoot: {
      height: 'calc(100%)',
      display: 'flex',
      flexDirection: 'column',
    },
    drawerPaper: {
      height: 'calc(100% - 64px)',
      top: 64,
      width: drawerWidth,
    },
    drawerMap: {
      height: 'calc(100%)',
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      flexFlow: 'row',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'space-between',
    },
    drawerHeaderButton: {
      alignSelf: 'center',
      padding: theme.spacing(1),
    },
    content: {
      display: 'flex',
      flex: 1,
      alignSelf: 'stretch',
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: '-' + drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

export default useStyles;
