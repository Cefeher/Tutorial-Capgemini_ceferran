package com.ccsw.tutorial.client;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ccsw.tutorial.client.model.Client;
import com.ccsw.tutorial.client.model.ClientDto;


@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    ClientRepository clientRepository;


    @Override
    public List<Client> findAll() {
        return (List<Client>) this.clientRepository.findAll();
    }

    @Override
    public void save(Long id, ClientDto dto) {
        final Client client = (id == null) ? new Client() : clientRepository.findById(id).orElse(null);

        if (client == null) {
            throw new IllegalArgumentException("No se encontró ningún cliente con el id especificado.");
        }

        String newName = dto.getName().trim();

        if (newName.isEmpty()) {
            throw new IllegalArgumentException("El nombre de usuario no puede estar vacío.");
        }

        if (!newName.equals(client.getName()) && clientRepository.existsByName(newName)) {
            throw new IllegalArgumentException("El nombre de usuario ya existe.");
        }

        client.setName(newName);
        clientRepository.save(client);
    }

    @Override
    public void delete(Long id) {
        this.clientRepository.deleteById(id);
    }

    @Override
    public Client get(Long id) {
        return this.clientRepository.findById(id).orElse(null);
    }


}