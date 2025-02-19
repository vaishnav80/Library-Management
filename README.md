# Django REST API - Book Management

## Objective
The objective of this project is to develop a Django REST API for managing books, users, and reading lists.

## Features

### 1. User Management
- Users can register, log in, and manage their profiles.
- Each user has a unique username and email address.

### 2. Book Management
- Users can create, remove, and upload books.
- All users can access all the books.
- Each book includes:
  - Title
  - Author(s)
  - Genre
  - Publication date
  - Optional description

### 3. Reading Lists
- Users can create and manage reading lists.
- Reading lists allow users to organize books in their preferred order.

### 4. Interactions
- Users can add books to their reading lists and remove them.

### 5. Error Handling
- The API handles errors gracefully and provides informative error responses to users.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vaishnav80/Library-Management/
   cd django-rest-book-management
   ```

2. Set up a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Apply migrations:
   ```bash
   python manage.py migrate
   ```

5. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

6. Run the development server:
   ```bash
   python manage.py runserver
   ```

## Technologies Used
- Django
- Django REST Framework (DRF)
- React (Frontend hosted on Vercel)
- SQLite/PostgreSQL
- Python

## Deployment
The frontend is hosted on Vercel and can be accessed at:
[Library Management](https://library-management-4cu8.vercel.app/)

## License
This project is open-source and available under the MIT License.

