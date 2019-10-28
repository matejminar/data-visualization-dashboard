import React from 'react';
import { Layout } from 'antd';

export const Footer: React.FC = () => {
  const { Footer } = Layout;

  return (
    <Footer style={{ textAlign: 'center' }}>
      Created by{' '}
      <a
        href='https://www.minar.dev/'
        target='_blank'
        rel='noopener noreferrer'
      >
        Matej Minar
      </a>
    </Footer>
  );
};
