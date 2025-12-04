import { cn } from "../lib/utils"

interface FormErrorProps {
	/**
	 * The error message(s) to display - can be string or string array
	 */
	errors?: string | string[]
	/**
	 * Additional class names
	 * @default "text-sm text-red-500"
	 */
	className?: string
}

/**
 * Displays form validation errors in the same style as your existing implementation
 * with added accessibility and type safety.
 */
export function FormError({ errors, className }: FormErrorProps) {
	if (!errors) return null

	const errorArray = Array.isArray(errors) ? errors : [errors]

	if (errorArray.length === 0) return null

	return (
		<div className={cn("text-destructive text-sm", className)} role="alert">
			{errorArray.map((error, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: list rarely changes
				<li key={index}>{error}</li>
			))}
		</div>
	)
}
