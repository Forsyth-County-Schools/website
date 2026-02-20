import { Metadata } from 'next';
import APIPPageClient from './APIPPageClient';

export const metadata: Metadata = {
  title: 'AP & IB Programs',
  description: 'Explore Advanced Placement and International Baccalaureate programs offered at Forsyth County Schools.',
};

export default function APIPPage() {
  return <APIPPageClient />;
}
