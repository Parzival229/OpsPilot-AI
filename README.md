<p align="center">
<img src="assets/branding/cover/github-cover.png" width="100%">
</p>

<div align="center">

# OpsPilot AI

### Open-Source Reference Implementation of an Enterprise Hospital Operations Knowledge Copilot

*A modern healthcare AI reference project demonstrating secure enterprise architecture using React, FastAPI, and IBM watsonx.ai.*

<p>
  <img src="assets/branding/opspilot-symbol.png" alt="OpsPilot AI" width="140">
</p>

![Status](https://img.shields.io/badge/Status-Beta-2563EB)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)
![AI](https://img.shields.io/badge/AI-IBM%20watsonx.ai-1261FE)
![Deployment](https://img.shields.io/badge/Deployment-Render%20%7C%20Vercel-4CAF50)
![Python](https://img.shields.io/badge/Python-3.12+-3776AB)


</div>


<p align="center">

🏥 Healthcare Operations • ⚛️ React + Vite • ⚡ FastAPI • 🤖 IBM watsonx.ai • 🔒 Secure Backend • 📦 Modular Architecture


</p>

## Contents

- [Overview](#overview)
- [Repository Scope](#repository-scope)
- [Why This Project Exists](#why-this-project-exists)
- [System Architecture](#system-architecture)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Walkthrough](#project-walkthrough)
- [API Overview](#api-overview)
- [Deployment](#deployment)
- [Current Status](#current-status)
- [Public Roadmap](#public-roadmap)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)


## Overview

OpsPilot AI is an open-source reference implementation of an enterprise hospital operations knowledge copilot.

The project demonstrates how modern AI systems can support healthcare operations through a modular architecture that separates the frontend, backend services, authentication, and AI inference while following enterprise software engineering practices.

Rather than serving as a production healthcare platform, this repository focuses on architecture, maintainability, API design, and secure integration with IBM watsonx.ai.

It is intended for developers, students, researchers, and organizations interested in building enterprise-oriented healthcare AI applications.

## Repository Scope

> [!NOTE]
> **Repository Scope**
>
> OpsPilot AI is a public reference implementation that demonstrates enterprise application architecture, secure AI integration, and modern healthcare software engineering practices.
>
> Advanced enterprise capabilities—including proprietary healthcare knowledge assets, production retrieval pipelines, customer-specific integrations, and commercial deployment infrastructure—are intentionally outside the scope of this repository.

## Designed For

OpsPilot AI is intended for:

- Developers exploring enterprise AI application architecture.
- Students learning modern full-stack software engineering practices.
- Researchers investigating AI-assisted healthcare operations.
- Organizations evaluating architectural patterns for secure AI integration.

The repository emphasizes software architecture and engineering practices rather than production healthcare workflows.





## Why This Project Exists

Hospitals rely on a wide range of operational knowledge to coordinate clinical workflows, administrative procedures, emergency response, compliance requirements, and day-to-day decision making. Although this information exists, it is often distributed across documents, manuals, policies, and institutional guidelines, making it difficult to access quickly when operational decisions must be made.

OpsPilot AI explores how modern AI systems can improve access to operational guidance through a structured, secure, and maintainable software architecture. Rather than replacing institutional policies or human expertise, the project demonstrates how AI can assist healthcare professionals by organizing and presenting operational information in a consistent and intuitive manner.

This repository focuses on software engineering practices—including modular architecture, secure backend design, API-driven communication, and enterprise-oriented user experience—to provide a practical reference implementation for healthcare AI applications.

---------


## System Architecture

OpsPilot AI follows a layered architecture that separates the presentation layer, application services, AI integration, and security responsibilities. This separation improves maintainability, reduces coupling, and enables each component to evolve independently.

All AI requests are routed through a FastAPI backend rather than directly from the client application. This design protects sensitive credentials, centralizes authentication, and provides a foundation for future capabilities such as observability, request validation, caching, and enterprise integrations.

At runtime, the backend authenticates with IBM Cloud IAM, obtains a temporary access token, forwards the request to the deployed IBM watsonx.ai service, and returns a structured response to the frontend.

The result is a secure, modular architecture designed to demonstrate enterprise software engineering practices while remaining simple to understand and extend.



### Request Flow

```text
User

↓

Frontend

↓

Backend

↓

IBM IAM

↓

watsonx.ai

↓

Structured Response
```
<p align="center">
  <img src="assets/architecture/architecture-blueprint.png" alt="OpsPilot AI Architecture" width="100%">
</p>

<p align="center">
<em><strong>Figure 1.</strong> High-level system architecture of OpsPilot AI showing the interaction between the frontend, backend, IBM Cloud IAM, and IBM watsonx.ai.</em>
</p>

### Architectural Principles

| Principle | Description |
| --- | --- |
| Separation of Concerns | Frontend, backend, authentication, and AI services operate independently. |
| Security by Design | API credentials and authentication remain exclusively on the backend. |
| Provider Agnostic | The backend abstraction allows future AI providers to be integrated with minimal frontend changes. |
| Modular Design | Components are organized to simplify maintenance, testing, and future expansion. |
| API-First Communication | The frontend communicates only through documented REST endpoints. |


## Key Features

OpsPilot AI demonstrates a modular healthcare AI architecture that emphasizes secure integration, maintainability, and a structured user experience. The current reference implementation includes the following capabilities.

## Frontend Experience

- Modern React + Vite interface
- Responsive enterprise-inspired design
- Suggested operational scenarios
- Structured AI response cards
- Clear separation between user input and generated guidance

---

## Backend Services

- FastAPI REST API
- Secure backend proxy for AI inference
- Modular service-oriented architecture
- Centralized request validation
- Health monitoring endpoint
- Extensible API design for future integrations

---

## AI Integration

- IBM watsonx.ai foundation model integration
- Secure IBM Cloud IAM authentication
- Structured JSON response generation
- Context-aware operational guidance
- Backend-managed inference requests

---

## Security & Deployment

- API credentials isolated from the frontend
- Environment variable–based configuration
- Separate frontend and backend deployments
- Ready for cloud deployment using Render and Vercel



## Technology Stack

OpsPilot AI is built using widely adopted technologies selected for maintainability, security, and extensibility. The stack reflects the architecture of a modern enterprise web application while remaining approachable for learning and experimentation.

## Core Technologies

| Layer | Technology | Purpose | Version |
| --- | --- | --- | --- |
| Frontend | React + Vite | UI | Latest |
| Backend | FastAPI | REST API | Latest |
| AI | IBM watsonx.ai | Inference | Foundation Models |
| Authentication | IBM Cloud IAM | Secure Tokens | OAuth Based |







## Repository Structure

```text
OpsPilot-AI
│
├── assets/
│   ├── architecture/          # Architecture diagrams
│   ├── branding/              # Logos, cover image, visual assets
│   └── screenshots/           # UI screenshots
│
├── backend/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── app.py
│   └── requirements.txt
│
├── docs/
│   ├── api.md
│   ├── architecture.md
│   ├── deployment.md
│   ├── roadmap.md
│   └── security.md
│
├── public/
├── src/
│   ├── components/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
├── render.yaml
├── package.json
└── README.md
└── .env.example

```

## Project Walkthrough

OpsPilot AI is designed to provide an intuitive, distraction-free interface for healthcare professionals seeking operational guidance.

The current prototype focuses on clarity, rapid interaction, and structured AI-generated responses rather than conversational complexity.

## API Overview

| Endpoint | Method | Description |
| --- | --- | --- |
| `/` | GET | API information |
| `/health` | GET | Health status |
| `/ask` | POST | Generate operational guidance |


## Deployment

The latest public deployment of OpsPilot AI is available through the following services.

| Service | Platform | Status | Link |
| --- | --- | :---: | --- |
| Frontend | Vercel | ✅ | Live Demo |
| Backend | Render | ✅ | API |
| API Docs | Swagger | ✅ | `/docs` |


> [!NOTE]
> Live AI responses depend on the availability of the IBM watsonx.ai deployment associated with this project. During development, inference requests may occasionally be unavailable if project quotas have been exhausted.

## Homepage

<p align="center">
  <img src="assets/screenshots/homepage.png" alt="Homepage" width="100%">
</p>

<p align="center">
<em><strong>Figure 2.</strong> Homepage showing the enterprise-inspired interface for operational scenario queries.</em>
</p>

<p align="center">
<em><strong>Figure 3.</strong> Structured AI response organized into operational workflow, documentation, compliance, and responsible staff.</em>
</p>

The landing interface allows users to describe operational scenarios in natural language while maintaining a clean, enterprise-inspired user experience.

## AI Guidance Response

<p align="center">
  <img src="assets/screenshots/response-card.png" alt="AI Response" width="100%">
</p>

<p align="center">
<em><strong>Figure 3.</strong> Structured AI response organized into operational workflow, documentation, compliance, and responsible staff.</em>
</p>

Responses are organized into structured sections such as:

- Executive Summary
- Operational Workflow
- Responsible Staff
- Required Documentation
- Safety & Compliance
- Related Procedures
- Operational Checklist

This format improves readability and supports rapid operational decision-making.

## IBM watsonx.ai Integration

OpsPilot AI is powered by a deployed IBM watsonx.ai foundation model hosted in an IBM Deployment Space.

The backend securely authenticates using IBM Cloud IAM, exchanges the API key for a temporary IAM access token, and forwards requests to the deployed inference endpoint.

<p align="center">
  <img src="assets/screenshots/ibm-deployment.png" alt="IBM Deployment" width="100%">
</p>

<p align="center">
<em><strong>Figure 4.</strong> IBM watsonx.ai deployment configured as the backend inference service.</em>
</p>

This architecture ensures that sensitive credentials never reach the client application while maintaining compatibility with IBM's enterprise AI ecosystem.

## Security Architecture

| Security Principle | Implementation |
| --- | --- |
| Backend Authentication | IBM Cloud IAM |
| Secret Management | Environment variables on deployment platforms |
| Client Communication | Frontend communicates only with the FastAPI backend |
| Credential Isolation | IBM API keys never reach the browser |
| Token Management | Temporary IAM Bearer tokens generated server-side |
| Deployment Security | Sensitive configuration managed by Render and Vercel |


## Current Limitations

OpsPilot AI is a public reference implementation intended for learning, experimentation, and architectural demonstration.

Current limitations include:

- Live AI responses depend on the availability of the deployed IBM watsonx.ai service.
- During development, inference requests may be temporarily limited by IBM Cloud project quotas.
- Knowledge services currently operate within the demonstration scope of this repository.
- The project provides operational guidance only and should not replace institutional policies, regulatory requirements, or professional clinical judgment.

## Disclaimer

OpsPilot AI is a prototype developed for educational, research, and demonstration purposes.

The platform is intended to assist healthcare professionals by improving access to operational knowledge. It does **not** replace official hospital policies, clinical judgment, regulatory requirements, or professional medical decision-making.

Any operational guidance generated by the system should be verified against institutional procedures before use in real-world environments.

## Design Philosophy

| Principle | Description |
| --- | --- |
| **Clarity over Complexity** | Operational guidance should remain easy to understand during time-sensitive situations. |
| **Security by Design** | Sensitive credentials and AI infrastructure remain isolated behind the backend. |
| **Human-Centered Intelligence** | AI assists operational decision-making while preserving human oversight. |


**Human-Centered Intelligence**

The platform assists healthcare professionals by surfacing relevant institutional knowledge while keeping operational judgment with the user.

## Engineering Principles

| Principle | Benefit |
| --- | --- |
| Separation of Concerns | Independent frontend, backend, authentication, and AI layers improve maintainability. |
| Security First | Credentials remain exclusively on the backend. |
| Modular Architecture | Components can evolve independently with minimal coupling. |
| Provider Agnostic | Future AI providers can be integrated with minimal frontend changes. |
| Enterprise Ready | Architecture supports future logging, monitoring, caching, auditing, and integrations. |



### Separation of Concerns

The user interface, backend services, authentication, and AI inference are isolated into independent layers, making the system easier to maintain and extend.

### Security First

All IBM Cloud credentials remain exclusively on the backend. The frontend never communicates directly with IBM services.

### Modular Architecture

The application follows a modular structure so that components such as the AI provider, knowledge base, and frontend can evolve independently.

### Provider Agnostic Design

Although the current implementation uses IBM watsonx.ai, the backend abstraction allows future support for additional AI providers without major frontend changes.

### Enterprise Readiness

The architecture is intentionally designed to accommodate logging, monitoring, authentication, caching, audit trails, and future integrations with hospital information systems.

-------------------------

## Getting Started

The following steps will help you run the frontend and backend locally.

### Prerequisites

Before running OpsPilot AI locally, ensure the following software is installed:

- Python 3.12+
- Node.js 20+
- npm
- Git

---

### Clone the Repository

```bash
git clone https://github.com/Parzival229/OpsPilot-AI.git

cd OpsPilot-AI
```

---

### Frontend Setup

```bash
npm install
npm run dev
```

---

### Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

python -m uvicorn app:app --reload
```

## Documentation

Additional technical documentation is available in the `docs/` directory.

| Document | Purpose |
| --- | --- |
| `architecture.md` | High-level system architecture |
| `api.md` | Backend API overview |
| `deployment.md` | Deployment instructions |
| `security.md` | Security architecture and practices |
| `roadmap.md` | Public development roadmap |
---------------------------

## Environment Variables

OpsPilot AI requires environment variables for backend authentication with IBM Cloud.

The repository includes `.env.example` files for both the frontend and backend to demonstrate the expected configuration.

```env
IBM_API_KEY=your_ibm_cloud_api_key
IBM_DEPLOYMENT_ENDPOINT=https://your_ibm_deployment_endpoint
```

> [!IMPORTANT]
> Never commit API keys, access tokens, or deployment secrets to version control. Configure sensitive values through your deployment platform's secure environment variable management.

## Current Status

OpsPilot AI has reached a functional milestone where the frontend, backend, deployment pipeline, and AI integration are operational. The project continues to evolve as a public reference implementation for enterprise healthcare AI architecture.

| Component | Status | Description |
| --- | --- | --- |
| React Frontend | ✅ | User interface complete |
| FastAPI Backend | ✅ | Modular REST API |
| IBM watsonx.ai Integration | ✅ | Backend-managed inference |
| Render Deployment | ✅ | Backend deployed |
| Vercel Deployment | ✅ | Frontend deployed |
| API Documentation | ✅ | Swagger/OpenAPI available |
| Knowledge Services | 🚧 | Demonstration scope |
| Enterprise Platform Extensions | 🔒 | Outside the scope of this repository |

## Public Roadmap

## Completed

- [x] React + Vite frontend
- [x] FastAPI backend
- [x] IBM Cloud IAM authentication
- [x] IBM watsonx.ai integration
- [x] Secure backend proxy
- [x] Modular project architecture
- [x] Render backend deployment
- [x] Vercel frontend deployment
- [x] Interactive API documentation

---

## Planned Improvements

- [ ] Improve response formatting and UX
- [ ] Expand operational scenario coverage
- [ ] Add automated testing
- [ ] Docker support
- [ ] CI/CD workflow
- [ ] Enhanced logging and observability
- [ ] Response caching
- [ ] Accessibility improvements

---

## Out of Scope

The following capabilities are intentionally not part of the public reference implementation:

- Proprietary healthcare knowledge assets
- Commercial deployment infrastructure
- Customer-specific integrations
- Enterprise platform services
- Organization-specific operational knowledge

## Contributing

Contributions that improve code quality, documentation, testing, or developer experience are welcome.

Please open an issue before submitting significant changes to discuss the proposed approach.

## Acknowledgements

This project has been developed as part of an IBM SkillsBuild internship initiative to explore the application of enterprise AI technologies in healthcare operations.

Special thanks to IBM for providing access to the watsonx.ai platform and cloud services that enabled the development of this prototype.
---

---

<div align="center">

**OpsPilot AI**

Open-Source Reference Implementation of an Enterprise Hospital Operations Knowledge Copilot

Built with React • FastAPI • IBM watsonx.ai

Designed to demonstrate secure, modular, and enterprise-oriented healthcare AI architecture.


</div>
