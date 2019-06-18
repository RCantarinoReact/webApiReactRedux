import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { actionCreators } from '../store/Relatory';

class Relatorio extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate() {
        // This method is called when the route parameters change
        if (this.props.forceReload) {
            this.fetchData();
        }
    }

    fetchData() {
        this.props.requestRelatory();
    }

    render() {
        let header = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>Lista de xxx </div>;

        let footer = <div className="p-clearfix" style={{ width: '100%' }}>

        </div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <DataTable value={this.props.contacts} selectionMode="single" header={header} footer={footer}>
                    <Column field="contactId" header="ID" />
                    <Column field="firstName" header="Nome" />
                    <Column field="lastName" header="Sobrenome" />
                    <Column field="email" header="E-mail" />
                    <Column field="phone" header="Telefone" />
                </DataTable>

            </div>
        )
    }
}

// Make contacts array available in  props
function mapStateToProps(state) {
    return {
        contacts: state.relatory.contacts,
        loading: state.contacts.loading,
        errors: state.contacts.errors,
        forceReload: state.contacts.forceReload
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Relatorio);