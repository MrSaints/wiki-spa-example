import nightmare from "nightmare";

describe("Homepage: /", () => {
    const isReady = () => {
        return document.body.textContent.indexOf("Documents") !== -1;
    };

    let page = null;
    beforeEach(() => {
        page = nightmare()
            .goto("http://localhost:3000")
            .wait(isReady);
    });

    it("shows a list of documents", async () => {
        const textContents = await page
            .evaluate(() => document.body.textContent)
            .end();
        expect(textContents).toContain("helloworld");
        expect(textContents).toContain("rickmorty");
    });

    it("allows you to click on a document", async () => {
        const nextURL = await page
            .evaluate(() => {
                const links = Array.from(document.querySelectorAll("a"));
                const link = links.find(link => {
                    return link.textContent.indexOf("rickmorty") !== -1;
                });
                link.click();
            })
            .evaluate(() => {
                return (
                    document.body.textContent.indexOf("Rick & Morty Quotes") !==
                    -1
                );
            })
            .url()
            .end();
        expect(nextURL).toEqual(
            "http://localhost:3000/documents/rickmorty/revision/latest"
        );
    });
});

describe("Document: /documents/helloworld", () => {
    const isReady = () => {
        return document.body.textContent.indexOf("helloworld") !== -1;
    };

    let page = null;
    beforeEach(() => {
        page = nightmare()
            .goto("http://localhost:3000/documents/helloworld")
            .wait(isReady);
    });

    it("shows the contents of the latest revision (formatted with markdown)", async () => {
        const htmlContents = await page
            .evaluate(() => document.querySelector("p").innerHTML)
            .end();
        expect(htmlContents).toContain("<strong>Third revision.</strong>");
    });

    it("shows the list of the supplied revisions", async () => {
        const links = await page
            .click(".ant-layout-sider-zero-width-trigger")
            .wait(500)
            .click("span[data-link=\"revisions\"]")
            .wait(500)
            .evaluate(() => {
                return document.querySelectorAll("span[data-revision]").length;
            })
            .end();

        expect(links).toEqual(4);
    });

    it("allows you to choose a revision, and view the document at that time", async () => {
        const htmlContents = await page
            .click(".ant-layout-sider-zero-width-trigger")
            .wait(500)
            .click("span[data-link=\"revisions\"]")
            .wait(500)
            .evaluate(() => {
                document.querySelector("span[data-revision]").click();
            })
            .wait(isReady)
            .evaluate(() => document.querySelector("p").innerHTML)
            .end();

        expect(htmlContents).toContain("Hello World!");
    });
});
