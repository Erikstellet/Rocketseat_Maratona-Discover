const Modal = 
{
    open()
    {
        // Abrir modal
        // Adicionar a class active ao modal
        document.querySelector('.modal-overlay')
                .classList.add('active')
    },
    close()
    {
        // fechar o modal
        // remover a class active do modal
        document.querySelector('.modal-overlay')
                .classList.remove('active')
    }
}

const transaction = 
[   
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '08/02/2021'
    },
    {
        id: 2,
        description: 'Website',
        amount: 50000,
        date: '08/02/2021'
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '08/02/2021'
    }
]; 

const Transaction = 
{
    incomes()
    {
        // Somar as entradas
    },
    expenses()
    {
        // Somar as saídas
    },
    total()
    {
        
    }
}

const DOM = 
{
    addTransaction(transaction, index)
    {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        console.log(tr.innerHTML)
    },
    innerHTMLTransaction(transaction)
    {
      const html = `<td class="description">${ transaction.description }</td>
                    <td class="expense">${ transaction.amount }</td>
                    <td class="date">${ transaction.date }</td>
                    <td>
                        <img src="./assets/minus.svg" 
                            alt="Remover transação">
                    </td>`

      return html
    }
}

DOM.addTransaction(transaction[1])