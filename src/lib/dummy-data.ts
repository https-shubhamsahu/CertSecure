
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
    id: 'CS-VER-2024-002',
    studentName: 'Benjamin Lee',
    graduationDate: '2023-12-20',
    degree: 'Master of Business Administration',
    gpa: 3.5,
    universityName: 'Gotham Institute of Technology',
    registrationNumber: 'GIT-REG-553810',
    sealDescription: 'Institute seal with gear and cog design.',
    status: 'FRAUDULENT',
    fraudIndicators: [
      'Font mismatch detected in "Date" field.',
      'Seal checksum validation failed.',
      'Alignment inconsistencies in header.',
    ],
    extractedText: `
Gotham Institute of Technology
-----------------------------
Certificate of Completion
Benjamin Lee
Master of Business Administration
Date: 2023-12-20 (Altered)
GPA: 3.5
`,
    sha512Hash: 'f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1',
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

    