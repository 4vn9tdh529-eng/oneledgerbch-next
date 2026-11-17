'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, ListChecks, FileSpreadsheet, Building2, Settings2, ShieldCheck, ChevronRight, Layers3, ArrowLeftRight } from 'lucide-react';
const nav = [
 {url:'/dashboard',title:'Dashboard',Icon:LayoutDashboard},
 {url:'/journal-entries',title:'Journal Entries',Icon:FileSpreadsheet},
 {url:'/financial-manager/trial-balance',title:'Financial Manager',Icon:ListChecks},
 {url:'/general-ledger/10100',title:'General Ledger',Icon:BookOpen},
 {url:'/subsidiaries',title:'Subsidiary Registry',Icon:Building2},
 {url:'/erp-mapping',title:'ERP Mapping',Icon:ArrowLeftRight},
 {url:'/administration',title:'Administration',Icon:ShieldCheck},
];
export default function Shell({children}:{children:React.ReactNode}) {
 const path=usePathname();
 const current=nav.find(x=>path.startsWith(x.url)) ?? (path.startsWith('/batches') ? nav[1] : nav[0]);
 return <div className="app-shell"><aside className="sidebar">
   <div className="brand"><div className="brand-symbol"><Layers3 size={22}/></div><div><div className="brand-title">OneLedger</div><div className="brand-sub">BULLDOG HOLDINGS</div></div></div>
   <div className="nav-caption">WORKSPACE</div><nav>{nav.map(({url,title,Icon})=><Link className={'nav-item '+(current.url===url?'active':'')} href={url} key={url}><Icon size={17}/><span>{title}</span>{current.url===url&&<ChevronRight size={14} className="nav-end"/>}</Link>)}</nav>
   <div className="sidebar-bottom"><div className="avatar">OL</div><div><strong>Prototype workspace</strong><small>Not connected to Supabase</small></div><Settings2 size={16}/></div>
 </aside><div className="main-area"><header className="topbar"><span>OneLedger <ChevronRight size={14}/> {current.title}</span><div><span className="environment">DEMO DATA</span><span className="topbar-user">Bulldog Consolidated Holdings</span></div></header><main className="page-container">{children}</main></div>
 </div>;
}
