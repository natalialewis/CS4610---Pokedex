import { redirect } from 'next/navigation';

export default function Home() {
  // Automatically redirect to Pokemon tab when home page loads
  redirect('/pokemon');
}
