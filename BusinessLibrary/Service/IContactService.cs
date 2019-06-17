using BusinessLibrary.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public interface IContactService
    {
        Task<List<ContactModel>> GetContacts();
        Task<bool> SaveContact(ContactModel contact);
        Task<bool> DeleteContact(int contactId);
    }
}
