
'use client';

import { Bell, ShieldAlert, CheckCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '../ui/badge';

type Notification = {
  id: number;
  type: 'fraud' | 'verification' | 'system';
  message: string;
  timestamp: string;
  read: boolean;
};

const adminNotifications: Notification[] = [
  { id: 1, type: 'fraud', message: 'High-risk certificate detected from Gotham University.', timestamp: '5m ago', read: false },
  { id: 2, type: 'system', message: 'System update to v1.2.5 completed successfully.', timestamp: '1h ago', read: false },
  { id: 3, type: 'verification', message: 'Bulk verification of 500 certificates from Metropolis University complete.', timestamp: '3h ago', read: true },
  { id: 4, type: 'fraud', message: 'Multiple failed verification attempts from IP 192.168.1.100.', timestamp: '1d ago', read: true },
];

const universityNotifications: Notification[] = [
  { id: 1, type: 'verification', message: 'Your bulk upload of 50 certificates has been processed.', timestamp: '15m ago', read: false },
  { id: 2, type: 'fraud', message: 'A suspicious certificate (ID: CERT-SUS-001) was flagged for manual review.', timestamp: '2h ago', read: false },
  { id: 3, type: 'system', message: 'New report "Q2 Issuance Summary" is now available.', timestamp: '1d ago', read: true },
];

const getIcon = (type: Notification['type']) => {
  switch (type) {
    case 'fraud':
      return <ShieldAlert className="h-5 w-5 text-destructive" />;
    case 'verification':
      return <CheckCircle className="h-5 w-5 text-emerald-500" />;
    case 'system':
      return <FileText className="h-5 w-5 text-primary" />;
  }
};

export default function Notifications({ role }: { role: 'Admin' | 'University' | string }) {
  const notifications = role === 'Admin' ? adminNotifications : role === 'University' ? universityNotifications : [];
  const unreadCount = notifications.filter(n => !n.read).length;

  if (notifications.length === 0) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full h-9 w-9">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">{unreadCount}</Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have {unreadCount} unread messages.</CardDescription>
          </CardHeader>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map(notification => (
              <div key={notification.id} className={`flex items-start gap-4 p-4 border-t ${!notification.read ? 'bg-primary/5' : ''}`}>
                <div className='mt-1'>
                    {getIcon(notification.type)}
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">{notification.message}</p>
                  <p className="text-sm text-muted-foreground">{notification.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
