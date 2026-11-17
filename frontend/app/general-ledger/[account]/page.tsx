import Link from 'next/link';
import {accounts,lines,money} from '../../../lib/demo';
import {ArrowLeft} from 'lucide-react';
export default async function Ledger({params,searchParams}:{params:Promise<{account:string}>,searchParams:Promise<{period?:string,entity?:string}>}) {
 const {account}=await params;const q=await searchParams;const acct=accounts.find(a=>a.code===account);const entries=lines.filter(l=>l.account===account);
 return <><Link className="back-link" href="/financial-manager/trial-balance"><ArrowLeft size={16}/> Back to Trial Balance</Link><div className="heading-line"><div><div className="eyebrow">GENERAL LEDGER / ACCOUNT DETAIL</div><h1>{acct?.name ?? 'Account not found'}</h1><p className="muted">Account {account} · Entity {q.entity||'509004'} · Period {q.period||'2026-11'}</p></div></div>
 <div className="panel"><div className="table-header"><div><strong>Posted transactions</strong><p>Click a batch ID to open the original journal or imported batch on a separate page.</p></div><span className="environment">DEMO</span></div><div className="table-scroll"><table className="ledger-table"><thead><tr><th>Date</th><th>Batch ID</th><th>Type</th><th>Subsidiary</th><th>Notes</th><th className="numeric">Debit</th><th className="numeric">Credit</th></tr></thead><tbody>{entries.map(l=><tr key={l.record}><td>{l.date}</td><td><Link className="amount-link" href={'/batches/'+l.batch+'?from='+account}>#{l.batch}</Link></td><td>{l.kind}</td><td className="code">{l.entity}</td><td>{l.notes}</td><td className="numeric">{money(l.debit)}</td><td className="numeric">{money(l.credit)}</td></tr>)}</tbody></table></div>{!entries.length&&<p className="empty">No demo transactions for this account.</p>}</div>
 </>
}
