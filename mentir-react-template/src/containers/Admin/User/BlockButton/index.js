import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showNotification as showNotificationAction } from 'admin-on-rest';
import axios from "../../../../utils/axios";
import Button from "@material-ui/core/Button";

class BlockButton extends Component {
    constructor(props) {
        super(props);
        this.state = {block : this.props.record.block}
    }

    handleClick = () => {
        let { push, record, showNotification } = this.props;
        const updatedRecord = { ...record, block: record.block === 0? 1 : 0 };
        axios.post(`/users/${record.id}/block`, updatedRecord, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        })
            .then(() => {
                window.location.reload();
            });
    }

    render() {
        return <Button variant="contained" color="secondary" onClick={this.handleClick}>
            {this.state.block === 1? 'Unblock' : 'Block'}
        </Button>;
    }
}

BlockButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification: showNotificationAction,
    // push: pushAction,
})(BlockButton);