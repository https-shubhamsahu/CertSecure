
import { redirect } from 'next/navigation';

export default function Home() {
  // By default, redirect to the app dashboard.
  // The dashboard will handle authentication state.
  redirect('/login');
}
