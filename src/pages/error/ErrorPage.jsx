import React, { useState, useEffect, useRef } from 'react';
import { Home, RefreshCw, MessageCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { useRouteError, useNavigate, useLocation } from 'react-router-dom';

const ErrorPage = () => {
  // Get error information from React Router
  const error = useRouteError();
  const navigate = useNavigate();
  const location = useLocation();

  // State for animations and UI
  const [count, setCount] = useState(0);
  const [pulseEffect, setPulseEffect] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Page Not Found');
  const [errorCode, setErrorCode] = useState(405);
  const [errorDetails, setErrorDetails] = useState('');
  const [codeVisible, setCodeVisible] = useState(false);
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);

  // Process the error to get relevant details
  useEffect(() => {
    // Determine error type and set appropriate messages
    if (error) {
      // Check if it's a response error (like from fetch)
      if (error.status) {
        setErrorCode(error.status);
        switch (error.status) {
          case 401:
            setErrorMessage('Unauthorized Access');
            setErrorDetails('You do not have permission to access this resource.');
            break;
          case 403:
            setErrorMessage('Access Forbidden');
            setErrorDetails('Your account lacks the necessary permissions for this action.');
            break;
          case 404:
            setErrorMessage('Resource Not Found');
            setErrorDetails(`The requested path "${location?.pathname || error.statusText}" does not exist.`);
            break;
          case 500:
            setErrorMessage('Server Error');
            setErrorDetails('Our banking system encountered an unexpected error. Please try again later.');
            break;
          default:
            setErrorMessage(`Error ${error.status}`);
            setErrorDetails(error.statusText || 'An unexpected error occurred.');
        }
      } else if (error.message) {
        // It's a JS error
        setErrorMessage('Application Error');
        setErrorDetails(error.message);
        
        // For routing/navigation errors, typically 404
        if (error.message.includes('No route matches') || error.message.includes('not found')) {
          setErrorCode(404);
          setErrorMessage('Page Not Found');
          setErrorDetails(`The path "${location?.pathname}" does not exist in this application.`);
        }
      } else {
        // Generic error fallback
        setErrorMessage('Unknown Error');
        setErrorDetails('An unexpected error occurred while processing your request.');
      }
    } else {
      // Default to 404 if no error is provided
      setErrorMessage('Page Not Found');
      setErrorDetails(`The requested path "${location?.pathname}" could not be found.`);
    }
  }, [error, location]);

  // Counter animation with smooth easing
  useEffect(() => {
    const duration = 1500; // ms
    const fps = 60;
    const frames = duration / 1000 * fps;
    let frame = 0;
    
    const timer = setInterval(() => {
      if (frame < frames) {
        // Cubic ease-out for smooth counting
        const progress = frame / frames;
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(errorCode * easedProgress));
        frame++;
      } else {
        clearInterval(timer);
        setPulseEffect(true);
        setTimeout(() => {
          setCodeVisible(true);
        }, 600);
        
        // Periodic pulse effect
        const pulseInterval = setInterval(() => {
          setPulseEffect(true);
          setTimeout(() => setPulseEffect(false), 700);
        }, 5000);
        
        return () => clearInterval(pulseInterval);
      }
    }, 1000 / fps);

    return () => clearInterval(timer);
  }, [errorCode]);

  // Particles effect - financial data visualization style
  useEffect(() => {
    if (!containerRef.current) return;
    
    const createParticle = () => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const size = Math.random() * 4 + 1;
      
      // Financial theme colors - blues and occasional gold
      const isGold = Math.random() > 0.9;
      const color = isGold 
        ? `rgba(212, 175, 55, ${Math.random() * 0.5 + 0.3})` 
        : `rgba(0, ${Math.floor(Math.random() * 70 + 100)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.random() * 0.4 + 0.1})`;
      
      return {
        x: Math.random() * containerRect.width,
        y: containerRect.height,
        size: size,
        speedY: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 1,
        color: color,
        opacity: Math.random() * 0.6 + 0.2
      };
    };
    
    const updateParticles = () => {
      setParticles(prev => {
        // Add new particles occasionally
        if (Math.random() > 0.9) {
          return [...prev, createParticle()].slice(-20); // limit to 20 particles for clean look
        }
        
        // Update existing particles
        return prev
          .map(p => ({
            ...p,
            y: p.y - p.speedY,
            x: p.x + p.speedX,
            opacity: p.y / containerRef.current.getBoundingClientRect().height * p.opacity * 2
          }))
          .filter(p => p.y > -10);
      });
    };
    
    const particleInterval = setInterval(updateParticles, 50);
    
    return () => clearInterval(particleInterval);
  }, []);

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  const handleReload = () => {
    window.location.reload();
  };

  // Function to get error-specific help text
  const getErrorHelpText = () => {
    switch (errorCode) {
      case 401:
        return "You may need to log in again. Please try returning to the login page.";
      case 403:
        return "If you believe you should have access, please contact your system administrator.";
      case 404:
        return "This page might have been moved or deleted. Please check the URL or navigate to a different section.";
      case 500:
        return "Our systems are experiencing technical difficulties. Please try again later or contact support.";
      default:
        return "This page might be unavailable due to system maintenance or access permissions in the CBFSS platform.";
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-white to-primary-900 relative overflow-hidden flex flex-col items-center justify-center px-4 py-8"
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-10"></div>
      
      {/* Company logo */}
      <div className="absolute top-6 left-6 text-primary-900 font-bold text-xl flex items-center">
        <span className="mr-1 text-primary-700">Incede</span>
        <span className="text-sm bg-primary-700 text-white px-1.5 py-0.5 rounded">CBFSS</span>
      </div>
      
      {/* Floating particles - representing financial data */}
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity
          }}
        />
      ))}
      
      <div className="text-center relative z-10 max-w-lg">
        <div className={`relative ${pulseEffect ? 'animate-pulse-light' : ''}`}>
          <h1 className="text-[16vw] md:text-[170px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-800 via-primary-600 to-primary-900 leading-none">
            {count}
          </h1>
          
          {/* Light pulse highlight effect */}
          <div className={`absolute top-0 left-0 w-full h-full text-[16vw] md:text-[170px] opacity-0 font-bold text-primary-300 leading-none ${pulseEffect ? 'animate-pulse-highlight' : ''}`}>
            {count}
          </div>
        </div>
        
        <div className="inline-block mb-4 mt-2">
          <h2 className="text-lg md:text-xl font-semibold text-primary-800">
            {errorMessage}
          </h2>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-500 to-transparent mt-1"></div>
        </div>
        
        {/* Show detailed error message */}
        <p className="text-gray-700 mb-8">
          {errorDetails}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
          <button
            onClick={handleGoHome}
            className="inline-flex items-center px-5 py-2 bg-primary-700 text-white rounded-md hover:bg-primary-800 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Home className="mr-2" size={16} />
            Return to Dashboard
          </button>
          
          <button
            onClick={handleReload}
            className="inline-flex items-center px-5 py-2 bg-gray-100 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-200 transition-all duration-300 shadow-sm hover:shadow-md mt-3 sm:mt-0"
          >
            <RefreshCw className="mr-2" size={16} />
            Reload Page
          </button>
        </div>
        
        {/* Help tips section */}
        <div className="mt-8 text-gray-700 text-sm max-w-md mx-auto bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="font-medium text-blue-800 mb-2 flex items-center">
            <AlertTriangle size={16} className="mr-2" />
            Having trouble accessing banking data?
          </h3>
          <p className="mb-4 text-gray-600">
            {getErrorHelpText()}
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-4 text-xs">
            <a 
              href="/support" 
              className="flex items-center text-blue-700 hover:text-blue-900 transition-colors"
            >
              <MessageCircle size={14} className="mr-1" />
              Contact Support
            </a>
            <a 
              href="/help" 
              className="flex items-center text-blue-700 hover:text-blue-900 transition-colors"
            >
              <HelpCircle size={14} className="mr-1" />
              View Documentation
            </a>
          </div>
        </div>
        
        {/* Error stack trace (for development only) */}
        {process.env.NODE_ENV === 'development' && error?.stack && (
          <div className="mt-8 text-left w-full max-w-lg mx-auto bg-white p-4 rounded-lg border border-gray-300 overflow-auto max-h-64 text-xs">
            <h4 className="font-medium mb-2 text-red-600">Error Stack:</h4>
            <pre>{error.stack}</pre>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} incede Technologies Private Limited
      </div>
      
      {/* CSS for animations and effects */}
      <style jsx>{`
        .bg-grid {
          background-image: linear-gradient(rgba(0, 0, 150, 0.05) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0, 0, 150, 0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 1s steps(1) infinite;
        }
        
        @keyframes pulse-light {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        
        .animate-pulse-light {
          animation: pulse-light 0.7s ease-in-out;
        }
        
        @keyframes pulse-highlight {
          0% { opacity: 0; }
          30% { opacity: 0.3; }
          100% { opacity: 0; }
        }
        
        .animate-pulse-highlight {
          animation: pulse-highlight 0.7s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;