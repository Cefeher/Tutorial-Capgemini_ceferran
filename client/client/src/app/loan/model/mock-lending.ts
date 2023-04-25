import { LoanPage } from './LoanPage';


export const LOAN_DATA: LoanPage = {
    content: [
        { id: 1, game: { id: 1, title: 'Nada 1', age: 8, category: { id: 1, name: 'Categoría 1' }, author: { id: 1, name: 'Manolo', nationality: 'ES' } }, client:{  id: 1, name: 'Cesar'}, loanDate: new Date('2023-04-01'), returnDate: new Date('2023-04-08') },
        { id: 2, game: { id: 2, title: 'Nada 2', age: 12, category: { id: 2, name: 'Categoría 2' }, author: { id: 2, name: 'Pepito', nationality: 'US' } },client:{  id: 1, name: 'Alejandro'}, loanDate: new Date('2023-04-02'), returnDate: new Date('2023-04-09') },
        { id: 3, game: { id: 3, title: 'Nada 3', age: 10, category: { id: 3, name: 'Categoría 3' }, author: { id: 3, name: 'Andres', nationality: 'UK' } },client:{  id: 1, name: 'Jaime'}, loanDate: new Date('2023-04-03'), returnDate: new Date('2023-04-10') },
        { id: 4, game: { id: 4, title: 'Nada 4', age: 14, category: { id: 1, name: 'Categoría 4' }, author: { id: 4, name: 'Carlos', nationality: 'FR' } },client:{  id: 1, name: 'Miguel'}, loanDate: new Date('2023-04-04'), returnDate: new Date('2023-04-11') },
    ],
    pageable: {
        pageSize: 5,
        pageNumber: 0,
        sort: [
            { property: "id", direction: "ASC" }
        ]
    },
    totalElements: 4
}