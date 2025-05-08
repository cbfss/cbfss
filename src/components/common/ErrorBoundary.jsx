import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Error Boundary component to catch JavaScript errors anywhere in child component tree.
 * Logs errors and displays a fallback UI.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });

    // You could also log to monitoring service here
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Something went wrong</h2>
          <p className="text-red-600 dark:text-red-300 mb-4">
            The application encountered an error. Please try again or contact support if the problem persists.
          </p>
          {import.meta.env.DEV && this.state.error && (
            <details className="mt-2 text-sm">
              <summary className="text-red-700 dark:text-red-300 cursor-pointer">
                Error details (only visible in development)
              </summary>
              <pre className="mt-2 p-3 bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 rounded overflow-auto text-xs">
                {this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};

export default ErrorBoundary;