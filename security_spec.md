# Security Specification: Pak GuruAI Psychometric Engine

## 1. Data Invariants
- Anyone taking the psychometric test can submit their test registration and result to `/participants/{participantId}`.
- Participants documents require valid fullName, birthDate, phone, mbtiType, and createdAt.
- Settings collection (`/settings/adminConfig`) holds the Admin WhatsApp number which can be read by visitors to contact admin, and updated by admin.

## 2. Payloads Analysis
- Create participant: requires `fullName`, `birthDate`, `phone`, `mbtiType`, `createdAt`.
- Read participant: admin can list and view all participants. Public can read/write their submitted participant record.
- Read settings: anyone can read admin contact number to contact via WhatsApp.

## 3. Security Rules
- Version: 2
- Catch-all default deny
- Public submit to `/participants` with validation
- Public read `/settings/{settingId}`
