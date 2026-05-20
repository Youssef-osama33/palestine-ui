/**
 * palestine-ui — SVG Icon Definitions
 *
 * Each icon is a pure SVG path/shapes string.
 * Rendered at 24x24 viewBox.
 */

export interface IconDef {
  name: string;
  nameAr: string;
  viewBox: string;
  paths: string;
}

export const ICONS: Record<string, IconDef> = {

  olive: {
    name: 'Olive Branch',
    nameAr: 'غصن زيتون',
    viewBox: '0 0 24 24',
    paths: `
      <path d="M12 21 C12 21 7 16 7 11 C7 7.5 9.5 5.5 12 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <path d="M12 21 C12 21 17 16 17 11 C17 7.5 14.5 5.5 12 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <ellipse cx="8.5" cy="9" rx="2.2" ry="1.4" fill="currentColor" transform="rotate(-30 8.5 9)" opacity="0.9"/>
      <ellipse cx="15.5" cy="9" rx="2.2" ry="1.4" fill="currentColor" transform="rotate(30 15.5 9)" opacity="0.9"/>
      <ellipse cx="9" cy="13.5" rx="2" ry="1.3" fill="currentColor" transform="rotate(-20 9 13.5)" opacity="0.7"/>
      <ellipse cx="15" cy="13.5" rx="2" ry="1.3" fill="currentColor" transform="rotate(20 15 13.5)" opacity="0.7"/>
      <circle cx="12" cy="5.5" r="1.2" fill="currentColor" opacity="0.6"/>
    `,
  },

  key: {
    name: 'Key of Return',
    nameAr: 'مفتاح العودة',
    viewBox: '0 0 24 24',
    paths: `
      <circle cx="9" cy="10" r="4.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <circle cx="9" cy="10" r="1.8" fill="currentColor"/>
      <line x1="13.5" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="18.5" y1="10" x2="18.5" y2="13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="21" y1="10" x2="21" y2="13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    `,
  },

  dome: {
    name: 'Dome of the Rock',
    nameAr: 'قبة الصخرة',
    viewBox: '0 0 24 24',
    paths: `
      <line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="10.8" y1="3" x2="13.2" y2="3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M12 4.5 C12 4.5 8.5 8 8.5 10.5 L15.5 10.5 C15.5 8 12 4.5 12 4.5Z" fill="currentColor" opacity="0.8"/>
      <rect x="7" y="10.5" width="10" height="3.5" rx="0.5" fill="currentColor" opacity="0.7"/>
      <rect x="5" y="14" width="14" height="5" rx="0.5" fill="currentColor" opacity="0.6"/>
      <line x1="9" y1="11" x2="9" y2="14" stroke="white" stroke-width="0.6" opacity="0.5"/>
      <line x1="12" y1="11" x2="12" y2="14" stroke="white" stroke-width="0.6" opacity="0.5"/>
      <line x1="15" y1="11" x2="15" y2="14" stroke="white" stroke-width="0.6" opacity="0.5"/>
    `,
  },

  map: {
    name: 'Map of Palestine',
    nameAr: 'خريطة فلسطين',
    viewBox: '0 0 24 24',
    paths: `
      <path d="M11.5 3.5 C9.5 3.5 7.5 5.5 7.5 7.5 C7.5 8.5 8.5 9.5 8.5 10.5 C8.5 11.5 7.5 12.5 7.5 13.5 C7.5 15.5 8.5 16.5 9.5 17.5 C9.5 18.5 9.5 19.5 10.5 20.5 C11.5 21.5 12.5 20.5 12.5 19.5 C13.5 18.5 14.5 17.5 15.5 16.5 C16.5 15.5 16.5 14.5 16.5 13.5 C16.5 12.5 15.5 11.5 15.5 10.5 C16.5 9.5 17.5 8.5 17.5 7.5 C17.5 5.5 15.5 3.5 13.5 3.5 C12.5 3.5 11.5 3.5 11.5 3.5Z" fill="currentColor" opacity="0.85"/>
      <circle cx="12" cy="12" r="1.3" fill="white" opacity="0.9"/>
    `,
  },

  watermelon: {
    name: 'Watermelon',
    nameAr: 'بطيخة',
    viewBox: '0 0 24 24',
    paths: `
      <path d="M5 17 C5 13 8.5 6.5 12 5.5 C15.5 6.5 19 13 19 17Z" fill="currentColor" opacity="0.3"/>
      <path d="M6.5 17 C6.5 13.5 9.5 8 12 7 C14.5 8 17.5 13.5 17.5 17Z" fill="currentColor" opacity="0.85"/>
      <line x1="5" y1="17" x2="19" y2="17" stroke="currentColor" stroke-width="1.2"/>
      <circle cx="10" cy="13.5" r="0.7" fill="white"/>
      <circle cx="12" cy="11.5" r="0.7" fill="white"/>
      <circle cx="14" cy="13.5" r="0.7" fill="white"/>
    `,
  },

  flag: {
    name: 'Palestinian Flag',
    nameAr: 'العلم الفلسطيني',
    viewBox: '0 0 24 24',
    paths: `
      <line x1="4" y1="3" x2="4" y2="21" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
      <rect x="4" y="5" width="16" height="4.3" fill="currentColor" opacity="0.9"/>
      <rect x="4" y="9.3" width="16" height="4.3" fill="currentColor" opacity="0.4"/>
      <rect x="4" y="13.7" width="16" height="4.3" fill="currentColor" opacity="0.7"/>
      <path d="M4 5 L9.5 12 L4 19Z" fill="currentColor"/>
    `,
  },

  wheat: {
    name: 'Wheat',
    nameAr: 'قمح',
    viewBox: '0 0 24 24',
    paths: `
      <line x1="12" y1="21" x2="12" y2="7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
      <ellipse cx="12" cy="7" rx="1.8" ry="2.8" fill="currentColor" opacity="0.9"/>
      <ellipse cx="9.5" cy="10" rx="1.8" ry="2.2" fill="currentColor" transform="rotate(-35 9.5 10)" opacity="0.85"/>
      <ellipse cx="14.5" cy="10" rx="1.8" ry="2.2" fill="currentColor" transform="rotate(35 14.5 10)" opacity="0.85"/>
      <ellipse cx="9.5" cy="14" rx="1.6" ry="2" fill="currentColor" transform="rotate(-25 9.5 14)" opacity="0.7"/>
      <ellipse cx="14.5" cy="14" rx="1.6" ry="2" fill="currentColor" transform="rotate(25 14.5 14)" opacity="0.7"/>
    `,
  },

  crescent: {
    name: 'Crescent and Star',
    nameAr: 'هلال ونجمة',
    viewBox: '0 0 24 24',
    paths: `
      <path d="M12 4 C8 4 5 7 5 11 C5 15 8 18 12 18 C10 18 8 16 8 13 C8 10 10 8 13 8 C14 8 15 8.5 15.5 9 C15 6 13.5 4 12 4Z" fill="currentColor"/>
      <path d="M17.5 7.5 L18.2 9.8 L20.5 9.8 L18.7 11.1 L19.4 13.4 L17.5 12.1 L15.6 13.4 L16.3 11.1 L14.5 9.8 L16.8 9.8 Z" fill="currentColor"/>
    `,
  },

  hand: {
    name: 'Open Hand / Solidarity',
    nameAr: 'يد التضامن',
    viewBox: '0 0 24 24',
    paths: `
      <path d="M8 13 L8 7 C8 6.4 8.4 6 9 6 C9.6 6 10 6.4 10 7 L10 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none"/>
      <path d="M10 11 L10 6 C10 5.4 10.4 5 11 5 C11.6 5 12 5.4 12 6 L12 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none"/>
      <path d="M12 11 L12 6.5 C12 5.9 12.4 5.5 13 5.5 C13.6 5.5 14 5.9 14 6.5 L14 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none"/>
      <path d="M14 11 L14 8 C14 7.4 14.4 7 15 7 C15.6 7 16 7.4 16 8 L16 14 C16 17.3 13.3 20 10 20 C7.8 20 6 18.2 6 16 L6 13 C6 12.4 6.4 12 7 12 C7.6 12 8 12.4 8 13" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none"/>
    `,
  },

  sun: {
    name: 'Sun / Hope',
    nameAr: 'شمس الأمل',
    viewBox: '0 0 24 24',
    paths: `
      <circle cx="12" cy="12" r="4" fill="currentColor"/>
      <line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="2" y1="12" x2="5" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="4.9" y1="4.9" x2="7.1" y2="7.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="16.9" y1="16.9" x2="19.1" y2="19.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="19.1" y1="4.9" x2="16.9" y2="7.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="7.1" y1="16.9" x2="4.9" y2="19.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    `,
  },

  bird: {
    name: 'Free Bird / Freedom',
    nameAr: 'طائر الحرية',
    viewBox: '0 0 24 24',
    paths: `
      <path d="M2 8 C4 6 7 7 8 9 C9 7 12 5 15 6 C12 7 11 9 12 11 C10 10 8 10 7 11 C6 9 4 8 2 8Z" fill="currentColor"/>
      <path d="M12 11 C14 12 16 14 14 17 C13 15 11 14 12 11Z" fill="currentColor" opacity="0.6"/>
      <path d="M14 17 C15 19 17 20 19 19 C17 18 16 17 14 17Z" fill="currentColor" opacity="0.5"/>
    `,
  },

  mosque: {
    name: 'Mosque',
    nameAr: 'مسجد',
    viewBox: '0 0 24 24',
    paths: `
      <line x1="12" y1="2" x2="12" y2="4.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
      <line x1="10.8" y1="3.2" x2="13.2" y2="3.2" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
      <path d="M9 4.5 C9 4.5 7 7 7 9.5 L17 9.5 C17 7 15 4.5 15 4.5 C14 6 12 6.5 12 6.5 C12 6.5 10 6 9 4.5Z" fill="currentColor" opacity="0.75"/>
      <rect x="6" y="9.5" width="12" height="3" rx="0.5" fill="currentColor" opacity="0.65"/>
      <rect x="4" y="12.5" width="16" height="6" rx="0.5" fill="currentColor" opacity="0.55"/>
      <rect x="10" y="14.5" width="4" height="4" rx="0.5" fill="currentColor"/>
      <rect x="3" y="12.5" width="2" height="6" rx="1" fill="currentColor" opacity="0.5"/>
      <rect x="19" y="12.5" width="2" height="6" rx="1" fill="currentColor" opacity="0.5"/>
    `,
  },

} as const;

export type IconName = keyof typeof ICONS;

export const iconNames = Object.keys(ICONS) as IconName[];
