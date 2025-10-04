# API Endpoints Reference - Quick Reference Guide

## 📋 Overview
This document provides a quick reference for all API endpoints in the EcoZero Certify platform backend. For detailed implementation, see [BACKEND_API_DOCUMENTATION.md](./BACKEND_API_DOCUMENTATION.md).

**Base URL**: `https://api.ecozerocertify.com/v1`

---

## 🔐 Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | User registration | ❌ |
| `POST` | `/auth/login` | User login | ❌ |
| `POST` | `/auth/refresh` | Refresh access token | ❌ |
| `POST` | `/auth/logout` | User logout | ✅ |
| `POST` | `/auth/forgot-password` | Request password reset | ❌ |
| `POST` | `/auth/reset-password` | Reset password with token | ❌ |
| `GET` | `/auth/verify-email/:token` | Verify email address | ❌ |
| `POST` | `/auth/resend-verification` | Resend email verification | ✅ |

### **Request/Response Examples**

#### Register User
```bash
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "organization": "Acme Corp"
}
```

#### Login
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

---

## 👤 User Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/users/profile` | Get user profile | ✅ |
| `PUT` | `/users/profile` | Update user profile | ✅ |
| `POST` | `/users/avatar` | Upload user avatar | ✅ |
| `DELETE` | `/users/avatar` | Remove user avatar | ✅ |
| `PUT` | `/users/password` | Change password | ✅ |
| `DELETE` | `/users/account` | Delete user account | ✅ |

### **Request/Response Examples**

#### Get User Profile
```bash
GET /users/profile
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "john@example.com",
      "organization": "Acme Corp",
      "avatar": "https://storage.ecozerocertify.com/avatars/...",
      "emailVerified": true,
      "createdAt": "2023-10-01T10:00:00Z"
    }
  }
}
```

#### Update Profile
```bash
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Smith",
  "organization": "Updated Corp"
}
```

---

## 📊 Project Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/projects` | List user projects | ✅ |
| `POST` | `/projects` | Create new project | ✅ |
| `GET` | `/projects/:id` | Get project details | ✅ |
| `PUT` | `/projects/:id` | Update project | ✅ |
| `DELETE` | `/projects/:id` | Delete project | ✅ |
| `GET` | `/projects/:id/analytics` | Get project analytics | ✅ |
| `POST` | `/projects/:id/submit` | Submit project for review | ✅ |

### **Query Parameters for GET /projects**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by status (draft, in_progress, submitted, approved, rejected)
- `certificationType` - Filter by certification type
- `sortBy` - Sort field (createdAt, updatedAt, completionPercentage)
- `sortOrder` - Sort order (asc, desc)

### **Request/Response Examples**

#### List Projects
```bash
GET /projects?page=1&limit=10&status=in_progress
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "64f8a1b2c3d4e5f6a7b8c9d1",
        "buildingTitle": "Green Office Building",
        "certificationType": "LEED Building Design",
        "status": "in_progress",
        "completionPercentage": 45,
        "totalPoints": 100,
        "earnedPoints": 45,
        "createdAt": "2023-10-01T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

#### Create Project
```bash
POST /projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "certificationType": "LEED Building Design",
  "buildingTitle": "Green Office Building",
  "grossBuildingArea": 50000,
  "geoLocation": {
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "address": {
    "address1": "123 Green Street",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "postalCode": "10001"
  },
  "occupancyCategory": "Office",
  "targetCertificationArea": 45000
}
```

---

## 📝 Questionnaire Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/questionnaire/categories` | List all categories | ✅ |
| `GET` | `/questionnaire/categories/:id` | Get category details | ✅ |
| `GET` | `/questionnaire/categories/:id/questions` | Get category questions | ✅ |
| `GET` | `/projects/:projectId/responses/:categoryId` | Get responses for category | ✅ |
| `POST` | `/projects/:projectId/responses` | Save responses | ✅ |
| `PUT` | `/projects/:projectId/responses/:categoryId` | Update category responses | ✅ |
| `DELETE` | `/projects/:projectId/responses/:categoryId` | Clear category responses | ✅ |

### **Request/Response Examples**

#### Get Category Questions
```bash
GET /questionnaire/categories/location-transportation/questions
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "category": {
      "id": "location-transportation",
      "title": "Location and Transportation",
      "description": "Sustainable site selection and transportation strategies",
      "maxPoints": 18,
      "kpis": [
        {
          "id": "lt-credit-1",
          "title": "LEED ND Location Credit",
          "questions": [
            {
              "id": "leed-nd-credit",
              "label": "Has the project earned LEED for Neighborhood Development Location credit?",
              "type": "yes-no",
              "points": 5,
              "required": true
            }
          ]
        }
      ]
    }
  }
}
```

#### Save Responses
```bash
POST /projects/64f8a1b2c3d4e5f6a7b8c9d1/responses
Authorization: Bearer <token>
Content-Type: application/json

{
  "categoryId": "location-transportation",
  "responses": [
    {
      "questionId": "leed-nd-credit",
      "value": true
    },
    {
      "questionId": "dense-urban-area",
      "value": false
    }
  ]
}
```

---

## 📁 File Upload Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/upload/sign-url` | Get signed upload URL | ✅ |
| `POST` | `/upload/complete` | Complete file upload | ✅ |
| `GET` | `/upload/files/:projectId/:categoryId` | List uploaded files | ✅ |
| `DELETE` | `/upload/files/:fileId` | Delete uploaded file | ✅ |
| `GET` | `/upload/files/:fileId/download` | Download file | ✅ |

### **Request/Response Examples**

#### Get Signed Upload URL
```bash
POST /upload/sign-url
Authorization: Bearer <token>
Content-Type: application/json

{
  "filename": "site-plan.pdf",
  "mimeType": "application/pdf",
  "size": 2048576,
  "projectId": "64f8a1b2c3d4e5f6a7b8c9d1",
  "categoryId": "location-transportation",
  "uploadId": "location-documentation"
}

Response:
{
  "success": true,
  "data": {
    "uploadUrl": "https://storage.ecozerocertify.com/uploads/...",
    "fileId": "64f8a1b2c3d4e5f6a7b8c9d2",
    "expiresIn": 3600
  }
}
```

#### Complete Upload
```bash
POST /upload/complete
Authorization: Bearer <token>
Content-Type: application/json

{
  "fileId": "64f8a1b2c3d4e5f6a7b8c9d2",
  "projectId": "64f8a1b2c3d4e5f6a7b8c9d1",
  "categoryId": "location-transportation",
  "uploadId": "location-documentation"
}
```

---

## 📈 Analytics Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/projects/:id/analytics` | Project analytics | ✅ |
| `GET` | `/analytics/dashboard` | User dashboard analytics | ✅ |
| `GET` | `/analytics/progress/:projectId` | Progress tracking | ✅ |
| `GET` | `/analytics/points/:projectId` | Points breakdown | ✅ |

### **Request/Response Examples**

#### Get Project Analytics
```bash
GET /projects/64f8a1b2c3d4e5f6a7b8c9d1/analytics
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "overview": {
      "totalPoints": 100,
      "earnedPoints": 45,
      "completionPercentage": 45
    },
    "categories": [
      {
        "id": "location-transportation",
        "name": "Location and Transportation",
        "maxPoints": 18,
        "earnedPoints": 14,
        "completionPercentage": 78,
        "status": "in_progress"
      }
    ],
    "timeline": [
      {
        "date": "2023-10-01",
        "pointsEarned": 10,
        "description": "Completed basic information"
      }
    ]
  }
}
```

---

## 👨‍💼 Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/admin/users` | List all users | ✅ Admin |
| `GET` | `/admin/users/:id` | Get user details | ✅ Admin |
| `PUT` | `/admin/users/:id` | Update user | ✅ Admin |
| `DELETE` | `/admin/users/:id` | Delete user | ✅ Admin |
| `GET` | `/admin/projects` | List all projects | ✅ Admin |
| `GET` | `/admin/projects/:id` | Get project details | ✅ Admin |
| `PUT` | `/admin/projects/:id/approve` | Approve project | ✅ Admin |
| `PUT` | `/admin/projects/:id/reject` | Reject project | ✅ Admin |
| `GET` | `/admin/analytics` | System analytics | ✅ Admin |
| `GET` | `/admin/reports` | Generate reports | ✅ Admin |

### **Request/Response Examples**

#### List All Users (Admin)
```bash
GET /admin/users?page=1&limit=20&type=customer
Authorization: Bearer <admin-token>

Response:
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "64f8a1b2c3d4e5f6a7b8c9d0",
        "name": "John Doe",
        "email": "john@example.com",
        "organization": "Acme Corp",
        "type": "customer",
        "projectsCount": 3,
        "lastLoginAt": "2023-10-15T14:30:00Z",
        "createdAt": "2023-10-01T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8
    }
  }
}
```

#### Approve Project (Admin)
```bash
PUT /admin/projects/64f8a1b2c3d4e5f6a7b8c9d1/approve
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "notes": "Project meets all requirements",
  "certificationLevel": "Gold"
}
```

---

## 🔧 System Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/health` | Health check | ❌ |
| `GET` | `/version` | API version | ❌ |
| `GET` | `/status` | System status | ❌ |

### **Request/Response Examples**

#### Health Check
```bash
GET /health

Response:
{
  "status": "healthy",
  "timestamp": "2023-10-01T10:00:00Z",
  "uptime": 86400,
  "version": "1.0.0",
  "database": "connected",
  "storage": "available"
}
```

---

## 📊 Error Responses

All endpoints return consistent error responses:

### **Validation Error (400)**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email format is invalid"
      }
    ]
  }
}
```

### **Authentication Error (401)**
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

### **Authorization Error (403)**
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions"
  }
}
```

### **Not Found Error (404)**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### **Rate Limit Error (429)**
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "retryAfter": 60
  }
}
```

### **Server Error (500)**
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

---

## 🔑 Authentication Headers

### **Bearer Token**
```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **Content Type**
```bash
Content-Type: application/json
```

### **Rate Limit Headers**
```bash
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1696166100
```

---

## 📝 Common Query Parameters

### **Pagination**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

### **Sorting**
- `sortBy` - Field to sort by
- `sortOrder` - Sort order: `asc` or `desc`

### **Filtering**
- `status` - Filter by status
- `type` - Filter by type
- `dateFrom` - Filter from date (ISO format)
- `dateTo` - Filter to date (ISO format)

### **Search**
- `search` - Search term
- `searchFields` - Fields to search in

---

## 🧪 Testing Endpoints

### **Development/Staging Only**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/test/seed-data` | Seed test data | ❌ |
| `DELETE` | `/test/cleanup` | Clean test data | ❌ |
| `GET` | `/test/users` | List test users | ❌ |

---

## 📚 Additional Resources

- **[BACKEND_API_DOCUMENTATION.md](./BACKEND_API_DOCUMENTATION.md)** - Complete implementation guide
- **[MASTER_DOCUMENTATION.md](./MASTER_DOCUMENTATION.md)** - Frontend development guide
- **[Postman Collection](./postman-collection.json)** - Importable API collection
- **[OpenAPI Spec](./openapi-spec.yaml)** - Machine-readable API specification

---

**Last Updated**: October 1, 2025  
**Version**: 1.0  
**Status**: 📋 Ready for Implementation

---

*This reference guide provides quick access to all API endpoints. For detailed implementation, authentication flows, and data models, refer to the complete backend documentation.*

