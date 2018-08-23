import React from "react";
import PropTypes from "prop-types";
import { connect, PromiseState } from "react-refetch";

import config from "../config";

import PromiseStateWrapper from "../component/PromiseStateWrapper";
import Document from "../component/Document";

const RevisionPage = ({ revisionFetch, match }) => (
    <PromiseStateWrapper
        promise={revisionFetch}
        errorMsg={`Failed to load \`${match.params.docID}#${
            match.params.revID
        }\`. Document or revision may not exist.`}
        render={value => <Document title={value.title} data={value.data} />}
    />
);

RevisionPage.propTypes = {
    revisionFetch: PropTypes.instanceOf(PromiseState).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            docID: PropTypes.string,
            revID: PropTypes.string,
        }),
    }),
};

export { RevisionPage as _RevisionPage };

export default connect(({ match }) => {
    return {
        revisionFetch: `${config.BASE_API_URL}/page/${
            match.params.docID
        }/${match.params.revID || "latest"}`,
    };
})(RevisionPage);
