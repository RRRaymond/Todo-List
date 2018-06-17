import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Input from "@material-ui/core/Input";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        margin: '0 auto',
    },
});

class CheckboxList extends React.Component {


    state = {
        top: [],
        checked: [0],
        undisplay: -1,
    };

    handleToggle = (e, i) => {
        // const { checked } = this.state;
        // const currentIndex = checked.indexOf(value);
        // const newChecked = [...checked];
        //
        // if (currentIndex === -1) {
        //     newChecked.push(value);
        // } else {
        //     newChecked.splice(currentIndex, 1);
        // }
        //
        // this.setState({
        //     checked: newChecked,
        // }
        let m_top = this.state.top;
        console.log(e.target.checked);
        m_top[i].type = e.target.checked;
        this.setState({
            undisplay: -1,
            top: m_top,
        });
        this.props.updateTop(this.state.top);
    };

    handleTouch = value => {
        let temp1 = document.getElementById(`${value}`);
        let temp2 = document.getElementById(`l${value}`);
        temp1.value = temp2.firstElementChild.innerHTML;
        this.setState({
           undisplay: value,
        });
        setTimeout(function(){ temp1.focus();},100);
        //temp.value = temp.defaultValue;
        // console.log(temp);

    };

    handleunTouch = (e)  => {
        //console.log(this.state.top);
        let m_top = this.state.top;
        m_top[parseInt(e.target.id, 10)].id = e.target.value;
        this.setState({
            undisplay: -1,
            top: m_top,
        });
        this.props.updateTop(this.state.top);
        //console.log(e.target);
    };

    onEnter =  (e) => {
        if(e.keyCode === 13){
            this.handleunTouch(e);
        }
    };



    m_delete = (i) => {
        // alert('delete');
        const m_top = this.state.top;

        m_top.splice(i,1);

        this.setState({
            top: m_top,
        });
        // setTimeout(()=>{}, 100);
        // for(let j=0;j<m_top.length;j++){
        //     let temp = document.getElementById(`${j}`);
        //     temp.value = temp.defaultvalue;
        // }
        this.props.updateTop(this.state.top);
        //console.log(this.top);
    };

    componentWillMount () {
        this.setState({
            top: this.props.top,
        });
    }

    render() {
        const { classes} = this.props;

        return (
            <div className={classes.root}>
                <List>
                    {this.state.top.map((item, i) => (
                        <ListItem
                            key={i}
                            role={undefined}
                            dense
                            button
                            ref={`item${i}`}
                            style={{display:item.display}}
                            // onClick={this.handleToggle(value)}
                            className={classes.listItem}
                        >
                            <Checkbox
                                //checked={this.state.checked.indexOf(i) !== -1}
                                checked={item.type}
                                tabIndex={-1}
                                disableRipple
                                onClick={(event)=>this.handleToggle(event, i)}
                            />
                            <ListItemText
                                id={`l${i}`}
                                onClick={()=>this.handleTouch(i)}
                                primary={item.id}
                                style={{
                                    display:this.state.undisplay === i ? 'none' : 'inline',
                                    textDecoration:item.type ? 'line-through' : 'none',
                                }}
                            />
                            <FormControl style={{display:this.state.undisplay === i ? 'inline' : 'none'}}>
                                <InputLabel htmlFor={`${i}`} >Edit</InputLabel>
                                <Input
                                    id={`${i}`}
                                    defaultValue={item.id}
                                    onBlur={this.handleunTouch}
                                    onKeyDown={this.onEnter}
                                />
                            </FormControl>
                            <ListItemSecondaryAction >
                                <IconButton aria-label="Delete" onClick={()=>this.m_delete(i)}>
                                    <CloseIcon style={{display:item.display}}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

CheckboxList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxList);
