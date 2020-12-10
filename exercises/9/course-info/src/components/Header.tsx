import React from 'react';

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  return <h1>Welcome to course: {name}</h1>
}

export default Header