// Elementos do DOM
const arrayContainer = document.getElementById("array-container");
const generateArrayBtn = document.getElementById("generate-array");
const sortArrayBtn = document.getElementById("sort-array");

let array = [];
let bars = []; // Armazena as referências das barras criadas

// Função para gerar um array aleatório
function generateArray(size = 50) {
    array = [];
    bars = [];
    arrayContainer.innerHTML = ''; // Limpa o contêiner do array
    console.log('Array gerado: ', array);

    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 100) + 10; // Valores entre 10 e 100
        array.push(value);

        // Criar as barras
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`; // Escala de 3x para maior visibilidade
        arrayContainer.appendChild(bar);
        bars.push(bar); // Armazena a referência da barra
    }
    console.log('Barras criadas: ', bars);
}

// Função para animar o merge sort
async function mergeSort(arr, start, end) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    await mergeSort(arr, start, mid);
    await mergeSort(arr, mid + 1, end);
    await merge(arr, start, mid, end);
}

async function merge(arr, start, mid, end) {
    const tempArr = [];
    let i = start, j = mid + 1;

    while (i <= mid && j <= end) {
        if (arr[i] <= arr[j]) {
            tempArr.push(arr[i++]);
        } else {
            tempArr.push(arr[j++]);
        }
    }

    while (i <= mid) {
        tempArr.push(arr[i++]);
    }

    while (j <= end) {
        tempArr.push(arr[j++]);
    }

    for (let k = start; k <= end; k++) {
        arr[k] = tempArr[k - start];
        await new Promise(resolve => setTimeout(resolve, 100)); // Animação
        bars[k].style.height = `${arr[k] * 3}px`; // Atualiza a altura da barra
    }
}

// Eventos de clique
generateArrayBtn.addEventListener("click", () => generateArray());
sortArrayBtn.addEventListener("click", () => mergeSort(array, 0, array.length - 1));

// Inicializa com um array gerado
generateArray();
