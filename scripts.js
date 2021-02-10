/*============================ DarkTheme ===============================*/

const html = document.querySelector("html")
const checkbox = document.querySelector("input[name=theme]")

const getStyle = (element, style) => window.getComputedStyle(element)
                                           .getPropertyValue(style);

const initialColors = 
{
    darkGreen: getStyle(html, "--dark-green"),
    background: getStyle(html, "--background"),
    white: getStyle(html, "--white"),
}

const darkMode = 
{
    darkGreen: "#7e7e7e",
    background: "#333333",
    white: "#f0f3f5",
}

const transformKey = key => "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const changeColors = colors => 
{
    Object.keys(colors).map(key => html.style.setProperty(transformKey(key), colors[key]))
}

checkbox.addEventListener("change", ({target}) => 
{
    target.checked ? changeColors(darkMode) : changeColors(initialColors)
})

/*============================ Modal ===============================*/

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

const Storage = 
{
    get()
    {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },
    set(transactions)
    {
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}

const Transaction = 
{
    all: Storage.get()
    ,
    add(transaction)
    {
        Transaction.all.push(transaction)
        App.reload()
    },
    remove(index)
    {
        Transaction.all.splice(index, 1)
        App.reload()
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

const DOM = 
{
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index)
    {
        const tr = document.createElement('tr')
        
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index;

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction, index)
    {
      const cSSclass = transaction.amount > 0 ? "income" : "expense";

      const amount = Utils.formatCurrency(transaction.amount);
        
      const html = `<td class="description">${ transaction.description }</td>
                    <td class="${cSSclass}">${ amount }</td>
                    <td class="date">${ transaction.date }</td>
                    <td>
                        <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" 
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

    },
    clearTransactions()
    {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = 
{
    formatAmount(value)
    {
        value = Number(value.replace(/\,\./g, "")) * 100;
        return Math.round(value)   
    },
    formatDate(date)
    {
        const splitDate = date.split("-");
        splitDate.reverse();

        return splitDate.join("/")
    },
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

const Form = 
{
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues()
    {
        return{
                description: Form.description.value,
                amount: Form.amount.value,
                date: Form.date.value,
              }
    },
    validateFields()
    {
        const { description, amount, date} = Form.getValues()

        if(description.trim() === "" || amount.trim() === "" || date.trim() === "")
        {
            throw new Error("Por favor, preencha os campos");
        }
    },
    formatValues()
    {
        let { description, amount, date} = Form.getValues();

        amount = Utils.formatAmount(amount);
        date = Utils.formatDate(date);
        
        return { description, amount ,date}
    },
    clearFields()
    {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },
    submit(event)
    {
        event.preventDefault();  // Do not do the standard function

        try 
        {
            Form.validateFields();                      
            const transaction = Form.formatValues(); 
            Transaction.add(transaction) 
            Form.clearFields();
            Modal.close();
            chart.update()     
        }
        catch(error)
        {
            alert(error.message);
        } 
    }
}

const App = 
{
    init()
    {
        Transaction.all.forEach(DOM.addTransaction)

        DOM.updateBalance()

        Storage.set(Transaction.all)
    },
    reload()
    {
        DOM.clearTransactions();
        App.init();
    }
}

//console.log(chart.data.labels)

App.init()

graphicsDate = Transaction.all.map(function(nome)
{
    let date = nome.date.split("/")
    let d = date[1][0] + date[1][1]

    mes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
           'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
           
    nums = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
           'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    for(let i = 0; i < date.length; i++)
    {
        console.log(date.length)
        
        if (d == 01)
        {
            return mes[0]
        }
        else if (d == 02)
        {  
            return mes[1]
        }
        else if (d == 03)
        {    
            return mes[2]
        }
        else if (d == 07)
        {    
            return mes[6]
        }
    }
})

/*============================ Chart.js ===============================*/

const ctx = document.getElementById('myChart').getContext('2d');

const chart = new Chart(ctx,
{
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data:
    {
        labels: [],
        datasets: 
        [
            {
                label: 'My First dataset',
                borderColor: '#E92929',
                data: [5, -10 , 15]
            },
            {
                label: 'My First dataset',
                borderColor: '#49AA26',
                data: [10, 50 , 30]
            },
        ]
    },

    // Configuration options go here
    options: {}
});

arr = [];
arr.push(graphicsDate)


let sizeData = chart.data.datasets[0].data.length

chart.data.datasets[0].data[sizeData] = Math.random() * 100

for(let i = 0; i < arr.length; i++)
{
    chart.data.labels = arr[i]
}

chart.data.labels.sort();
chart.update() 
