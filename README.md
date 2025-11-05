# React Testing Library + MSW - SignUp Component

## 📘 Project Overview
This project is part of a training task focused on **testing React components** using:
- **React Testing Library** for component testing and user interaction simulation.
- **Jest** for test running and assertions.
- **MSW (Mock Service Worker)** for mocking API requests.

The goal of this task is to test the `SignUp` component with proper form validation, interaction, and API response handling, achieving at least **85% code coverage**.

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/MohammadShaded/react-testing-signup-msw.git
cd react-testing-signup-msw
```

### 2. Install dependencies
```bash
yarn install
```

### 3. Run the development server
```bash
yarn start
```

### 4. Run the tests with coverage
```bash
yarn test --coverage
# or
npm test -- --coverage
```

---

## 🧪 Test Cases Covered

### Validation
- Displays validation error for invalid email.
- Displays validation error for short password.
- Shows success message on successful signup.
- Shows error message on signup failure.

### Form Interaction
- Enables **Sign Up** button when form is valid.
- Disables button when form is invalid.
- Updates input fields based on user typing.
- Redirects user to home page after successful signup.

---

## 🧰 Tools & Libraries Used
- **React** (UI framework)
- **React Testing Library** (for component testing)
- **Jest** (test runner)
- **MSW** (mocking API requests)
- **Testing Library User Event** (simulates user input)

---

## 📈 Code Coverage
The `SignUp` component achieves **≥ 85% test coverage**, verified via Jest coverage report:
```
File          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------|---------|----------|---------|---------|-------------------
All files     |     100 |      100 |     100 |     100 |                  
 SignUp.tsx   |     100 |      100 |     100 |     100 |                  
 constants.ts |     100 |      100 |     100 |     100 |                  
 handlers.ts  |     100 |      100 |     100 |     100 |                  
 index.ts     |       0 |        0 |       0 |       0 |                  
--------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        11.542 s
Ran all test suites.
```

---

