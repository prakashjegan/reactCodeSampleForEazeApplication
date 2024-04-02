import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar , faFileInvoice } from '@fortawesome/free-solid-svg-icons';

const InvoiceComponent = ({ invoiceName, downloadLink }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    // Implement download logic here
    setIsDownloading(true);

    // Simulate a download delay (you can replace this with your actual download logic)
    setTimeout(() => {
      // Reset the download state after the delay
      setIsDownloading(false);
    }, 2000);

    // For demonstration purposes, you can open the download link in a new tab
    window.open(downloadLink, '_blank');
  };

  return (
    <>
    <div onClick={handleDownload} style={{
            color: "white",
            fontWeight: 'bold',
            textDecoration: "underline",
            cursor: "pointer",
          }}
          >
        <FontAwesomeIcon icon={faFileInvoice} /> {invoiceName}
      </div>
    </>
    // <div style={{ margin: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
    //   <div style={{ display: 'flex', alignItems: 'center' }}>
    //     <img
    //       src="https://example.com/invoice-icon.png" // Replace with the actual URL of your invoice icon
    //       alt="Invoice Icon"
    //       style={{ width: '50px', height: '50px', marginRight: '10px' }}
    //       onClick={handleDownload}
    //     />
    //     <p style={{ margin: '0', fontSize: '18px' }}>{invoiceName}</p>
    //   </div>
    //   {/* <button onClick={handleDownload} disabled={isDownloading}>
    //     {isDownloading ? 'Downloading...' : 'Download Invoice'}
    //   </button> */}
    // </div>
  );
};

export default InvoiceComponent;