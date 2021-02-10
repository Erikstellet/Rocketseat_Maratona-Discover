test = ['bg', 'bgPanel', 'colorHeadings', 'colorText']
testDois = ['--bg', '--bg-panel', '--color-headings', '-color-text']
testTres = []

for(let i = 0;i < test.length;i++)
{
    test[i] = ' --' + test[i]
}

test = test.join()
test = test.toLowerCase()
test = test.split(' ')

for(let i = 0;i < test.length;i++)
{
    console.log(test[i])
}

const darkMode = 
{
    darkGreen: "#7e7e7e",
    background: "#333333",
    whitch: "#49AA26"
}
