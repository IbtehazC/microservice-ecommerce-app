# Microservice E-commerce Application

A modern, scalable e-commerce application built using microservices architecture with Node.js, TypeScript, React, and Kubernetes.

## 🏗️ Architecture Overview

This application follows a microservices pattern with event-driven communication using NATS Streaming Server. Each service is containerized with Docker and orchestrated with Kubernetes.

### Services

| Service | Technology | Purpose | Port |
|---------|------------|---------|------|
| **Auth Service** | Node.js + Express + TypeScript | User authentication and authorization | 3000 |
| **Products Service** | Node.js + Express + TypeScript | Product management and CRUD operations | 3000 |
| **Client** | Next.js + React + TailwindCSS | Frontend user interface | 3000 |
| **NATS Streaming** | NATS | Event streaming and inter-service communication | 4222 |

## 🚀 Features

### Authentication Service
- User registration and login
- JWT-based authentication
- Cookie session management
- Password hashing and validation
- Protected routes with middleware

### Products Service
- Create, read, update products
- User-specific product ownership
- Price and inventory validation
- RESTful API endpoints

### Client Application
- Modern React-based UI with Next.js
- TailwindCSS for responsive design
- Authentication flow integration
- Product browsing and management
- Custom hooks for API requests

### Event Streaming
- NATS Streaming Server for event-driven architecture
- Product creation events
- Scalable pub/sub messaging pattern

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **Express Validator** - Request validation
- **Jest** - Testing framework

### Frontend
- **Next.js** - React framework
- **React** - UI library
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client

### Infrastructure
- **Docker** - Containerization
- **Kubernetes** - Container orchestration
- **Skaffold** - Kubernetes development workflow
- **NGINX Ingress** - Load balancing and routing
- **NATS Streaming** - Event streaming

### Development & Testing
- **Jest** - Unit testing
- **Supertest** - API testing
- **MongoDB Memory Server** - In-memory testing database
- **ts-node-dev** - TypeScript development server

## 📁 Project Structure

```
microservice-ecommerce-app/
├── auth/                     # Authentication microservice
│   ├── src/
│   │   ├── models/          # User models
│   │   ├── routes/          # Auth endpoints
│   │   ├── services/        # Business logic
│   │   └── test/            # Test configurations
│   ├── Dockerfile
│   └── package.json
├── products/                # Products microservice
│   ├── src/
│   │   ├── models/          # Product models
│   │   ├── routes/          # Product endpoints
│   │   └── test/            # Test configurations
│   ├── Dockerfile
│   └── package.json
├── client/                  # Next.js frontend
│   ├── pages/               # Next.js pages
│   ├── components/          # React components
│   ├── hooks/               # Custom hooks
│   ├── api/                 # API utilities
│   └── styles/              # CSS styles
├── nats-test/               # NATS testing utilities
│   └── src/events/          # Event definitions
├── infra/k8s/               # Kubernetes configurations
│   ├── auth-depl.yaml
│   ├── products-depl.yaml
│   ├── client-depl.yaml
│   ├── nats-depl.yaml
│   └── ingress-srv.yaml
└── skaffold.yaml            # Development workflow
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker Desktop
- Kubernetes (Docker Desktop or Minikube)
- Skaffold
- kubectl CLI

### Local Development Setup

#### Option 1: Full Kubernetes Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd microservice-ecommerce-app
   ```

2. **Install dependencies for each service**
   ```bash
   # Auth service
   cd auth && npm install

   # Products service
   cd ../products && npm install

   # Client application
   cd ../client && npm install

   # NATS test utilities
   cd ../nats-test && npm install
   ```

3. **Enable Kubernetes in Docker Desktop**
   - Open Docker Desktop
   - Go to Settings → Kubernetes
   - Check "Enable Kubernetes"
   - Apply & Restart

4. **Set up Kubernetes ingress**
   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
   ```

5. **Configure local DNS**
   Add the following to your hosts file:
   
   **Windows:** `C:\Windows\System32\drivers\etc\hosts`
   ```
   127.0.0.1 ecomm.com
   ```
   
   **Mac/Linux:** `/etc/hosts`
   ```
   127.0.0.1 ecomm.com
   ```

6. **Create required Kubernetes secrets**
   ```bash
   kubectl create secret generic jwt-secret --from-literal=JWT_KEY=your-secret-key
   ```

7. **Start development environment**
   ```bash
   skaffold dev
   ```

8. **Access the application**
   - Frontend: http://ecomm.com
   - Auth API: http://ecomm.com/api/users
   - Products API: http://ecomm.com/api/products

#### Option 2: Local Development (Without Kubernetes)

If you prefer to run services individually for development:

1. **Start MongoDB instances**
   ```bash
   # Terminal 1 - Auth MongoDB
   docker run --name auth-mongo -p 27017:27017 -d mongo

   # Terminal 2 - Products MongoDB  
   docker run --name products-mongo -p 27018:27017 -d mongo
   ```

2. **Start NATS Streaming Server**
   ```bash
   # Terminal 3
   docker run -p 4222:4222 -p 8222:8222 nats-streaming:0.17.0 -p 4222 -m 8222 -hbi 5s -hbt 5s -hbf 2 -SD -cid ticketing
   ```

3. **Set environment variables**
   Create `.env` files in each service directory:
   
   **auth/.env**
   ```
   JWT_KEY=your-secret-key
   MONGO_URI=mongodb://localhost:27017/auth
   NODE_ENV=development
   ```
   
   **products/.env**
   ```
   JWT_KEY=your-secret-key
   MONGO_URI=mongodb://localhost:27018/products
   NODE_ENV=development
   NATS_CLIENT_ID=products
   NATS_URL=http://localhost:4222
   NATS_CLUSTER_ID=ticketing
   ```

4. **Start each service**
   ```bash
   # Terminal 4 - Auth Service
   cd auth && npm start

   # Terminal 5 - Products Service  
   cd products && npm start

   # Terminal 6 - Client
   cd client && npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Auth API: http://localhost:3001/api/users
   - Products API: http://localhost:3002/api/products

#### Troubleshooting

**Common Issues:**

1. **Port conflicts**
   ```bash
   # Check what's running on ports
   lsof -i :3000
   # Kill process if needed
   kill -9 <PID>
   ```

2. **Kubernetes pods not starting**
   ```bash
   # Check pod status
   kubectl get pods
   
   # Check logs
   kubectl logs <pod-name>
   
   # Describe pod for events
   kubectl describe pod <pod-name>
   ```

3. **Ingress not working**
   ```bash
   # Verify ingress controller
   kubectl get pods -n ingress-nginx
   
   # Check ingress resource
   kubectl get ingress
   ```

4. **Database connection issues**
   ```bash
   # For local setup, ensure MongoDB containers are running
   docker ps
   
   # For Kubernetes, check MongoDB pods
   kubectl get pods | grep mongo
   ```

**Development Tips:**

- Use `skaffold dev` for automatic rebuilds during development
- Check `kubectl get pods` to monitor service health
- Use `kubectl logs <pod-name>` to debug issues
- For faster iteration, use `skaffold dev --port-forward` to access services directly

### Running Tests

Each service includes comprehensive test suites:

```bash
# Auth service tests
cd auth && npm test

# Products service tests
cd products && npm test
```

## 📝 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/signup` | Register new user |
| POST | `/api/users/signin` | User login |
| POST | `/api/users/signout` | User logout |
| GET | `/api/users/currentuser` | Get current user |

### Products Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product |

## 🌐 Deployment

The application is designed for cloud deployment with Kubernetes:

1. **Build and push images**
   ```bash
   skaffold run
   ```

2. **Deploy to production cluster**
   ```bash
   kubectl apply -f infra/k8s/
   ```

## 🔧 Development Workflow

- **Hot Reload**: Skaffold provides automatic rebuilding and redeployment
- **File Sync**: Source code changes are synced without full rebuilds
- **Local Development**: All services run locally in Kubernetes
- **Testing**: Comprehensive test suites with Jest and in-memory databases

## 📊 Monitoring & Health Checks

- Services include basic health endpoints
- Kubernetes readiness and liveness probes
- Container logging for debugging
- Event-driven architecture with NATS provides message durability

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built with modern microservices patterns
- Inspired by cloud-native architecture principles
- Utilizes industry-standard tools and practices

---

**Note**: This is a learning/portfolio project demonstrating microservices architecture, containerization, and cloud-native development practices.