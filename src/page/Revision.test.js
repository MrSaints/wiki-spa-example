import React from "react";
import { render } from "enzyme";
import { PromiseState } from "react-refetch";

import { _RevisionPage } from "./Revision";

const testMatch = {
    params: {
        docID: "test-doc",
        revID: "test-rev",
    },
};

const testError = new Error("Test Error");
const testDocument = {
    title: "Test Title",
    data: "Test Data",
};

it("renders when loading", () => {
    const c = render(
        <_RevisionPage
            revisionFetch={PromiseState.create()}
            match={testMatch}
        />
    );
    expect(c.text()).toContain("Loading");
    expect(c.text()).not.toContain("Error");
});

it("renders when there is an error", () => {
    const c = render(
        <_RevisionPage
            revisionFetch={PromiseState.reject(testError)}
            match={testMatch}
        />
    );
    expect(c.text()).toContain("Error");
    expect(c.text()).toContain(
        "Failed to load `test-doc#test-rev`. Document or revision may not exist."
    );
    expect(c.text()).not.toContain("Loading");
});

it("renders a document's revision when loaded", () => {
    const c = render(
        <_RevisionPage
            revisionFetch={PromiseState.resolve(testDocument)}
            match={testMatch}
        />
    );
    expect(c.text()).toContain(testDocument.title);
    expect(c.text()).toContain(testDocument.data);
});
