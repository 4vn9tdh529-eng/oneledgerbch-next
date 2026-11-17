/** DEMO-ONLY fixtures. Never use to represent live financial or security data. */
export const accounts = [
  { code: '10100', name: 'Cash and Cash Equivalents', debit: 45000, credit: 0 },
  { code: '10200', name: 'Accounts Receivable', debit: 12800, credit: 0 },
  { code: '20100', name: 'Accounts Payable', debit: 0, credit: 12800 },
  { code: '40100', name: 'Product Sales Revenue', debit: 0, credit: 45000 },
];
export const lines = [
  { record: 1001, account: '10100', date: '2026-11-12', entity: '509004', batch: '1042', kind: 'Manual', debit: 5000, credit: 0, notes: 'Customer payment' },
  { record: 1002, account: '10100', date: '2026-11-14', entity: '509004', batch: '1043', kind: 'Import', debit: 40000, credit: 0, notes: 'Monthly receipts' },
  { record: 1003, account: '40100', date: '2026-11-12', entity: '509004', batch: '1042', kind: 'Manual', debit: 0, credit: 5000, notes: 'Customer payment' },
  { record: 1004, account: '40100', date: '2026-11-14', entity: '509004', batch: '1043', kind: 'Import', debit: 0, credit: 40000, notes: 'Monthly receipts' },
  { record: 1005, account: '10200', date: '2026-11-08', entity: '509004', batch: '1041', kind: 'Manual', debit: 12800, credit: 0, notes: 'Invoice issued' },
  { record: 1006, account: '20100', date: '2026-11-08', entity: '509004', batch: '1041', kind: 'Manual', debit: 0, credit: 12800, notes: 'Supplier payable' },
];
export const money = (v: number) => v === 0 ? '—' : v.toLocaleString('en-US',{style:'currency',currency:'USD'});
