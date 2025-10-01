/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
    	extend: {
    		colors: {
    			primary: {
    				'50': '#f0f9ff',
    				'100': '#e0f2fe',
    				'200': '#bae6fd',
    				'300': '#7dd3fc',
    				'400': '#38bdf8',
    				'500': '#0ea5e9',
    				'600': '#0284c7',
    				'700': '#0369a1',
    				'800': '#075985',
    				'900': '#0c4a6e',
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				'50': '#fafafa',
    				'100': '#f4f4f5',
    				'200': '#e4e4e7',
    				'300': '#d4d4d8',
    				'400': '#a1a1aa',
    				'500': '#71717a',
    				'600': '#52525b',
    				'700': '#3f3f46',
    				'800': '#27272a',
    				'900': '#18181b',
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			accent: {
    				green: '#00ff88',
    				blue: '#00d4ff',
    				purple: '#8b5cf6',
    				pink: '#ff0080',
    				yellow: '#ffff00',
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		fontFamily: {
    			heading: [
    				'Doto',
    				'Orbitron',
    				'system-ui',
    				'sans-serif'
    			],
    			body: [
    				'var(--font-body)',
    				'system-ui',
    				'sans-serif'
    			],
    			sans: [
    				'var(--font-body)',
    				'system-ui',
    				'sans-serif'
    			]
    		},
    		animation: {
    			float: 'float 6s ease-in-out infinite',
    			glow: 'glow 2s ease-in-out infinite alternate',
    			gradient: 'gradient 15s ease infinite',
    			particles: 'particles 20s linear infinite'
    		},
    		keyframes: {
    			float: {
    				'0%, 100%': {
    					transform: 'translateY(0px)'
    				},
    				'50%': {
    					transform: 'translateY(-20px)'
    				}
    			},
    			glow: {
    				'0%': {
    					boxShadow: '0 0 5px rgba(0, 255, 136, 0.5)'
    				},
    				'100%': {
    					boxShadow: '0 0 20px rgba(0, 255, 136, 0.8)'
    				}
    			},
    			gradient: {
    				'0%, 100%': {
    					backgroundPosition: '0% 50%'
    				},
    				'50%': {
    					backgroundPosition: '100% 50%'
    				}
    			},
    			particles: {
    				'0%': {
    					transform: 'translateY(100vh) rotate(0deg)'
    				},
    				'100%': {
    					transform: 'translateY(-100vh) rotate(360deg)'
    				}
    			}
    		},
    		backdropBlur: {
    			xs: '2px'
    		},
    		backgroundImage: {
    			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    			'gradient-primary': 'linear-gradient(135deg, #00ff88, #00d4ff)',
    			'gradient-secondary': 'linear-gradient(135deg, #8b5cf6, #ff0080)'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
    plugins: [require("tailwindcss-animate")],
}