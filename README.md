

#  Recipe Collection Dashboard

A Full-Stack Recipe Browser using React, FastAPI & PostgreSQL

---

##  Project Overview


It allows users to browse, search, filter, and explore recipes using a clean, modern dashboard interface.

The project demonstrates:

* RESTful API design
* Database integration with PostgreSQL
* Data ingestion & preprocessing
* Modern React UI with drawer-based detail view
* Pagination, filtering, and responsive UI design

---

##  Key Features

###  Backend (FastAPI + PostgreSQL)

* REST APIs for fetching and searching recipes
* Pagination support
* Dynamic filtering (title, cuisine, rating, calories, time)
* JSON nutrition data stored using `JSONB`
* Data ingestion from large JSON dataset
* SQLAlchemy ORM integration

###  Frontend (React + JSX)

* Recipe list displayed in a table
* Truncated titles with tooltip support
* Star-based rating display
* Row-click opens a **right-side drawer**
* Expandable time details (prep & cook time)
* Nutrition details shown in a structured table
* Field-level filters using search API
* Pagination with customizable page size (15–50)
* Empty state handling
* Modern **brown & cream gradient UI theme**

---

##  Tech Stack

### Frontend

* React (JSX)
* Axios (API calls)
* CSS (custom styling, no frameworks)
* Vite (build tool)

### Backend

* FastAPI
* SQLAlchemy
* Pydantic
* PostgreSQL
* Psycopg2

---

## 📂 Project Structure

```
project-root/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── ingest_json.py
│   ├── .env
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── RecipeTable.jsx
│   │   │   ├── RecipeDrawer.jsx
│   │   │   ├── StarRating.jsx
│   │   │   └── Pagination.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── app.css
│   └── package.json
│
└── README.md



## Database Design

### Table: `recipes`

| Column Name | Type                 |
| ----------- | -------------------- |
| id          | SERIAL (Primary Key) |
| title       | VARCHAR              |
| cuisine     | VARCHAR              |
| rating      | FLOAT                |
| prep_time   | INTEGER              |
| cook_time   | INTEGER              |
| total_time  | INTEGER              |
| serves      | VARCHAR              |
| description | TEXT                 |
| nutrients   | JSONB                |



##  Data Ingestion

* Raw recipe data provided as a JSON file
* Processed and cleaned using Python
* Inserted into PostgreSQL using SQLAlchemy
* Handles nulls and nested nutrition fields

### Command to ingest data:


python ingest_json.py


##  Backend Setup & Run

###  Create Virtual Environment


python -m venv venv
venv\Scripts\activate


###  Install Dependencies


pip install -r requirements.txt


### Configure `.env`


DATABASE_URL=postgresql://recipeuser:recipepass@localhost:5432/recipes_db


### Run Backend Server


uvicorn main:app --reload


###  API Documentation

Open in browser:

http://localhost:8000/docs


## Frontend Setup & Run

### Install Dependencies


npm install


###  Start Development Server


npm run dev


Frontend runs at:


http://localhost:5173


##  API Endpoints

### Get Recipes (Paginated)


GET /api/recipes?page=1&limit=15


### Search Recipes

GET /api/recipes/search?title=peach&rating=4.5&calories=400


## UI & UX Highlights

* Brown & cream gradient background for food-themed UI
* White card-based layout for readability
* Hover effects on table rows
* Drawer animation for detail view
* Responsive filter grid
* Clean pagination controls



##  Functional Requirements Covered

✔ Fetch and render recipes in table
✔ Truncated title column
✔ Star-based rating UI
✔ Drawer-based detail view
✔ Expandable time details
✔ Nutrition table
✔ Field-level filters
✔ Pagination & page size control
✔ Empty & no-results states



##  How to Verify Backend & Database Connection

1. Open:


http://localhost:8000/api/recipes?page=1&limit=15


2. Confirm JSON response with recipe data

3. Backend logs show




##  this Project Demonstrates

* Full-stack application development
* REST API design
* Database modeling & ingestion
* Frontend state management
* UI/UX design without frameworks
* Debugging & integration skills







This project was built end-to-end from scratch, including:

* Backend APIs
* Database schema
* Data ingestion
* Frontend UI & UX
* Styling and debugging


