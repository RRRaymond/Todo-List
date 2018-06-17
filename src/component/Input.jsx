import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/icons/ArrowDropDownCircle';
import Filter from './filter';

const styles = () => ({
    root: {
        width: '100%',
        maxWidth: 360,
        height: 80,
        margin: '0 auto',
        //padding: '10px 20px',
    },
    icon:{
        //width: '10%',
        margin: '0 0 0 8%'
    },
    text: {
        width: '84%',
        margin: '0 0 0 0px',
    },
    box:{
        width: '70%',
    },
});

const m_select = (e, props) => {
    props.changeSelect();
};

const addItem = (e, props) =>{

    // if(e.target.value === ''){
    //     return;
    // }
    // props.addItem(e.target.value);
    // e.target.value = '';
    //this.forceUpdate();
    //e.target.cleanUp();
};

const onEnter = (e) =>{
    if(e.keyCode === 13) {
        e.target.blur();
    }
};

function InputWithIcon(props) {
    const {classes} = props;

    return (
        <div className={classes.root}>
            <Grid container spacing={8} alignItems="flex-end">
                <Grid item className={classes.icon}>
                    <Icon color='secondary' onClick={(event)=>m_select(event, props)}/>
                </Grid>
                <Grid item className={classes.box}>
                    <TextField
                        id="input-with-icon-grid"
                        label="What needs to be done?"
                        className={classes.text}
                        onBlur={(event)=>addItem(event, props)}
                        onKeyDown={(event)=>onEnter(event)}
                    />
                </Grid>
                <Filter changeDisplay={props.changeDisplay}/>
            </Grid>
        </div>
    );
}

InputWithIcon.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputWithIcon);
