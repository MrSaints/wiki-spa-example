import React from "react";
import PropTypes from "prop-types";

import ReactMarkdown from "react-markdown";
import { Divider } from "antd";

const Document = ({ title, data }) => (
    <div>
        <h2>{title}</h2>
        <Divider />
        <ReactMarkdown source={data} />,
    </div>
);

Document.propTypes = {
    title: PropTypes.string,
    data: PropTypes.string,
};

export default Document;
