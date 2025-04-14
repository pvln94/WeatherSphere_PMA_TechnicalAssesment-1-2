import React from 'react';

function InfoButton() {
  return (
    <div
      style={{
        marginTop: '1.5rem', // mt-6
        textAlign: 'center', // text-center
      }}
    >
      <p
        style={{
          fontSize: '1.125rem', // Larger font size for name
          fontWeight: 'bold', // Bold style for the name
        }}
      >
        Created by{' '}
        <a
          href="https://www.linkedin.com/in/narasimhapula/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#3b82f6', // Blue color for the name
            textDecoration: 'none', // No underline for the link
            fontWeight: 'bold', // Bold link text
            transition: 'color 0.2s ease', // Transition effect for the link hover
          }}
          onMouseEnter={(e) => e.target.style.color = '#2563eb'} // Hover color
          onMouseLeave={(e) => e.target.style.color = '#3b82f6'} // Revert color
        >
          Narasimha Pula
        </a>
      </p>
      <p
        style={{
          fontSize: '0.875rem', // Smaller font size for description
          color: '#6b7280', // Gray color for description text
          marginBottom: '1rem', // Margin at the bottom for spacing
        }}
      >
        <strong style={{ color: 'black' }}>Product Manager Accelerator</strong> helps aspiring product managers to get hands-on experience, connect with industry professionals, and develop the skills needed for product management.{' '}
        <a
          href="https://www.linkedin.com/school/pmaccelerator/about/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#2563eb', // Blue color for the link
            textDecoration: 'none', // No underline for the link
            fontWeight: 'bold', // Bold link text
            transition: 'color 0.2s ease', // Transition effect for the link hover
          }}
          onMouseEnter={(e) => e.target.style.color = '#3b82f6'} // Hover color
          onMouseLeave={(e) => e.target.style.color = '#2563eb'} // Revert color
        >
          Learn More
        </a>
      </p>
    </div>
  );
}

export default InfoButton;
