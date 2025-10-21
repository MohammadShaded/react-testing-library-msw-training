# react-testing-library-msw-training

A small React + TypeScript app scaffolded with Create React App. This repo is a training/example project focused on writing tests with React Testing Library and Mock Service Worker (MSW).

## Quick start

Clone the repository and install dependencies:

```powershell
# clone the repo
git clone https://github.com/MahmoudAbdAlKareem/react-testing-library-msw-training.git
cd react-testing-library-msw-training

# install dependencies (npm)
npm install
```

## Useful scripts

- Start the dev server:

```powershell
npm start
```

- Run tests once (Jest):

```powershell
npm test
```

- Run a single test file (example):

```powershell
npx jest src/components/SignUp/SignUp.test.tsx --runInBand -i
```

- Run tests with coverage (project-wide):

```powershell
npm test -- --coverage
```

## Notes

- MSW handlers are colocated with components under `src/components/<Component>/handlers.ts`.
- `src/APIs.ts` sets `axios.defaults.baseURL` to `https://api.realworld.io/api/` — tests mock requests to that URL.
- `src/setupTests.ts` configures Jest shims (fetch, TextEncoder/Decoder).

## Contributing / Testing tips

- Tests use `msw` server with `onUnhandledRequest: 'error'` in this project. Always add/update handlers for any network requests your tests trigger.
- Follow the test patterns in `src/components/SignUp/SignUp.test.tsx` for examples of validation and interaction tests.

If you see React "act()" warnings in test output, tests still pass — they indicate async state updates (Formik). Refactor the component's async flows (use async/await) or wrap updates in `act()` to remove the warnings.

## License

MIT
