import React from "react";
import PropTypes from "prop-types";

import { css } from "glamor";

import { List } from "antd";

const styles = {
    list: css({
        background: "#FFF !important",
    }),
};

const DocumentsList = ({ documents, renderItem }) => (
    <List
        bordered
        className={`${styles.list}`}
        dataSource={documents}
        size="large"
        renderItem={item => <List.Item>{renderItem(item)}</List.Item>}
    />
);

DocumentsList.propTypes = {
    documents: PropTypes.array,
    renderItem: PropTypes.func,
};

DocumentsList.defaultProps = {
    documents: [],
    renderItem: item => <span>{item}</span>,
};

export default DocumentsList;
