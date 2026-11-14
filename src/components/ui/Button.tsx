/**
 * @file components/ui/Button.tsx
 * @description Multi-variant button component for GEO Wind Turbine.
 *
 * VARIANTS
 * ─────────
 *  primary   — Deep Olive fill, white label (highest emphasis)
 *  accent    — Citrus Yellow fill with soft glow (key action)
 *  secondary — Olive border (medium emphasis)
 *  ghost     — Text-only
 *  glass     — Frosted glass for dark backgrounds (hero / deep sections)
 *
 * SIZES: sm | md (default) | lg
 */

"use client";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "accent" | "secondary" | "ghost" | "glass";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	children: React.ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
	primary: [
		"bg-[var(--color-primary)] text-[var(--color-text-on-primary)]",
		"hover:bg-[var(--color-primary-dark)]",
		"active:bg-[var(--color-primary-dark)]",
		"shadow-[var(--shadow-btn)]",
	].join(" "),

	accent: [
		"bg-[var(--color-accent)] text-[var(--color-accent-fg)]",
		"hover:bg-[var(--color-accent-dark)]",
		"active:bg-[var(--color-accent-dark)]",
		"shadow-[0_4px_20px_-4px_rgba(232,239,131,0.45)]",
		"hover:shadow-[0_6px_28px_-4px_rgba(232,239,131,0.6)]",
	].join(" "),

	secondary: [
		"border-2 border-[var(--color-primary)] text-[var(--color-primary)]",
		"hover:bg-[var(--color-primary)] hover:text-[var(--color-text-on-primary)]",
		"active:bg-[var(--color-primary-dark)] active:border-[var(--color-primary-dark)]",
		"active:text-[var(--color-text-on-primary)]",
	].join(" "),

	ghost: [
		"text-[var(--color-primary)]",
		"hover:text-[var(--color-primary-dark)] hover:underline underline-offset-4",
		"active:text-[var(--color-primary-dark)]",
	].join(" "),

	// New: for dark backgrounds (hero, deep sections)
	glass: [
		"border border-white/30 bg-white/10 text-white backdrop-blur-md",
		"hover:border-white/50 hover:bg-white/18",
		"active:bg-white/15",
	].join(" "),
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
	sm: "px-4 py-2 text-xs",
	md: "px-6 py-3 text-sm",
	lg: "px-8 py-3.5 text-sm",
};

export function Button({
	variant = "primary",
	size = "md",
	className,
	children,
	disabled,
	...rest
}: ButtonProps) {
	return (
		<button
			{...rest}
			disabled={disabled}
			className={cn(
				"inline-flex items-center justify-center gap-2",
				"rounded-full font-semibold tracking-wide",
				"transition-all duration-300",
				"focus-visible:outline-none focus-visible:ring-2",
				"focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2",
				"disabled:pointer-events-none disabled:opacity-40",
				"hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
				VARIANT_CLASSES[variant],
				SIZE_CLASSES[size],
				className,
			)}
		>
			{children}
		</button>
	);
}
