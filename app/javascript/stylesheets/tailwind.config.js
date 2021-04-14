const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ['GT Walsheim', 'GT Walsheim Condensed', 'Helvetica', 'sans-serif'],
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      primary: {
        bg: '#fff4df',
        light: '#ffd6c3',
        DEFAULT: '#ff660a',
        dark: '#b95011',
      },
      secondary: {
        bg: '#fbf8f5',
        light: '#FEF3C7',
        DEFAULT: '#FBBF24',
        dark: '#7d675a',
      },
      success: {
        bg: '#ECFDF5',
        light: '#A7F3D0',
        DEFAULT: '#34D399',
        dark: '#065F46',
      },
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      red: colors.red,
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'input': {
            padding: theme('spacing.2'),
            paddingLeft: theme('spacing.4'),
            paddingRight: theme('spacing.4'),
            borderRadius: '10px',
            background: theme('colors.secondary.bg'),
            marginBottom: theme('spacing.2'),
            width: '100%',
            textDecoration: 'none',
          },
        'input:focus, input:active': {
          outline: 'none',
        },
        'input[type="text"]:active, input[type="text"]:focus': {
            outline: 'none',
            boxShadow: `0px 0px 0px 2px ${theme('colors.secondary.DEFAULT')}`,
          },
        "button, [type='button'], [type='reset'], [type='submit']": {
            background: theme('colors.primary.DEFAULT'),
            color: 'white',
            fontWeight: '500',
            borderRadius: '10px',
            padding: theme('spacing.2'),
            paddingLeft: theme('spacing.4'),
            paddingRight: theme('spacing.4')
          },
        "button:hover, [type='button']:hover, [type='reset']:hover, [type='submit']:hover, button:focus, [type='button']:focus, [type='reset']:focus, [type='submit']:focus, button:active, [type='button']:active, [type='reset']:active, [type='submit']:active": {
            background: theme('colors.primary.dark'),
            boxShadow: `none`,
            outline: 'none',
          }
      })
    })
  ],
}
