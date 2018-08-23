import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect, PromiseState } from "react-refetch";

import config from "../config";

import PromiseStateWrapper from "../component/PromiseStateWrapper";
import NewRevisionForm from "../component/NewRevisionForm";

export class NewRevisionPage extends React.Component {
    constructor(props) {
        super(props);

        this.getPostMessage = this.getPostMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getPostMessage() {
        const { postRevisionResponse, match } = this.props;

        if (!postRevisionResponse) {
            return null;
        }

        return (
            <PromiseStateWrapper
                promise={postRevisionResponse}
                loadingMsg="Posting a new revision ..."
                errorMsg={`Failed to post a new revision of \`${
                    match.params.docID
                }\`. Please try again later.`}
                render={() => (
                    <Redirect to={`/documents/${match.params.docID}`} />
                )}
            />
        );
    }

    handleSubmit(values) {
        this.props.postRevision(values.data);
    }

    render() {
        const { latestFetch, match } = this.props;

        return (
            <PromiseStateWrapper
                promise={latestFetch}
                errorMsg={`Failed to load the latest revision of \`${
                    match.params.docID
                }\`. Document may not exist.`}
                render={value => (
                    <React.Fragment>
                        {this.getPostMessage()}
                        <NewRevisionForm
                            title={value.title}
                            initialData={value.data}
                            onSubmit={this.handleSubmit}
                        />
                    </React.Fragment>
                )}
            />
        );
    }
}

NewRevisionPage.propTypes = {
    postRevisionResponse: PropTypes.instanceOf(PromiseState).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            docID: PropTypes.string,
        }),
    }),
};

export { NewRevisionPage as _NewRevisionPage };

export default connect(({ match }) => ({
    latestFetch: `${config.BASE_API_URL}/page/${match.params.docID}/latest`,
    postRevision: page => ({
        postRevisionResponse: {
            url: `${config.BASE_API_URL}/page/${match.params.docID}`,
            method: "POST",
            body: JSON.stringify({ page }),
            handleResponse: res => {
                return res;
            },
        },
    }),
}))(NewRevisionPage);
