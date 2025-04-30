export const theme = {
  colors: {
    // Primary brand colors
    primary: {
      50: '#eef2ff',
      100: '#e0e7ff',
      500: '#4F46E5', // Main brand color - indigo
      600: '#4338ca',
      700: '#3730a3',
    },
    // Semantic colors for different metrics
    metrics: {
      office: '#4F46E5',    // Indigo - Professional
      calories: '#EF4444',  // Red - Energy
      protein: '#10B981',   // Green - Health
    },
    // UI colors
    ui: {
      background: '#ffffff',
      card: '#ffffff',
      border: '#e5e7eb',
      text: {
        primary: '#111827',
        secondary: '#6b7280',
        light: '#9ca3af',
      }
    },
    // Status colors
    status: {
      success: '#10B981',
      error: '#EF4444',
      warning: '#F59E0B',
      info: '#3B82F6',
    }
  },
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
  },
  borderRadius: {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    full: '9999px',
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  }
};
