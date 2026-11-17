'use client';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {AllCommunityModule, ModuleRegistry, themeQuartz, type ColDef, type CellValueChangedEvent} from 'ag-grid-community';
import {CirclePlus, Save, Trash2} from 'lucide-react';
ModuleRegistry.registerModules([AllCommunityModule]);
const gridTheme = themeQuartz.withParams({accentColor:'#315779',backgroundColor:'#ffffff',headerBackgroundColor:'#f1f5f9',foregroundColor:'#223147',fontSize:13,spacing:7,rowBorder:true});
const names:Record<string,string>={'10100':'Cash and Cash Equivalents','10200':'Accounts Receivable','20100':'Accounts Payable','40100':'Product Sales Revenue'};
type Line={id:number;subsidiary:string;account:string;description:string;debit:number|null;credit:number|null;notes:string;date:string};
const today=()=>new Date().toLocaleDateString('en-CA');
const blank=(n:number):Line=>({id:n,subsidiary:'509004',account:'',description:'',debit:null,credit:null,notes:'',date:today()});
const initial=()=>Array.from({length:25},(_,i)=>blank(i+1));
const currency=(n:number)=>n.toLocaleString('en-US',{style:'currency',currency:'USD'});
const DRAFT_KEY='oneledger_v1_local_journal_draft';
export default function Journals(){const [rows,setRows]=useState<Line[]>(initial);const [message,setMessage]=useState('');const [hydrated,setHydrated]=useState(false);const rowsRef=useRef(rows);rowsRef.current=rows;
 useEffect(()=>{try{const raw=window.localStorage.getItem(DRAFT_KEY);if(raw){const parsed=JSON.parse(raw);if(Array.isArray(parsed)&&parsed.length>0&&parsed.length<10000){setRows(parsed)}}}catch{}setHydrated(true)},[]);
 const onCellValueChanged=useCallback((e:CellValueChangedEvent<Line>)=>{if(!e.data)return;const row=e.data;const copy={...row,description:names[String(row.account||'').trim()]||''};setRows(current=>current.map(r=>r.id===copy.id?copy:r));setMessage('Unsaved changes');},[]);
 const cols=useMemo<ColDef<Line>[]>(()=>[
  {field:'subsidiary',headerName:'Subsidiary ID',minWidth:135,width:155},
  {field:'account',headerName:'Account',minWidth:120,width:130,tooltipValueGetter:p=>p.value?'Type a corporate account code (demo catalog)':''},
  {field:'description',headerName:'Description',minWidth:245,flex:2,editable:false,cellClass:'readonly-cell'},
  {field:'debit',headerName:'Debit',minWidth:125,width:145,type:'numericColumn',valueParser:p=>p.newValue===''?null:Number(p.newValue),valueFormatter:p=>p.value===null||p.value===''?'':Number(p.value).toFixed(2)},
  {field:'credit',headerName:'Credit',minWidth:125,width:145,type:'numericColumn',valueParser:p=>p.newValue===''?null:Number(p.newValue),valueFormatter:p=>p.value===null||p.value===''?'':Number(p.value).toFixed(2)},
  {field:'notes',headerName:'Notes',minWidth:195,flex:2},
  {field:'date',headerName:'Date',minWidth:125,width:145},
 ],[]);
 const totals=useMemo(()=>rows.reduce((a,r)=>({debit:a.debit+(Number(r.debit)||0),credit:a.credit+(Number(r.credit)||0)}),{debit:0,credit:0}),[rows]);
 const add=()=>setRows(x=>[...x,...Array.from({length:25},(_,i)=>blank(Math.max(0,...x.map(y=>y.id))+i+1))]);
 const save=()=>{const all=rowsRef.current;for(const [i,r] of all.entries()){const isUsed=Boolean(r.account?.trim()||r.notes?.trim()||Number(r.debit)||Number(r.credit));if(!isUsed)continue;if(!names[r.account?.trim()]){setMessage(`Line ${i+1}: demo account code is not recognized.`);return}if(!Number.isFinite(Number(r.debit)||0)||!Number.isFinite(Number(r.credit)||0)||Number(r.debit)<0||Number(r.credit)<0){setMessage(`Line ${i+1}: invalid amount.`);return}if((Number(r.debit)>0)===(Number(r.credit)>0)){setMessage(`Line ${i+1}: enter exactly one debit or one credit.`);return}}
 const active=all.filter(r=>r.account?.trim()||r.notes?.trim()||Number(r.debit)||Number(r.credit));if(!active.length){setMessage('Enter at least one journal line before saving.');return}if(Math.abs(totals.debit-totals.credit)>.005){setMessage('Debits and credits must balance before saving.');return}
 try{window.localStorage.setItem(DRAFT_KEY,JSON.stringify(all));setMessage('Draft saved in this browser only — NOT posted or saved to Supabase.')}catch{setMessage('Could not save locally: browser storage is unavailable.')}
 };
 return <><div className="heading-line"><div><div className="eyebrow">ACCOUNTING / GENERAL JOURNAL</div><h1>Journal Entries</h1><p className="muted">Create a balanced journal using the seven-column worksheet.</p></div><span className="pill">LOCAL-ONLY PROTOTYPE</span></div>
 <div className="warning"><strong>Safe migration mode.</strong> Save Draft stores a local browser copy only. It does not submit, approve, or post to your existing accounting database.</div>
 <div className="panel journal"><div className="table-header"><div><strong>New journal worksheet</strong><p>25 editable lines · Click a cell to type, then Tab to move. Enter demo account codes 10100, 10200, 20100, or 40100.</p></div><span className="environment">{hydrated?'LOCAL DRAFT READY':'LOADING'}</span></div>
 <div className="grid-wrap"><AgGridReact<Line> theme={gridTheme} rowData={rows} columnDefs={cols} getRowId={p=>String(p.data.id)} defaultColDef={{editable:true,resizable:true,sortable:false}} rowHeight={38} headerHeight={42} singleClickEdit={true} stopEditingWhenCellsLoseFocus={true} onCellValueChanged={onCellValueChanged} /></div>
 <div className="totals"><span>Debit Total <strong>{currency(totals.debit)}</strong></span><span>Credit Total <strong>{currency(totals.credit)}</strong></span><span className={Math.abs(totals.debit-totals.credit)<.005?'balanced':'unbalanced'}>Difference <strong>{currency(totals.debit-totals.credit)}</strong></span></div>
 <div className="journal-actions"><button className="btn" onClick={add}><CirclePlus size={17}/> Add 25 Rows</button><button className="btn danger" onClick={()=>{if(window.confirm('Clear the entire unsaved local worksheet?')){window.localStorage.removeItem(DRAFT_KEY);setRows(initial());setMessage('Worksheet cleared.')}}}><Trash2 size={16}/> Clear Worksheet</button><span className="grow"/><button className="btn primary" onClick={save}><Save size={16}/> Save Draft</button></div>
 {message&&<p className="feedback" role="status">{message}</p>}
 </div></>}
