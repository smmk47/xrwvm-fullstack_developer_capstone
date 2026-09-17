# Best Cars Dealership – Full Stack Developer Capstone

**Project name:** Best Cars Dealership Review Portal (IBM Full Stack Software Developer Capstone)

A responsive web application for Best Cars Dealership, a national car retailer in the U.S. Visitors can browse
dealership branches, filter them by state and read customer reviews with sentiment icons. Registered users can log
in and post reviews for any dealership.

## Architecture

| Component | Technology | Location | Port |
|-----------|------------|----------|------|
| Web application (auth, car makes/models, proxy to microservices, serves the React build and static pages) | Django 4 + SQLite | `server/` | 8000 |
| Frontend (Login, Register, Dealers, Dealer details, Post Review) | React 18 + React Router | `server/frontend/` | built into `server/frontend/build` |
| Dealerships & reviews API | Node.js + Express + Mongoose + MongoDB (Docker) | `server/database/` | 3030 |
| Sentiment analyzer microservice | Python Flask + NLTK VADER (deployable to IBM Cloud Code Engine) | `server/djangoapp/microservices/` | 5050 |
| CI | GitHub Actions – flake8 for Python, JSHint for JavaScript | `.github/workflows/main.yml` | – |
| Deployment | Docker image + Kubernetes manifest | `server/Dockerfile`, `server/deployment.yaml` | – |

## Running locally

```bash
# 1. Dealerships/reviews API (with MongoDB via Docker)
cd server/database
docker build . -t nodeapp
docker-compose up
#    ...or without Docker, using an in-memory MongoDB:
npm install && node local_start.js

# 2. Sentiment analyzer
cd server/djangoapp/microservices
pip install -r requirements.txt
flask run --port 5050

# 3. Django application
cd server
pip install -r requirements.txt
python manage.py makemigrations && python manage.py migrate
python manage.py createsuperuser
(cd frontend && npm install && npm run build)
python manage.py runserver
```

Then open http://localhost:8000.

## Django API endpoints

| Route | Description |
|-------|-------------|
| `POST /djangoapp/login` | Log in (`{"userName","password"}`) |
| `GET /djangoapp/logout` | Log out |
| `POST /djangoapp/register` | Register (`userName, password, firstName, lastName, email`) |
| `GET /djangoapp/get_cars` | All car makes and models |
| `GET /djangoapp/get_dealers` | All dealerships |
| `GET /djangoapp/get_dealers/<state>` | Dealerships in a state |
| `GET /djangoapp/dealer/<id>` | Dealer details |
| `GET /djangoapp/reviews/dealer/<id>` | Dealer reviews with sentiment |
| `POST /djangoapp/add_review` | Post a review (logged-in users) |

## Pages

- `/` Home, `/about` About Us, `/contact` Contact Us (static Django templates)
- `/login`, `/register`, `/dealers`, `/dealer/<id>`, `/postreview/<id>` (React)
- `/admin` Django admin (Car makes and models)
