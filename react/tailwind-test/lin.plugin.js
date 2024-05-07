const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addUtilities }) {
    addUtilities({
        '.lin': {
            background: 'blue',
            color: 'yellow'
        },
        '.alin': {
            'font-size': '70px'
        }
    })
})