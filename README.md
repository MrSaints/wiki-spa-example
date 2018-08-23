# wiki-spa-example

An example of a simple Wiki single page application (frontend-only) built using React, Ant Design, React Router, Refetch, Glamor, date-fns, and Ramda.

_The underlying REST API (backend) is not included in this example. Consequently, there will not be much success running some of the commands listed below. The frontend was built around the backend, and its requirements._

Bootstrapped using `create-react-app`.


## Development

To get started, run `yarn start`.

### Storybook

[Storybook for React](https://storybook.js.org/) was used for developing / testing components in isolation.
It is also used for automatic snapshot / structural testing.

### Testing

A combination of structural, interaction, style, and acceptance testing was used.
The slowest being the latter via [Nightmare.js](https://github.com/segmentio/nightmare).
In an ideal scenario, [consumer-driven contract testing](https://martinfowler.com/articles/consumerDrivenContracts.html) would be used instead of a full end-to-end test which indeed, do not account for all cases.

```
# Structural, interaction, and style tests
yarn test

# Acceptance tests
yarn test:acceptance
```


## Possible Improvements

- Ability to compare revisions
- Ability to re-fetch (i.e. "try again") on error
- Fix refetching / no-caching of document revisions
- Change title per page
- Introduce Flow type
- Auto-refresh (modify refetch)
