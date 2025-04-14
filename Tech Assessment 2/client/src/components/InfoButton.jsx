import React from 'react';

function InfoButton() {
  return (
    <div className="mt-6 text-center">
      <p className="text-lg font-bold">
        Created by{' '}
        <a
          href="https://www.linkedin.com/in/narasimhapula/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 font-bold transition"
        >
          Narasimha Pula
        </a>
      </p>
      <p className="text-sm text-gray-600 mt-2">
        <strong>Product Manager Accelerator</strong> helps aspiring product managers to get hands-on
        experience.{' '}
        <a
          href="https://www.linkedin.com/school/pmaccelerator/about/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 font-bold transition"
        >
          Learn More
        </a>
      </p>
    </div>
  );
}

export default InfoButton;