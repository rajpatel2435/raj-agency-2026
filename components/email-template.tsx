// components/email-template.tsx

import * as React from 'react';



interface EmailTemplateProps {

  ticker: string;

  action: 'BUY' | 'SELL';

  allocatedAmount: number;

  orderId: string;

}



export const TradingAlertEmail: React.FC<Readonly<EmailTemplateProps>> = ({

  ticker,

  action,

  allocatedAmount,

  orderId,

}) => (

  <div style={{ fontFamily: 'sans-serif', backgroundColor: '#0a0a0a', color: '#ffffff', padding: '24px', borderRadius: '8px' }}>

    <h2 style={{ color: action === 'BUY' ? '#10b981' : '#ef4444', margin: '0 0 16px 0' }}>

      ⚡ Strategy Trade Dispatched ({action})

    </h2>

    <p style={{ fontSize: '14px', color: '#a3a3a3' }}>

      Your multi-agent routing loop successfully placed an order on the NSE.

    </p>

    <hr style={{ borderColor: '#1f1f1f', margin: '20px 0' }} />

    <table style={{ width: '100%', fontSize: '14px' }}>

      <tbody>

        <tr>

          <td style={{ color: '#737373', padding: '4px 0' }}>Asset Ticker</td>

          <td style={{ textAlign: 'right', fontWeight: 'bold', fontFamily: 'monospace' }}>{ticker}</td>

        </tr>

        <tr>

          <td style={{ color: '#737373', padding: '4px 0' }}>Capital Allocation</td>

          <td style={{ textAlign: 'right', fontWeight: 'bold' }}>₹{allocatedAmount.toFixed(2)}</td>

        </tr>

        <tr>

          <td style={{ color: '#737373', padding: '4px 0' }}>Exchange Tracking Handle</td>

          <td style={{ textAlign: 'right', color: '#a3a3a3', fontFamily: 'monospace' }}>{orderId}</td>

        </tr>

      </tbody>

    </table>

  </div>

);

