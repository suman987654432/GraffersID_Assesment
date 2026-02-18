# Review&RATE

## About
A full-stack web application for company reviews and ratings where users can add companies, submit reviews, and rate their experiences.

**Live Demo:** [https://graffersid-dassesment.vercel.app/](https://graffersid-dassesment.vercel.app/)

## Key Features
- Add and manage companies with logos
- Submit detailed reviews and ratings
- Filter and search companies
- Responsive design with modern UI
- Real-time data with MongoDB Atlas

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **File Upload:** Multer for logo uploads

## Project Structure
```
├── backend/
│   ├── server.js
│   ├── models/
│   │   ├── Company.js
│   │   └── Review.js
│   ├── controllers/
│   │   ├── companyController.js
│   │   └── reviewController.js
│   ├── routes/
│   │   ├── companyRoutes.js
│   │   └── reviewRoutes.js
│   └── uploads/logos/
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AddForm.jsx
    │   │   ├── Details.jsx
    │   │   ├── Filter.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── ReviewForm.jsx
    │   │   └── ShowCompany.jsx
    │   └── pages/
    │       └── Dashboard.jsx
    └── public/
```

## Quick Start

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend  
```bash
cd frontend
npm install
npm run dev
```

