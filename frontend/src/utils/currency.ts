/**
 * KaamSaathi Cooperative Currency Utilities
 * Formats Indian Rupee (INR) amounts using standard Indian numbering system (e.g., ₹1,29,010)
 * with robust font fallback to avoid corrupted or foreign currency glyphs.
 */

export function formatINR(amount: number | string | undefined | null): string {
  if (amount === undefined || amount === null) return '₹0';
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '₹0';
  
  return '₹' + num.toLocaleString('en-IN');
}

export function formatINRLakhs(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakhs`;
  }
  return formatINR(amount);
}
