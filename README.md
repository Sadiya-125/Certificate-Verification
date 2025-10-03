# Certificate Verifier

A modern web application for verifying and generating certificates for the Geeks for Geeks Python and AIML Session organized by Corbett House. The application provides a secure, OTP-based verification system to ensure only authorized students can access their certificates.

## Features

- **Roll Number Verification**: Students enter their roll number to initiate the verification process
- **OTP-Based Authentication**: Secure email-based OTP verification for certificate access
- **Certificate Generation**: Dynamic certificate generation with student name and QR code
- **QR Code Integration**: Each certificate includes a unique QR code for verification
- **Certificate Download**: High-quality PNG download of certificates
- **Name Update**: Students can update their name if not previously set
- **Responsive Design**: Modern, mobile-friendly user interface
- **Email Notifications**: Automated OTP delivery via email

## Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon library

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Database ORM and migration tool
- **PostgreSQL** - Primary database
- **Nodemailer** - Email service for OTP delivery

### Utilities

- **QRCode** - QR code generation
- **html-to-image** - Certificate image export
- **Sharp** - Image processing
- **Sonner** - Toast notifications

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **PostgreSQL** database
- **Git** for version control

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Sadiya-125/Certificate-Verification.git
   cd Certificate-Verification
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/certificate_verifier"

   # Email Configuration
   EMAIL_SERVER="smtp.gmail.com"
   EMAIL_PORT="587"
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASSWORD="your-app-password"
   EMAIL_FROM="your-email@gmail.com"
   ```

## Running the Application

1. **Development mode:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

2. **Production build:**
   ```bash
   npm run build
   npm start
   ```

## Usage

### Student Certificate Verification Flow

1. **Enter Roll Number**: Students enter their roll number (e.g., 22f3001013)
2. **Receive OTP**: An OTP is sent to the student's registered email (`rollNumber@ds.study.iitm.ac.in`)
3. **Verify OTP**: Enter the 6-digit OTP received via email
4. **Update Name** (if required): If the student's name is not set, they can enter it
5. **View Certificate**: Access the personalized certificate with QR code
6. **Download Certificate**: Download the certificate as a high-quality PNG image
