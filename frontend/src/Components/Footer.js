import React from 'react';

class Footer extends React.Component {
  render() {
    const year = new Date().getFullYear();
    return (
      <footer className="footer-custom">
        🚗 CarManagement &nbsp;·&nbsp; {year} &nbsp;·&nbsp; Master MIOLA
      </footer>
    );
  }
}

export default Footer;
