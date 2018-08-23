import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Link,
    Redirect,
    Route,
} from "react-router-dom";

import { css } from "glamor";
import "./App.css";

import Documents from "./page/Documents";
import Document from "./page/Document";

import { Layout, Menu } from "antd";
const { Header, Content } = Layout;

const styles = {
    headerMenu: css({
        lineHeight: "64px !important",
    }),
    content: css({
        padding: "2rem 50px !important",
    }),
};

class App extends Component {
    render() {
        return (
            <Router>
                <Layout>
                    <Header>
                        <Menu
                            selectedKeys={[]}
                            className={`${styles.headerMenu}`}
                            theme="dark"
                            mode="horizontal"
                        >
                            <Menu.Item>
                                <Link to="/">Home</Link>
                            </Menu.Item>
                        </Menu>
                    </Header>

                    <Content className={`${styles.content}`}>
                        <Route
                            exact
                            path="/"
                            render={() => <Redirect to="/documents" />}
                        />
                        <Route exact path="/documents" component={Documents} />
                        <Route path="/documents/:docID" component={Document} />
                    </Content>
                </Layout>
            </Router>
        );
    }
}

export default App;
