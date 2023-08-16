import { logErrorToApi } from "./utils/logErrorToApi";
import React, { Component } from 'react';


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.log("Trying to run function to send error")
    logErrorToApi(error.toString());
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="text-center p-8">
          <img src="/path-to-error-image.svg" alt="Error Illustration" className="mx-auto w-48 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h1>
          <p className="mb-4">We're sorry for the inconvenience.</p>
          <button 
              onClick={handleRetry} 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
              Retry
          </button>
          <p className="mt-4">If the problem persists, please <a href="mailto:support@yourapp.com" className="text-blue-500 hover:underline">contact our support</a>.</p>
        </div>
      );
      
    }

    return this.props.children; 
  }
}

export default ErrorBoundary