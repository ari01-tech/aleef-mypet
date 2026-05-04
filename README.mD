# Aleef Project

## Client
```bash
cd client
npm install
npm run dev

## Server
cd server
npm install
npm start

# 🚀 Containerization & Orchestration

This project uses **Docker** and **Docker Compose** to run both the client (React + Vite) and server (Node.js/Express) in isolated containers.

## 🐳 Prerequisites
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Install [Docker Compose](https://docs.docker.com/compose/)

## 📦 Build & Run

### 1. Build images
```bash
docker-compose build

#.1
Prepare Dockerfiles
Setup
Define how to build images for both client and server.

Create client/Dockerfile with Node.js base image

Create server/Dockerfile with Node.js/Express base image

Include COPY, RUN npm install, and CMD instructions

#2
Write docker-compose.yml
Orchestration
Tie client and server together with Docker Compose.

Define services: client, server, and optional mongo

Map ports (e.g., 5173 for client, 5000 for server)

Use depends_on to ensure server waits for database

#3
Add README Instructions
Demonstration
Show clear usage steps for building and running containers.

Document docker-compose build and docker-compose up

Explain how to access client at http://localhost:5173

Explain how to access server at http://localhost:5000

#4
Verify and Push
Final Step
Confirm containers run correctly and commit changes.

Run docker-compose up locally and check logs

Ensure client and server respond

Commit Dockerfiles, docker-compose.yml, and README updates

Push to GitHub so examiner sees setup

# 🌐 Live Deployment

- Client (React/Vite): https://aleef-client.netlify.app
- Server (Node/Express): https://aleef-server.onrender.com/api

## How to Test
1. Open the client URL in a browser.
2. The client makes API calls to the server.
3. Server responds with live data from MongoDB.
