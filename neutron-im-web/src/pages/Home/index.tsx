import React from 'react';
import { Redirect } from 'react-router';

export default function Home(): JSX.Element {
  return <Redirect to="/chats" push />;
}
