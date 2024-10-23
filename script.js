const contacts = [
    { name: "Ana Costa", phone: "(41) 94567-8901", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d" },
    { name: "Carol Pereira", phone: "(31) 93456-7890", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d" },
    { name: "João Silva", phone: "(11) 91234-5678", avatar: "https://i.pravatar.cc/150?u=fake@pravatar.com" },
    { name: "Juliana Almeida", phone: "(61) 96789-0123", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026708d" },
    { name: "Lucas Santos", phone: "(51) 95678-9012", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026707d" },
    { name: "Maria Oliveira", phone: "(21) 92345-6789", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" }
];

let contactToDelete = null;

function renderContacts() {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';

    const groupedContacts = groupContactsByInitial(contacts);
    Object.keys(groupedContacts).forEach(letter => {
        const section = document.createElement('div');
        section.id = letter;
        section.innerHTML = `<h2 class="text-2xl font-bold text-white mt-6">${letter}</h2>`;
        
        groupedContacts[letter].forEach((contact, index) => {
            const contactCard = document.createElement('div');
            contactCard.className = 'bg-gray-800 shadow-md rounded-lg p-4 flex items-center hover:bg-gray-700 transition duration-300';
            contactCard.innerHTML = `
                <img src="${contact.avatar}" alt="${contact.name}" class="w-16 h-16 rounded-full mr-4 shadow-md">
                <div class="flex-grow">
                    <h2 class="text-lg font-semibold text-white">${contact.name}</h2>
                    <p class="text-gray-400">${contact.phone}</p>
                </div>
                <div class="flex space-x-4">
                    <button class="text-gray-400 hover:text-yellow-300" onclick="editContact(${index})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-gray-400 hover:text-red-300" onclick="confirmDeleteContact(${index})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            section.appendChild(contactCard);
        });
        contactList.appendChild(section);
    });
}

function groupContactsByInitial(contacts) {
    const grouped = {};
    contacts.forEach(contact => {
        const firstLetter = contact.name.charAt(0).toUpperCase();
        if (!grouped[firstLetter]) {
            grouped[firstLetter] = [];
        }
        grouped[firstLetter].push(contact);
    });
    return grouped;
}


function openModal(title, name = '', phone = '', index = null) {
    const modal = document.getElementById('contactModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalName = document.getElementById('modalName');
    const modalPhone = document.getElementById('modalPhone');
    const contactForm = document.getElementById('contactForm');

    modalTitle.innerText = title;
    modalName.value = name;
    modalPhone.value = phone;

    //  onsubmit para evitar que o formulário recarregue a página
    contactForm.onsubmit = function (event) {
        event.preventDefault();  // Evita o comportamento padrão de refresh!!!!!!!!!

        if (index === null) {
            contacts.push({
                name: modalName.value,
                phone: modalPhone.value,
                avatar: `https://i.pravatar.cc/150?u=${Math.random()}` 
            });
        } else {
            // Edita o contato existente
            contacts[index].name = modalName.value;
            contacts[index].phone = modalPhone.value;
        }

        closeModal();
        renderContacts();  // Re-renderiza a lista de contatos
    };

    modal.classList.remove('hidden'); 
}



function closeModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('hidden');
}

function editContact(index) {
    const contact = contacts[index];
    openModal('Editar Contato', contact.name, contact.phone, index);
}

function confirmDeleteContact(index) {
    contactToDelete = index;
    const deleteModal = document.getElementById('deleteModal');
    deleteModal.classList.remove('hidden');
}

function closeDeleteModal() {
    const deleteModal = document.getElementById('deleteModal');
    deleteModal.classList.add('hidden');
}

function deleteContact() {
    contacts.splice(contactToDelete, 1);
    contactToDelete = null;
    closeDeleteModal();
    renderContacts();
}

function filterContacts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(searchTerm) || contact.phone.includes(searchTerm));
    renderFilteredContacts(filteredContacts);
}

function renderFilteredContacts(filteredContacts) {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';

    const groupedContacts = groupContactsByInitial(filteredContacts);
    Object.keys(groupedContacts).forEach(letter => {
        const section = document.createElement('div');
        section.id = letter;
        section.innerHTML = `<h2 class="text-2xl font-bold text-white mt-6">${letter}</h2>`;
        
        groupedContacts[letter].forEach((contact, index) => {
            const contactCard = document.createElement('div');
            contactCard.className = 'bg-gray-800 shadow-md rounded-lg p-4 flex items-center hover:bg-gray-700 transition duration-300';
            contactCard.innerHTML = `
                <img src="${contact.avatar}" alt="${contact.name}" class="w-16 h-16 rounded-full mr-4 shadow-md">
                <div class="flex-grow">
                    <h2 class="text-lg font-semibold text-white">${contact.name}</h2>
                    <p class="text-gray-400">${contact.phone}</p>
                </div>
                <div class="flex space-x-4">
                    <button class="text-gray-400 hover:text-yellow-300" onclick="editContact(${index})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-gray-400 hover:text-red-300" onclick="confirmDeleteContact(${index})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            section.appendChild(contactCard);
        });
        contactList.appendChild(section);
    });
}

document.getElementById('addContact').addEventListener('click', () => openModal('Adicionar Contato'));

renderContacts();
