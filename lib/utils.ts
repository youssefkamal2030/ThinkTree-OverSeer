// Payment calculation utilities
export function calculateBasePayment(level: number): number {
  return 220 * level + 680;
}

// Calculate next payment date (Sunday or Thursday after last session)
export function calculatePaymentDate(lastSessionDate: Date): Date {
  const dayOfWeek = lastSessionDate.getDay();
  const paymentDate = new Date(lastSessionDate);
  
  // If last session is Sunday (0) or Monday-Wednesday (1-3), next payment is Thursday
  // If last session is Thursday-Saturday (4-6), next payment is Sunday
  
  if (dayOfWeek >= 0 && dayOfWeek <= 3) {
    // Next Thursday
    const daysToAdd = 4 - dayOfWeek;
    paymentDate.setDate(lastSessionDate.getDate() + daysToAdd);
  } else {
    // Next Sunday
    const daysToAdd = 7 - dayOfWeek;
    paymentDate.setDate(lastSessionDate.getDate() + daysToAdd);
  }
  
  return paymentDate;
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Format date
export function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(timestamp));
}

// Check if payment is overdue
export function isPaymentOverdue(expectedDate: number): boolean {
  return Date.now() > expectedDate;
}
