import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import ContactList from './components/ContactList';
import Relatorio from './components/Relatorio';

export default () => (
    <Layout>
        <Route exact path='/' component={ContactList} />
        <Route exact path='/relatorio' component={Relatorio} />
    </Layout>
);