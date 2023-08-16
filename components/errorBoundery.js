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
    logErrorToApi({
      message: error.message,
      stack: error.stack
  });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="text-center p-8">
          <img src="/path-to-error-image.svg" alt="Error Illustration" className="mx-auto w-48 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h1>
          <p className="mb-4">We are sorry for the inconvenience.</p>
          
          <p className="mt-4">If the problem persists, please <a href="mailto:pernilla@spprod.se" className="text-blue-500 hover:underline">contact our support</a>.</p>
        </div>
      );
      
    }

    return this.props.children; 
  }
}

export default ErrorBoundary