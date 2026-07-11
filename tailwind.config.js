/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ibm: {
          blue:       '#0f62fe',
          'blue-70':  '#0043ce',
          'blue-50':  '#4589ff',
          'blue-10':  '#edf5ff',
          'blue-20':  '#d0e2ff',
          gray:       '#f4f4f4',
          'gray-10':  '#f4f4f4',
          'gray-20':  '#e0e0e0',
          'gray-30':  '#c6c6c6',
          'gray-50':  '#8d8d8d',
          'gray-70':  '#525252',
          'gray-90':  '#262626',
          'gray-100': '#161616',
          teal:       '#009d9a',
          purple:     '#8a3ffc',
          green:      '#198038',
          'green-10': '#defbe6',
          yellow:     '#f1c21b',
          'yellow-10':'#fcf4d6',
          red:        '#da1e28',
          'red-10':   '#fff1f1',
        },
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        panel: '0 2px 8px 0 rgba(0,0,0,0.08)',
      },
      borderRadius: {
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
      },
    },
  },
  plugins: [],
}
