export function getUserInitials(fullName?: string | null): string {
  if (!fullName || typeof fullName !== 'string') {
    return '';
  }

  return fullName
    .trim()
    .split(' ')
    .filter(name => name.length > 0) // Remove empty strings
    .map((name: string) => name[0]?.toUpperCase())
    .join('');
}
