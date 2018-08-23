import React from "react";
import PropTypes from "prop-types";
import { PromiseState } from "react-refetch";

import { css } from "glamor";

import { Alert, Spin } from "antd";

const styles = {
    loader: css({
        textAlign: "center",
    }),
};

const PromiseStateWrapper = ({ promise, loadingMsg, errorMsg, render }) => {
    if (promise.pending) {
        return (
            <div {...styles.loader}>
                <Spin tip={loadingMsg} />
            </div>
        );
    } else if (promise.rejected) {
        // eslint-disable-next-line no-console
        console.error(promise.reason);

        return (
            <Alert
                description={errorMsg}
                message="Error"
                showIcon
                type="error"
            />
        );
    } else if (promise.fulfilled) {
        return <div>{render(promise.value)}</div>;
    } else {
        return null;
    }
};

PromiseStateWrapper.propTypes = {
    promise: PropTypes.instanceOf(PromiseState).isRequired,
    loadingMsg: PropTypes.string,
    errorMsg: PropTypes.string,
    render: PropTypes.func.isRequired,
};

PromiseStateWrapper.defaultProps = {
    loadingMsg: "Loading ...",
    errorMsg: "Unexpected server error.",
};

export default PromiseStateWrapper;
