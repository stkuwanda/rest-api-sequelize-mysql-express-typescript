import { Request, Response, NextFunction } from 'express'; // Import express to ensure types are available
import { ConnectionError, DatabaseError, ValidationError } from 'sequelize';
import { getErrorMessage } from '../utils/error-utils';

// Centralized error handling middleware
export default function errorHandler(
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction
): void {
	console.error('Error handler triggered:\n', err);

	// If headers are already sent, delegate to the default Express error handler
	if (res.headersSent) {
		return next(err); // Call next with the error to ensure any further error handling middleware is invoked
	}

	// Handle validation errors from Sequelize
	if (err instanceof ValidationError) {
		res.status(422).json({
			error: {
				message: err.message,
				details: err.errors.map((e) => ({
					message: e.message,
					path: e.path,
					value: e.value,
				})),
			},
		});
		return next(err); // Call next with the error to ensure any further error handling middleware is invoked
	}

	// Handle database connection errors
	if (err instanceof ConnectionError) {
		res.status(503).json({
			error: {
				message: 'Database connection error. Please try again later.',
				details: { message: err.message },
			},
		});

		return next(err); // Call next with the error to ensure any further error handling middleware is invoked
	}

	// Handle other database-related errors
	// such as constraint violations, etc.
	if (err instanceof DatabaseError) {
		res.status(500).json({
			error: {
				message: 'A database error occurred.',
				details: { message: err.message },
			},
		});
		
		return next(err); // Call next with the error to ensure any further error handling middleware is invoked
	}

	// For other types of errors, return a generic 500 Internal Server Error
	const message = getErrorMessage(err);
	res.status(500).json({ error: { message } });

	next(err); // Call next with the error to ensure any further error handling middleware is invoked
}
