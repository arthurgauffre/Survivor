import pytest
from database.database import Base, get_db
from fastapi.testclient import TestClient
from index import app
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Configure test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override the dependency to use the test database session
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

# Apply the override to the FastAPI app
app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

# Create all tables in the test database
@pytest.fixture(autouse=True)
def setup_and_teardown():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def test_docs_redirect():
    response = client.get("/")
    assert response.status_code == 200
    assert response.url.endswith("/swagger-ui.html")

def test_login():
    response = client.post("/login", json={"email": "test@example.com", "password": "secret"})
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_get_customers():
    response = client.get("/api/customers/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_employee_image():
    response = client.get("/api/employees/1/image")
    assert response.status_code == 200

def test_get_clothes():
    response = client.get("/api/clothes")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_events():
    response = client.get("/api/events/1")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
