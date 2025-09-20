# Sweet Shop Management System (TDD Kata)

A full-stack Sweet Shop Management System built with **TypeScript, Node.js, Express, MongoDB, React, and Jest**.  
The project was developed following **Test-Driven Development (TDD)** practices with clear Red → Green → Refactor cycles.

---

## Project Structure
text
Copy code
project-root/
│── backend/         # Express + TypeScript API
│── frontend/        # React + Vite + Tailwind frontend
│── .github/workflows # CI/CD pipelines
│── README.md
## Features

### 🔐 Authentication
- User registration and login
- Token-based authentication (JWT)
- Role-based access (User / Admin)

### 🍬 Sweets Management
- View all sweets
- Search sweets by name, category, or price range
- Purchase sweets (decrease stock)
- Restock sweets (Admin only)
- Add, update, and delete sweets (Admin only)

### 🖥️ Frontend
- Register form
- Login form
- Protected routes
- Role-based dashboard
- Responsive UI
- Purchase button disabled when stock is 0
- Admin panel with CRUD controls
  

---

## Tech Stack

- **Backend**: Node.js, TypeScript, Express, PostgreSQL, JWT, Jest, Supertest
- **Frontend**: React, TypeScript, Vite, TailwindCSS, React Testing Library, Jest
- **Database**: MongoDB(Atlas)
- **Testing**: Jest, Supertest (backend), React Testing Library (frontend)
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel

---

## Setup Instructions

### 1. Clone the repository

git clone https://github.com/aditibajaj11/Sweet-Shop-Management-System
cd project-root

2. Backend Setup

cd backend
npm install
cp .env.example .env   # add DB credentials and JWT secret
npm run dev


API available at: http://localhost:5000

Run tests:

npm test

###3. Frontend Setup
cd frontend
npm install
npm run dev


App available at: http://localhost:5173

Run tests:

npm test

Tests

Backend: Unit & integration tests with Jest + Supertest

Frontend: Component & UI tests with React Testing Library + Jest

This project was built following the TDD cycle: **Red → Green → Refactor**,  
with failing tests committed first, followed by passing implementations.


To run all tests with coverage:

npm test -- --coverage

###Screenshots
<img width="1864" height="875" alt="Screenshot 2025-09-20 184454" src="https://github.com/user-attachments/assets/2a8c30c1-acca-4425-bbe9-b5888232ef01" />
<img width="1856" height="841" alt="Screenshot 2025-09-20 184422" src="https://github.com/user-attachments/assets/26133731-7ea9-44e7-a07a-ea3d1fce94c2" />
<img width="1820" height="849" alt="Screenshot 2025-09-20 184432" src="https://github.com/user-attachments/assets/d124158d-c46a-4f39-a9a8-b9ad46450f31" />
<img width="1888" height="829" alt="Screenshot 2025-09-20 184405" src="https://github.com/user-attachments/assets/7d1069d7-539e-4629-ba62-ef0dee68079c" />


###My AI Usage

I responsibly used AI tools to speed up development:

ChatGPT

Helped me prepare a roadmap for my assignmet
Helped draft frontend components (Dashboard, Login, Register), API service wrapppers and write backend api crud operations.
Provided CI/CD pipeline YAML.

GitHub Copilot

Suggested code completions while writing React components and Express routes.
Helped scaffold boilerplate and repetitive logic.
Assisted with debugging TypeScript and test failures.

Reflection

AI significantly accelerated the workflow, especially for boilerplate and testing.
However, all code was reviewed, refactored, and validated manually to ensure correctness and alignment with TDD practices.
Commit history clearly documents AI-assisted commits with Co-authored-by trailers.

Deployment

Frontend: Vercel (https://sweet-shop-management-system-two.vercel.app/register)
Backend: Render (https://sweet-shop-management-system-2-tgzi.onrender.com/)
