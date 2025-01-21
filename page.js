class Produit {
    constructor(code, title, description, price, category) {
        this.code = code;
        this.title = title;
        this.description = description;
        this.price = price;
        this.category = category;
    }
}


const productForm = document.getElementById('productForm');
const addBtn = document.getElementById('addBtn');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const resetBtn = document.getElementById('resetBtn');
const productTable = document.getElementById('productTable');
const deleteBtn = document.getElementById('deleteBtn');
const tbody = productTable.querySelector('tbody');

const products = [];

// Q1
addBtn.addEventListener('click', () => {
    productForm.style.display = 'block';
});

// Q3 annuler
cancelBtn.addEventListener('click', () => {
    productForm.style.display = 'none';
});

// Q4 vider
resetBtn.addEventListener('click', () => {
    productForm.reset();
});

// Q2 save
saveBtn.addEventListener('click', () => {

    const productCode = document.getElementById('productCode').value;
    const productTitle = document.getElementById('productTitle').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;
    const productCategory = document.getElementById('productCategory').value;

    if (productCode && productTitle && productDescription && productPrice && productCategory) {
        const newProduct = new Produit(productCode, productTitle, productDescription, productPrice, productCategory);
        products.push(newProduct);

        // Q5
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
    <td>${newProduct.code}</td>
    <td>${newProduct.title}</td>
    <td>${newProduct.description}</td>
    <td>${newProduct.price}</td>
    <td>${newProduct.category}</td>
  `;
        tbody.appendChild(newRow);

        productForm.reset();
        productForm.style.display = 'none';
    } else {
        alert('Veuillez remplir tous les champs obligatoires.');
    }
});

// Q7
deleteBtn.addEventListener('click', () => {
    const selectedRows = productTable.querySelectorAll('tr.highlighted');

    if (selectedRows.length > 0) {
        if (confirm('Êtes-vous sûr de vouloir supprimer le(s) produit(s) sélectionné(s) ?')) {
            selectedRows.forEach((row) => {
                row.remove();
            });
        }
    } else {
        alert('Veuillez sélectionner au moins une ligne à supprimer.');
    }
});

// Q6
tbody.addEventListener('click', (event) => {
    const row = event.target.closest('tr');

    if (row) {
        row.classList.toggle('highlighted');
    }
});

// Q9
const produit1 = new Produit('001', 'Produit 1', 'Description du produit 1', 10.99, 'Catégorie 1');
const produit2 = new Produit('002', 'Produit 2', 'Description du produit 2', 19.99, 'Catégorie 2');


products.push(produit1, produit2);


products.forEach((product) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
  <td>${product.code}</td>
  <td>${product.title}</td>
  <td>${product.description}</td>
  <td>${product.price}</td>
  <td>${product.category}</td>
`;
    tbody.appendChild(newRow);
});


// Q10
const showCategoriesBtn = document.createElement('button');
showCategoriesBtn.textContent = 'Afficher la liste des catégories';
document.body.appendChild(showCategoriesBtn);

showCategoriesBtn.addEventListener('click', () => {
    fetch('https://www.mystore.com/cat')
        .then(response => response.json())
        .then(data => {
            const categoriesList = document.createElement('ul');

            data.data.forEach(category => {
                const categoryItem = document.createElement('li');
                categoryItem.textContent = `${category.titre} - ${category.description}`;
                categoriesList.appendChild(categoryItem);
            });

            document.body.appendChild(categoriesList);
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la récupération des catégories:', error);
        });
});
