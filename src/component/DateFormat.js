import React from "react";
import PropTypes from "prop-types";

import fnsFormat from "date-fns/format";
import isValid from "date-fns/is_valid";
import parse from "date-fns/parse";

const DateFormat = ({ children, format }) => {
    if (!children) {
        return children;
    }

    let date = children;
    if (Number.isInteger(children)) {
        date = children * 1000;
    }

    const parsedDate = parse(date);
    if (!isValid(parsedDate)) {
        return children;
    }

    return <React.Fragment>{fnsFormat(parsedDate, format)}</React.Fragment>;
};

DateFormat.propTypes = {
    children: PropTypes.number,
    format: PropTypes.string,
};

DateFormat.defaultProps = {
    format: "DD/MM/YYYY HH:mm:ss",
};

export default DateFormat;
