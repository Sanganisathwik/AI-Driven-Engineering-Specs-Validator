# AI-Driven Engineering Specs Validator

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/sanganisathwik26-7782s-projects/v0-engineering-document-analysis)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/cZ2Tj5DhVrr)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

> A web-based platform that leverages artificial intelligence to analyze engineering documents, extract critical parameters, identify safety concerns, and generate detailed risk validation reports.

## Live Application

**[v0-engineering-document-analysis.vercel.app](https://v0-engineering-document-analysis.vercel.app)**

---

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [How to Use](#how-to-use)
- [Industry Coverage](#industry-coverage)
- [Author](#author)

---

## Overview

The AI-Driven Engineering Specs Validator addresses a common challenge in engineering workflow: the time-consuming process of manually reviewing technical documents for compliance and safety issues. This application streamlines that process by automatically analyzing engineering specifications and providing structured insights.

Originally developed to assist engineering teams in validating technical documentation against industry standards, the tool has evolved into a comprehensive platform supporting multiple engineering disciplines. Whether you're reviewing pressure vessel specifications, electrical panel designs, or chemical process flows, the validator provides consistent, rapid analysis while maintaining attention to critical safety parameters.

### Problem Statement

Engineering teams often face:
- Hours spent manually extracting data from lengthy technical documents
- Risk of overlooking critical safety parameters in complex specifications
- Inconsistent review processes across different projects
- Difficulty maintaining compliance with evolving industry standards
- Need for quick risk assessments during project planning phases

This tool was built to address these challenges by providing fast, consistent, and thorough document analysis.

---

## Core Features

### Intelligent Parameter Extraction

The application uses AI to automatically identify and extract key engineering data from uploaded documents. This includes operating conditions (pressure, temperature), material specifications, design parameters, and maintenance schedules. The extracted data is presented in a structured format, making it easy to review and verify critical specifications.

### Safety and Compliance Validation

Each document undergoes validation against industry-standard safety rules. The system checks for common issues such as incomplete pressure relief valve specifications, inadequate maintenance intervals, missing inspection schedules, and documentation gaps. Issues are categorized by severity level to help prioritize remediation efforts.

### Risk Assessment Reports

After analysis, the system generates a comprehensive report that includes:
- A numerical risk score (0-100) with contextual interpretation
- Summary of the document's primary safety considerations
- Table of extracted parameters with units and values
- List of identified issues with severity classifications
- Specific recommendations for addressing each concern

Reports can be downloaded as PDF files for inclusion in project documentation or compliance records.

### Document History Management

All analyzed documents are stored in a searchable history. Users can filter results by industry type, risk level, or date range, making it easy to track analysis trends across projects or quickly reference previous assessments.

---

## Technology Stack

### Frontend Architecture

The application is built on **Next.js 16.0** using the App Router architecture, providing server-side rendering capabilities and optimized page loading. **TypeScript** ensures type safety throughout the codebase, reducing runtime errors and improving maintainability.

The user interface is constructed with **React 19.2**, utilizing modern hooks and functional components. **Tailwind CSS** provides the styling foundation, enabling responsive design that adapts to mobile, tablet, and desktop viewports.

### Component Library

UI components are built on **Radix UI** primitives, which provide accessible, unstyled component foundations. Custom styling is applied to create a cohesive visual design while maintaining WCAG accessibility standards. **Lucide React** supplies the icon system, ensuring visual consistency across the interface.

### Form Handling and Validation

**React Hook Form** manages form state and validation, providing a performant solution for user input handling. File uploads are handled through **React Dropzone**, which supports drag-and-drop functionality and file type validation.

### Data Visualization

**Recharts** is used for rendering risk score visualizations and trend charts in the history view. The library integrates well with React and provides responsive chart components.

### Additional Libraries

- **next-themes**: Implements dark/light mode switching with system preference detection
- **Sonner**: Provides toast notifications for user feedback
- **date-fns**: Handles date formatting and manipulation
- **clsx** and **tailwind-merge**: Manage conditional CSS classes efficiently

---

## Getting Started

### Prerequisites

You'll need Node.js version 18.0 or higher installed on your system. The project supports npm, yarn, or pnpm as package managers.

### Installation Steps

Clone the repository to your local machine:

```bash
git clone https://github.com/Sanganisathwik/AI-Driven-Engineering-Specs-Validator.git
cd AI-Driven-Engineering-Specs-Validator
```

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000` in your web browser.

### Production Build

To create a production-optimized build:

```bash
npm run build
npm start
```

The build process optimizes assets, generates static pages where possible, and prepares the application for deployment.

---

## Project Structure

```
AI-Driven-Engineering-Specs-Validator/
├── app/                          # Application pages (Next.js App Router)
│   ├── page.tsx                  # Home/landing page
│   ├── upload/page.tsx           # Document upload interface
│   ├── processing/page.tsx       # Real-time analysis status
│   ├── results/page.tsx          # Analysis results display
│   ├── history/page.tsx          # Document history browser
│   ├── login/page.tsx            # User authentication
│   ├── layout.tsx                # Application layout wrapper
│   └── globals.css               # Global style definitions
├── components/                   # Reusable React components
│   ├── ui/                       # Base UI components (buttons, cards, inputs)
│   ├── navigation.tsx            # Main navigation component
│   ├── file-uploader.tsx         # File upload handler
│   ├── processing-steps.tsx      # Analysis progress indicator
│   ├── risk-score-card.tsx       # Risk score visualization
│   └── severity-badge.tsx        # Issue severity indicator
├── lib/                          # Utility functions and API client
│   ├── api.ts                    # Backend API communication
│   └── utils.ts                  # Helper functions
├── public/                       # Static assets (images, fonts)
├── styles/                       # Additional stylesheets
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript compiler options
└── package.json                  # Project dependencies and scripts
```

The structure follows Next.js conventions with the App Router pattern. Page components are located in the `app` directory, while reusable components reside in `components`. The `lib` directory contains business logic and API integration code.

---

## How to Use

### Uploading a Document

Navigate to the Upload page from the main menu. Select the appropriate industry category for your document (Oil & Gas, Mechanical, Electrical, or Chemical). This selection helps the AI apply relevant industry standards during analysis.

Upload your document either by dragging and dropping it onto the upload zone or by clicking to browse your file system. The application accepts PDF, DOCX, CSV, and TXT formats. Once you've selected both an industry and a file, click "Analyze Document" to begin processing.

### Analysis Process

During analysis, the application performs several operations:

1. **Document Parsing**: Extracts text content and structure from the uploaded file
2. **Parameter Extraction**: Identifies numerical values, units, and specifications
3. **Rule Validation**: Applies industry-specific safety rules to the document content
4. **Risk Calculation**: Computes an overall risk score based on identified issues
5. **Report Generation**: Compiles findings into a structured report

The process typically completes within 30-60 seconds, depending on document length and complexity. A progress indicator shows which step is currently executing.

### Reviewing Results

The results page presents your analysis in several sections:

**Risk Score**: A numerical assessment (0-100) indicating overall compliance and safety level. Lower scores indicate fewer concerns, while higher scores suggest multiple issues requiring attention.

**Summary**: A natural language overview of the document's primary safety considerations and any notable concerns.

**Extracted Parameters**: A table listing all identified specifications with their values and units. This serves as a quick reference for key design parameters.

**Identified Issues**: A list of potential problems found during validation, each tagged with a severity level (High, Medium, or Low) and a specific issue code for tracking purposes.

**Recommendations**: Actionable suggestions for addressing each identified issue, often with references to relevant industry standards.

### Managing History

The History page provides access to all previously analyzed documents. Use the search bar to find specific files by name, or apply filters to narrow results by industry type, risk level, or date range. Clicking on any history entry loads that document's full analysis report.

---

## Industry Coverage

The application currently supports four major engineering disciplines:

### Oil & Gas

Focuses on pressure vessels, pipeline systems, and safety valve specifications. Validates against API (American Petroleum Institute) and ASME (American Society of Mechanical Engineers) standards. Common checks include pressure relief sizing, material grade verification, and corrosion allowance validation.

### Mechanical Engineering

Covers rotating equipment, machinery specifications, and maintenance protocols. Emphasizes ASME and ISO standards compliance. Analysis includes bearing specifications, lubrication schedules, vibration limits, and preventive maintenance intervals.

### Electrical Engineering

Addresses electrical panel designs, power distribution systems, and protection schemes. References IEEE and NEC (National Electrical Code) standards. Validates circuit protection sizing, conductor specifications, grounding systems, and short-circuit calculations.

### Chemical Engineering

Examines chemical process flows, containment systems, and material compatibility. Applies OSHA and EPA regulatory requirements. Checks include material compatibility verification, emergency shutdown procedures, and environmental protection measures.

Each industry profile includes specific validation rules tailored to common safety concerns and regulatory requirements in that field.


---

## Author

**Sangani Sathwik**

GitHub: [@Sanganisathwik](https://github.com/Sanganisathwik)

Project Repository: [AI-Driven-Engineering-Specs-Validator](https://github.com/Sanganisathwik/AI-Driven-Engineering-Specs-Validator)

---

<div align="center">

**[⬆ back to top](#ai-driven-engineering-specs-validator)**

</div>
