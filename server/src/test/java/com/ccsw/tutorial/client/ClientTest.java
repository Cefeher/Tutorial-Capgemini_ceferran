package com.ccsw.tutorial.client;

import com.ccsw.tutorial.client.model.Client;
import com.ccsw.tutorial.client.model.ClientDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ClientTest {

    @InjectMocks
    private ClientServiceImpl clientService;

    @Mock
    private ClientRepository clientRepository;

    public ClientTest() {
    }


    @Test
    public void findAllShouldReturnAllClients() {

        List<Client> list = new ArrayList<>();
        list.add(mock(Client.class));

        when(clientRepository.findAll()).thenReturn(list);

        List<Client> clients = clientService.findAll();

        assertNotNull(clients);
        assertEquals(1, clients.size());
    }


    public static final String CLIENT_NAME = "CLIENT1";
    public static final Long EXISTS_CLIENT_ID = 1L;

    @Test
    public void saveNotExistsClientIdShouldInsert() {

        ClientDto clientDto = new ClientDto();
        clientDto.setName(CLIENT_NAME);

        ArgumentCaptor<Client> client = ArgumentCaptor.forClass(Client.class);

        clientService.save(null, clientDto);

        verify(clientRepository).save(client.capture());
        assertEquals(CLIENT_NAME, client.getValue().getName());
    }


    @Test
    public void saveExistsClientIdShouldThrowException() {

        ClientDto clientDto = new ClientDto();
        clientDto.setName(CLIENT_NAME);

        Client client = new Client();
        client.setId(1L);
        client.setName(CLIENT_NAME);

        when(clientRepository.existsByName(CLIENT_NAME)).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> clientService.save(null, clientDto));
    }


    @Test
    public void deleteExistsClientIdShouldDelete() {

        clientService.delete(EXISTS_CLIENT_ID);

        verify(clientRepository).deleteById(EXISTS_CLIENT_ID);
    }


}
