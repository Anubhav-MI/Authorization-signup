import React from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator = ({ userPageUrl, color }) => {
  const qrCodeStyle = {
    backgroundColor: "white", // You can set the background color here
    color: color || "blue", // Use the provided color or default to black
  };

  return (
    <div>
      <h2>QR Code</h2>
      <div style={qrCodeStyle}>
        <QRCode value={userPageUrl} fgColor={qrCodeStyle.color} />
      </div>
    </div>
  );
};

export default QRCodeGenerator;
