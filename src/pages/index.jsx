import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import withRoot from '../withRoot';
import TODOList from '../component/TODOList'
import InputText from '../component/Input'

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 2,
    },
    head: {
        fontFamily: 'Baskerville',
        color: '#541e24',
        fontWeight: '560',
    },
    m_list: {
        background: '#541e24',
        margin: '0 auto',
        textAlign: 'center',
    },
});

class Index extends React.Component {
    state = {
        select: false,
        top: [{"type": true, "id": "吃饭", "display": ""}, {
            "type": false,
            "id": "睡觉",
            "display": ""
        }, {
            "type": true,
            "id": "打豆豆", "display": ""
        }],
    };

    componentWillMount() {
        if(localStorage.top === undefined){
            return;
        }
        this.setState({
            top: JSON.parse(localStorage.top),
        });
    };

    changeSelect = () => {
        let m_top = this.state.top;
        if (this.state.select) {
            for (let i = 0; i < m_top.length; i++) {
                m_top[i].type = true;
            }
        }
        else {
            for (let i = 0; i < m_top.length; i++) {
                m_top[i].type = false;
            }
        }
        this.setState({
            select: !this.state.select,
            top: m_top,
        });
        localStorage.top = JSON.stringify(this.state.top);
    };

    changeDisplay = (value) => {
        let m_top = this.state.top;
        switch (value) {
            case "All\n":
                for (let i = 0; i < m_top.length; i++) {
                    m_top[i].display = "";
                }
                break;
            case "Active\n":
                for (let i = 0; i < m_top.length; i++) {
                    if (m_top[i].type) {
                        m_top[i].display = "none";
                    }
                    else {
                        m_top[i].display = "";
                    }
                }
                break;
            case "Completed\n":
                for (let i = 0; i < m_top.length; i++) {
                    if (m_top[i].type) {
                        m_top[i].display = "";
                    }
                    else {
                        m_top[i].display = "none";
                    }
                }
                break;
            default:
                break;
        }
        this.setState({
            top: m_top,
        });
        localStorage.top = JSON.stringify(this.state.top);
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    handleClick = () => {
        this.setState({
            open: true,
        });
    };

    addItem = (value) => {
        const m_top = this.state.top;
        m_top.push({"type": false, "id": value});
        this.setState({
            top: m_top,
        });
        localStorage.top = JSON.stringify(this.state.top);
    };

    updateTop = (value) => {
        this.setState({
            top: value,
        });
        localStorage.top = JSON.stringify(this.state.top);
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="display3" className={this.props.classes.head} gutterBottom>
                    TODOS
                </Typography>
                <InputText
                    className={this.props.classes.m_list}
                    addItem={this.addItem}
                    changeSelect={this.changeSelect}
                    changeDisplay={this.changeDisplay}
                />
                {/*<Button variant="contained" color="secondary" onClick={this.handleClick}>*/}
                {/*Super Secret Password*/}
                {/*</Button>*/}
                <TODOList
                    className={this.props.classes.m_list}
                    top={this.state.top}
                    updateTop={this.updateTop}
                />
            </div>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
