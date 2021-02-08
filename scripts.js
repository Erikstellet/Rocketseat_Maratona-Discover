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

const transactions = 
[   
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '06/02/2021'
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '06/02/2021'
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '07/02/2021'
    },
    {
        id: 4,
        description: 'App',
        amount: 200000,
        date: '08/02/2021'
    },
    {
        id: 5,
        description: 'Mercado',
        amount: -100000,
        date: '08/02/2021'
    }
]; 

const Transaction = 
{
    all: transactions,

    add(transaction)
    {
        Transaction.all.push(transaction)
        console.log(Transaction.all);
    },
    incomes()
    {
        let income = 0;

        Transaction.all.forEach(transaction => 
        {
            if(transaction.amount > 0)
            {
                income += transaction.amount;
            }
        })

        return income; 
    },
    expenses()
    {
        let expenses = 0;

        Transaction.all.forEach(transaction => 
        {
            if(transaction.amount < 0)
            {
                expenses += transaction.amount;
            }
        })

        return expenses;
    },
    total()
    {
        return total = Transaction.incomes() + Transaction.expenses(); 
    }
}

const Utils = 
{
    formatCurrency(value)
    {
        const signal = Number(value) < 0 ? "-" : "";

        value = String(value).replace(/\D/g, "");
        value = Number(value) / 100;

        value = value.toLocaleString("pt-BR", 
        {
            style: "currency",
            currency: "BRL"
        })

        return signal + value;
    }
}

const DOM = 
{
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index)
    {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction)
    {
      const cSSclass = transaction.amount > 0 ? "income" : "expense";

      const amount = Utils.formatCurrency(transaction.amount);
        
      const html = `<td class="description">${ transaction.description }</td>
                    <td class="${cSSclass}">${ amount }</td>
                    <td class="date">${ transaction.date }</td>
                    <td>
                        <img src="./assets/minus.svg" 
                             alt="Remover transação">
                    </td>`

      return html
    },
    updateBalance()
    {
        document.getElementById('incomeDisplay')
                .innerHTML = Utils.formatCurrency(Transaction.incomes());

        document.getElementById('expenseDisplay')
                .innerHTML = Utils.formatCurrency(Transaction.expenses());

        document.getElementById('totalDisplay')
                .innerHTML = Utils.formatCurrency(Transaction.total());
    }
}

Transaction.add
({
    id: 6,
    description: 'Carro',
    amount: -70000,
    date: '08/02/2021'
})

transactions.forEach(transaction => DOM.addTransaction(transaction));
DOM.updateBalance()

