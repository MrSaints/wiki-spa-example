import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect, PromiseState } from "react-refetch";

import config from "../config";

import { Divider } from "antd";

import PromiseStateWrapper from "../component/PromiseStateWrapper";
import DocumentsList from "../component/DocumentsList";

export class DocumentsPage extends React.Component {
    render() {
        const { docsFetch, match } = this.props;

        return (
            <PromiseStateWrapper
                promise={docsFetch}
                errorMsg="Failed to load Wiki documents. Please try again later."
                render={() => (
                    <div>
                        <h1>Documents</h1>
                        <Divider />
                        <DocumentsList
                            documents={docsFetch.value.titles}
                            renderItem={item => (
                                <Link to={`${match.url}/${item}`}>{item}</Link>
                            )}
                        />
                    </div>
                )}
            />
        );
    }
}

DocumentsPage.propTypes = {
    docsFetch: PropTypes.instanceOf(PromiseState).isRequired,
    match: PropTypes.shape({
        url: PropTypes.string,
    }),
};

export { DocumentsPage as _DocumentsPage };

export default connect(() => ({
    docsFetch: `${config.BASE_API_URL}/pages`,
}))(DocumentsPage);
