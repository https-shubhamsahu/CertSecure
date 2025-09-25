'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileUp, Share2, Award, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const certificates = [
  { id: 1, name: 'Advanced React', issuer: 'Dev University', date: '2023-05-20', image: '/cert-thumb-1.png' },
  { id: 2, name: 'Next.js Mastery', issuer: 'Code Academy', date: '2023-08-15', image: '/cert-thumb-2.png' },
  { id: 3, name: 'Firebase for Web', issuer: 'Google Devs', date: '2023-09-01', image: '/cert-thumb-3.png' },
]

export default function StudentDashboard({ user }: { user: any }) {
    return (
        <div className="grid gap-6">
            <Card className="bg-gradient-to-tr from-fuchsia-500 to-cyan-500 text-white shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-3xl">Your Digital Portfolio</CardTitle>
                    <CardDescription className="text-fuchsia-100">Manage, share, and track your verified certificates.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-4">
                    <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                        <FileUp className="mr-2 h-4 w-4" /> Upload New Certificate
                    </Button>
                    <Button variant="outline" className="bg-transparent hover:bg-white/10 text-white border-white/50">
                        <Share2 className="mr-2 h-4 w-4" /> Share My Portfolio
                    </Button>
                </CardContent>
            </Card>

            <div>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Award className="text-primary"/> My Certificates (3)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map(cert => (
                        <Card key={cert.id} className="overflow-hidden group transition-all hover:shadow-xl hover:-translate-y-1">
                             <CardContent className="p-0 relative">
                                <Image 
                                    src={`https://picsum.photos/seed/${cert.id}/600/400`}
                                    alt={cert.name}
                                    width={600}
                                    height={400}
                                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                                    data-ai-hint="certificate document"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                <Badge className="absolute top-2 right-2 gap-1 bg-green-100 text-green-800 border-green-200">
                                    <ShieldCheck className="h-3 w-3" />
                                    Verified
                                </Badge>
                            </CardContent>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg">{cert.name}</h3>
                                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                                <p className="text-xs text-muted-foreground mt-2">Issued: {cert.date}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
