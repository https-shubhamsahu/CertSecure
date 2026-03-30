
'use client';

export type VerificationStatus = 'VERIFIED' | 'FRAUDULENT' | 'SUSPICIOUS';

export interface CertificateData {
  id: string;
  studentName: string;
  graduationDate: string;
  degree: string;
  gpa: number;
  universityName: string;
  registrationNumber: string;
  sealDescription: string;
  status: VerificationStatus;
  fraudIndicators: string[];
  extractedText: string;
  sha512Hash: string;
}

export const DUMMY_CERTIFICATES: Record<string, CertificateData> = {
  'authentic_certificate.jpg': {
    id: 'CS-VER-2026-001',
    studentName: 'Shubham Sahu',
    graduationDate: '2026-01-31',
    degree: 'Azure AI Fundamentals',
    gpa: 0,
    universityName: 'Microsoft',
    registrationNumber: 'w6k9n-48DB',
    sealDescription: 'Microsoft Certified Fundamentals badge and Microsoft branding.',
    status: 'VERIFIED',
    fraudIndicators: [],
    extractedText: `
Microsoft Certified
Azure AI Fundamentals

Shubham Sahu
has successfully completed the requirements of
Azure AI Fundamentals

Date Issued: January 31, 2026

Satya Nadella
Chief Executive Officer

Microsoft Certified Fundamentals
verify.certiport.com: w6k9n-48DB
`,
    sha512Hash: '1'.repeat(128),
  },
  'authentic_certificate.pdf': {
    id: 'CS-VER-2024-001',
    studentName: 'Amelia Chen',
    graduationDate: '2024-05-15',
    degree: 'Bachelor of Science in Artificial Intelligence',
    gpa: 3.92,
    universityName: 'Metropolis University',
    registrationNumber: 'MU-REG-847291',
    sealDescription: 'Official university seal with atom symbol and laurel wreath.',
    status: 'VERIFIED',
    fraudIndicators: [],
    extractedText: `
Metropolis University
---------------------
This is to certify that
Amelia Chen
has successfully completed the requirements for
Bachelor of Science in Artificial Intelligence
Graduation Date: 2024-05-15
GPA: 3.92
Registration #: MU-REG-847291
`,
    sha512Hash: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4',
  },
  'fraudulent_certificate.jpg': {
    id: 'CS-VER-2026-002',
    studentName: 'Shubham Sharma',
    graduationDate: '2022-07-15',
    degree: 'Indian Administrative Service (IAS) Officer',
    gpa: 0,
    universityName: 'Government of India (Demo)',
    registrationNumber: 'N/A',
    sealDescription: 'Lion Capital emblem with “सत्यमेव जयते” and ornate border.',
    status: 'FRAUDULENT',
    fraudIndicators: [
      'No official file/roll number or verification QR present.',
      'Issuer/format mismatch for an IAS appointment document.',
      'Signatures cannot be validated against a trusted registry.',
    ],
    extractedText: `
CERTIFICATE OF ACHIEVEMENT

This is to Certify that
Shubham Sharma
has successfully qualified and been appointed as an
INDIAN ADMINISTRATIVE SERVICE (IAS) OFFICER

In Recognition of His Outstanding Achievement and Dedication to Public Service

Date: 15th July 2022
Place: New Delhi

Rajiv Verma
Chairman, UPSC

R. Kumar
Cabinet Secretary
`,
    sha512Hash: '2'.repeat(128),
  },
  'suspicious_certificate.jpg': {
    id: 'CS-VER-2026-003',
    studentName: 'Shubham Sahu',
    graduationDate: 'N/A',
    degree: 'Certified Nonchalant Individual',
    gpa: 0,
    universityName: 'N/A',
    registrationNumber: 'N/A',
    sealDescription: '“Certified Nonchalant” gold seal with decorative border.',
    status: 'SUSPICIOUS',
    fraudIndicators: [
      'Non-standard certificate type (no issuing organization details).',
      'Missing date and unique verification identifier.',
      'Content appears informal/humorous; manual review recommended.',
    ],
    extractedText: `
CERTIFICATE OF NONCHALANCE

This is to proudly certify that
Shubham Sahu
has successfully demonstrated an exceptional level of calmness, effortless composure, and elite “I don’t stress, I observe” energy.

Awarded the title of
Certified Nonchalant Individual

For consistently maintaining a relaxed mindset,
staying unbothered in chaotic situations,
and mastering the art of low-key confidence.

Your ability to remain composed when others panic
is officially recognized and highly respected.

Date: __________
Authorized Signature: Chill Vibes

“Too calm to care, too focused to break.”
`,
    sha512Hash: '3'.repeat(128),
  },
  'suspicious_certificate.png': {
    id: 'CS-VER-2024-003',
    studentName: 'Chloe Rodriguez',
    graduationDate: '2024-01-10',
    degree: 'Doctor of Philosophy in Quantum Physics',
    gpa: 4.0,
    universityName: 'Starling City University',
    registrationNumber: 'SCU-REG-112358',
    sealDescription: 'University seal with an arrow and star constellation.',
    status: 'SUSPICIOUS',
    fraudIndicators: [
      'Low resolution image detected, potential sign of screenshot.',
      'Unusual whitespace around signature.',
      'Metadata indicates recent file modification.',
    ],
    extractedText: `
Starling City University
------------------------
Doctoral Degree Awarded to
Chloe Rodriguez
Doctor of Philosophy in Quantum Physics
Date: 2024-01-10
GPA: 4.0
Registration #: SCU-REG-112358
`,
    sha512Hash: '9a8b7c6d5e4f3a2b1c9a8b7c6d5e4f3a2b1c9a8b7c6d5e4f3a2b1c9a8b7c6d5e4f3a2b1c9a8b7c6d5e4f3a2b1c9a8b7c6d5e4f3a2b1c9a8b7c6d5e4f3a2b1c9a8b7c',
  },
  'default_certificate.pdf': {
    id: `CS-VER-${Date.now()}`,
    studentName: 'John Doe',
    graduationDate: '2023-10-27',
    degree: 'Bachelor of Creative Arts',
    gpa: 3.7,
    universityName: 'Dev University',
    registrationNumber: 'DU-REG-404040',
    sealDescription: 'Standard university seal.',
    status: 'VERIFIED',
    fraudIndicators: [],
    extractedText: `
Dev University
--------------
This certifies that
John Doe
has been awarded the degree of
Bachelor of Creative Arts
Date: 2023-10-27
`,
    sha512Hash: '0'.repeat(128),
  },
};

    