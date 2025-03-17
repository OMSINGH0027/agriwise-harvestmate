
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for our agricultural app
				nature: {
					50: '#f2f9f1',
					100: '#e3f3e0',
					200: '#c7e7c2',
					300: '#9dd696',
					400: '#6abe63',
					500: '#44a03d',
					600: '#32802e',
					700: '#286627',
					800: '#235222',
					900: '#1e441e',
				},
				soil: {
					50: '#f9f6f3',
					100: '#f0e8e0',
					200: '#e2d0bd',
					300: '#d0b292',
					400: '#bc9066',
					500: '#a97e4c',
					600: '#96663b',
					700: '#7d5333',
					800: '#68452f',
					900: '#553a2a',
				},
				sky: {
					50: '#f1f9fe',
					100: '#e3f2fd',
					200: '#bae2fb',
					300: '#7cccf8',
					400: '#39b1f1',
					500: '#1194de',
					600: '#0a75bc',
					700: '#0f5e98',
					800: '#154f7d',
					900: '#164367',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					from: {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-out': {
					from: {
						opacity: '1',
						transform: 'translateY(0)'
					},
					to: {
						opacity: '0',
						transform: 'translateY(10px)'
					}
				},
				'slide-from-left': {
					from: {
						transform: 'translateX(-100%)'
					},
					to: {
						transform: 'translateX(0)'
					}
				},
				'slide-to-left': {
					from: {
						transform: 'translateX(0)'
					},
					to: {
						transform: 'translateX(-100%)'
					}
				},
				'slide-from-right': {
					from: {
						transform: 'translateX(100%)'
					},
					to: {
						transform: 'translateX(0)'
					}
				},
				'slide-to-right': {
					from: {
						transform: 'translateX(0)'
					},
					to: {
						transform: 'translateX(100%)'
					}
				},
				pulse: {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.5'
					}
				},
				float: {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'slide-from-left': 'slide-from-left 0.3s ease-out',
				'slide-to-left': 'slide-to-left 0.3s ease-out',
				'slide-from-right': 'slide-from-right 0.3s ease-out',
				'slide-to-right': 'slide-to-right 0.3s ease-out',
				'pulse-slow': 'pulse 3s infinite',
				'float': 'float 6s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
