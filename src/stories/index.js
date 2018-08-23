/* eslint-env node */
import React from "react";

import { addDecorator, storiesOf } from "@storybook/react";

import { action } from "@storybook/addon-actions";
import { array, text, withKnobs } from "@storybook/addon-knobs";

import "../App.css";

import Document from "../component/Document";
import DocumentsList from "../component/DocumentsList";
import NewRevisionForm from "../component/NewRevisionForm";

const WrapperDecorator = storyFn => (
    <div style={{ padding: "1rem" }}>{storyFn()}</div>
);

addDecorator(WrapperDecorator);
addDecorator(withKnobs);

storiesOf("Document", module).add("default", () => (
    <Document
        title={text("Title", "arachnys")}
        data={text("Data", "# Arachnys\n\nI <3 Arachnys\n")}
    />
));

storiesOf("DocumentsList", module)
    .add("with default renderItem", () => (
        <DocumentsList documents={array("Documents", ["arachnys", "helloworld"])} />
    ))
    .add("with custom renderItem", () => (
        <DocumentsList
            documents={array("Documents", ["arachnys", "helloworld"])}
            renderItem={item => <a onClick={action(`click:${item}`)}>{item}</a>}
        />
    ));

storiesOf("NewRevisionForm", module).add("default", () => (
    <NewRevisionForm
        title={text("Title", "arachnys")}
        initialData={text("Initial Data", "Hello! This is the **first** revision.")}
        onSubmit={action("submit")}
    />
));
