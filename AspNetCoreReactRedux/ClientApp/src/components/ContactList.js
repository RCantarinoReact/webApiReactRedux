import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { actionCreators } from '../store/Contact';

class ContactList extends Component {
    constructor() {
        super();
        this.state = {};
        this.onContactSelect = this.onContactSelect.bind(this);
        this.dialogHide = this.dialogHide.bind(this);
        this.addNew = this.addNew.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
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
        this.props.requestContacts();
    }

    updateProperty(property, value) {
        let contact = this.state.contact;
        contact[property] = value;
        this.setState({ contact: contact });
    }

    onContactSelect(e) {
        this.newContact = false;
        this.setState({
            displayDialog: true,
            contact: Object.assign({}, e.data)
        });
    }

    dialogHide() {
        this.setState({ displayDialog: false });
    }

    addNew() {
        this.newContact = true;
        this.setState({
            contact: { firstName: '', lastName: '', email: '', phone: '' },
            displayDialog: true
        });
    }

    save() {
        this.props.saveContact(this.state.contact);
        this.dialogHide();
        this.growl.show({ severity: 'success', detail: this.newContact ? "Contato adicionado" : "contato atualizado" });
    }

    delete() {
        this.props.deleteContact(this.state.contact.contactId);
        this.dialogHide();
        this.growl.show({ severity: 'error', detail: "contato excluido" });
    }

    render() {
        let header = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>Lista de contatos </div>;

        let footer = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ float: 'left' }} label="Novo" icon="pi pi-plus" onClick={this.addNew} />
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button label="Fechar" icon="pi pi-times" onClick={this.dialogHide} />
            <Button label="Excluir" disabled={this.newContact ? true : false} icon="pi pi-times" onClick={this.delete} />
            <Button label={this.newContact ? "Salvar" : "Atualizar"} icon="pi pi-check" onClick={this.save} />
        </div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <DataTable value={this.props.contacts} selectionMode="single" header={header} footer={footer} selection={this.state.selectedContact} onSelectionChange={e => this.setState({ selectedContact: e.value })} onRowSelect={this.onContactSelect}>
                    <Column field="contactId" header="ID" />
                    <Column field="firstName" header="Nome" />
                    <Column field="lastName" header="Sobrenome" />
                    <Column field="email" header="E-mail" />
                    <Column field="phone" header="Telefone" />
                </DataTable>
                <Dialog visible={this.state.displayDialog} style={{ 'width': '380px' }} header="Contato" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                    {
                        this.state.contact &&

                        <div className="p-grid p-fluid">

                            <div><label htmlFor="firstName">Nome</label></div>
                            <div>
                                <InputText id="firstName" onChange={(e) => { this.updateProperty('firstName', e.target.value) }} value={this.state.contact.firstName} />
                            </div>

                            <div style={{ paddingTop: '10px' }}><label htmlFor="lastName">Sobrenome</label></div>
                            <div>
                                <InputText id="lastName" onChange={(e) => { this.updateProperty('lastName', e.target.value) }} value={this.state.contact.lastName} />
                            </div>

                            <div style={{ paddingTop: '10px' }}><label htmlFor="lastName">E-mail</label></div>
                            <div>
                                <InputText id="email" onChange={(e) => { this.updateProperty('email', e.target.value) }} value={this.state.contact.email} />
                            </div>

                            <div style={{ paddingTop: '10px' }}><label htmlFor="lastName">Telefone</label></div>
                            <div>
                                <InputText id="phone" onChange={(e) => { this.updateProperty('phone', e.target.value) }} value={this.state.contact.phone} />
                            </div>
                        </div>
                    }
                </Dialog>
            </div>
        )
    }
}

// Make contacts array available in  props
function mapStateToProps(state) {
    return {
        contacts: state.contacts.contacts,
        loading: state.contacts.loading,
        errors: state.contacts.errors,
        forceReload: state.contacts.forceReload
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ContactList);