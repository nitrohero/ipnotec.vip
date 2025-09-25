'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassCardProps {
    children: ReactNode
    className?: string
    hover?: boolean
    onClick?: () => void
}

export function GlassCard({ children, className, hover = true, onClick }: GlassCardProps) {
    return (
        <motion.div
            className={cn(
                'glass',
                hover && 'glass-hover cursor-pointer',
                className
            )}
            onClick={onClick}
            whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
            whileTap={hover ? { scale: 0.98 } : undefined}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            {children}
        </motion.div>
    )
}

interface GlassButtonProps {
    children: ReactNode
    className?: string
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    onClick?: () => void
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
}

export function GlassButton({
    children,
    className,
    variant = 'primary',
    size = 'md',
    onClick,
    disabled = false,
    type = 'button'
}: GlassButtonProps) {
    const variants = {
        primary: 'bg-gradient-primary text-black font-semibold',
        secondary: 'glass-button text-white',
        ghost: 'bg-transparent border-transparent text-white hover:bg-white/5'
    }

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    }

    return (
        <motion.button
            type={type}
            className={cn(
                'rounded-xl transition-all duration-300 border',
                variants[variant],
                sizes[size],
                disabled && 'opacity-50 cursor-not-allowed',
                className
            )}
            onClick={onClick}
            disabled={disabled}
            whileHover={!disabled ? { scale: 1.05, y: -1 } : undefined}
            whileTap={!disabled ? { scale: 0.95 } : undefined}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            {children}
        </motion.button>
    )
}

interface GlassInputProps {
    placeholder?: string
    value?: string
    onChange?: (value: string) => void
    type?: 'text' | 'email' | 'password'
    error?: string
    label?: string
    className?: string
}

export function GlassInput({
    placeholder,
    value,
    onChange,
    type = 'text',
    error,
    label,
    className
}: GlassInputProps) {
    return (
        <div className={cn('space-y-2', className)}>
            {label && (
                <label className="text-sm font-medium text-white/80">
                    {label}
                </label>
            )}
            <motion.div
                className="relative"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    className={cn(
                        'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10',
                        'backdrop-blur-xl text-white placeholder-white/50',
                        'focus:border-green-400 focus:ring-2 focus:ring-green-400/20',
                        'transition-all duration-300',
                        error && 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                    )}
                />
            </motion.div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-400"
                >
                    {error}
                </motion.p>
            )}
        </div>
    )
}

interface NeonTextProps {
    children: ReactNode
    color?: 'green' | 'blue' | 'purple' | 'pink'
    className?: string
}

export function NeonText({ children, color = 'green', className }: NeonTextProps) {
    const colors = {
        green: 'text-green-400',
        blue: 'text-blue-400',
        purple: 'text-purple-400',
        pink: 'text-pink-400'
    }

    return (
        <span className={cn('neon-text', colors[color], className)}>
            {children}
        </span>
    )
}