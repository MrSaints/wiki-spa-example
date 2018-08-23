import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Link } from "react-router-dom";
import { connect, PromiseState } from "react-refetch";

import config from "../config";

import { css } from "glamor";

import { Layout, Menu, Icon } from "antd";

import DateFormat from "../component/DateFormat";
import Revision from "./Revision";
import NewRevision from "./NewRevision";

const { Content, Sider } = Layout;

const styles = {
    wrapper: css({
        padding: "24px 0",
        background: "#FFF !important",
        " .ant-layout-sider-zero-width-trigger": {
            opacity: 0.75,
        },
    }),
    sidebar: css({
        background: "#FFF !important",
    }),
    content: css({
        padding: "0 24px 0 48px",
        minHeight: 280,
    }),
};

const DocumentPage = ({ revisionsFetch, match }) => (
    <Layout className={`${styles.wrapper}`}>
        <Sider
            className={`${styles.sidebar}`}
            collapsedWidth={0}
            collapsible={revisionsFetch.fulfilled}
            defaultCollapsed={true}
            width={200}
        >
            <Menu mode="inline" style={{ height: "100%" }}>
                <Menu.Item>
                    <Link to={`${match.url}/new-revision`}>
                        <Icon type="file-add" />New Revision
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={`${match.url}/revision/latest`}>
                        <Icon type="home" />
                        Latest
                    </Link>
                </Menu.Item>
                <Menu.SubMenu
                    title={
                        <span data-link="revisions">
                            <Icon type="database" />Revisions
                        </span>
                    }
                >
                    {revisionsFetch.fulfilled &&
                        revisionsFetch.value.revisions.map(rev => (
                            <Menu.Item key={rev}>
                                <Link to={`${match.url}/revision/${rev}`}>
                                    <span data-revision={rev}>
                                        <DateFormat>{rev}</DateFormat>
                                    </span>
                                </Link>
                            </Menu.Item>
                        ))}
                </Menu.SubMenu>
            </Menu>
        </Sider>

        <Content className={`${styles.content}`}>
            <Route
                exact
                path="/documents/:docID"
                render={() => <Redirect to={`${match.url}/revision/latest`} />}
            />
            <Route
                path="/documents/:docID/revision/:revID"
                component={Revision}
            />
            <Route
                path="/documents/:docID/new-revision"
                component={NewRevision}
            />
        </Content>
    </Layout>
);

DocumentPage.propTypes = {
    revisionsFetch: PropTypes.instanceOf(PromiseState).isRequired,
    match: PropTypes.shape({
        url: PropTypes.string,
    }),
};

export { DocumentPage as _DocumentPage };

export default connect(({ match }) => {
    return {
        revisionsFetch: {
            url: `${config.BASE_API_URL}/page/${match.params.docID}`,
            force: true,
        },
    };
})(DocumentPage);
