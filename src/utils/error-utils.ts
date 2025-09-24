import { Request, Response, NextFunction } from 'express';

// Utility to extract a meaningful message from various error types
export function getErrorMessage(error: unknown): string {
	// Check if the error is an instance of the built-in Error class
	if (error instanceof Error) {
		return error.message;
	}

	// Check if the error has a toString method
	if (
		error &&
		typeof error === 'object' &&
		'toString' in error &&
		typeof error.toString === 'function'
	) {
		return error.toString();
	}

	// Check if the error is an object with a message property
	if (error && typeof error === 'object' && 'message' in error) {
		// @ts-ignore
		return error.message;
	}

	// If the error is a string, return it directly
	if (typeof error === 'string') {
		return error;
	}

	return 'Unknown error';
}

// Utility to wrap async route handlers and pass errors to the error handling middleware
export const asyncHandler =
	<T extends (req: Request, res: Response, next: NextFunction) => Promise<any>>(
		fn: T
	) =>
	(req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
