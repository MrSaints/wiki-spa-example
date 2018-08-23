import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "enzyme";
import { PromiseState } from "react-refetch";

import { _DocumentsPage } from "./Documents";

const testMatch = {
    url: "/test-url/",
};

const testError = new Error("Test Error");
const testDocuments = {
    titles: ["Lorem 1", "Ipsum 2", "Dolor 3"],
};

it("renders when loading", () => {
    const c = render(
        <_DocumentsPage docsFetch={PromiseState.create()} match={testMatch} />
    );
    expect(c.text()).toContain("Loading");
    expect(c.text()).not.toContain("Error");
});

it("renders when there is an error", () => {
    const c = render(
        <_DocumentsPage
            docsFetch={PromiseState.reject(testError)}
            match={testMatch}
        />
    );
    expect(c.text()).toContain("Error");
    expect(c.text()).toContain(
        "Failed to load Wiki documents. Please try again later."
    );
    expect(c.text()).not.toContain("Loading");
});

it("renders titles for all documents when loaded", () => {
    const c = render(
        <MemoryRouter>
            <_DocumentsPage
                docsFetch={PromiseState.resolve(testDocuments)}
                match={testMatch}
            />
        </MemoryRouter>
    );

    expect(testDocuments.titles.length).toBeGreaterThan(0);
    testDocuments.titles.forEach(title => {
        expect(c.text()).toContain(title);
    });
});
