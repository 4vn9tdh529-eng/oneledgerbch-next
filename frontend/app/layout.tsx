import type { Metadata } from 'next';
import Shell from '../components/shell';
import './globals.css';
export const metadata: Metadata = {title:'OneLedger | Bulldog Holdings',description:'OneLedger 1.0 migration prototype'};
export default function Layout({children}:{children:React.ReactNode}) {return <html lang="en"><body><Shell>{children}</Shell></body></html>}
