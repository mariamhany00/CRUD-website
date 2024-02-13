var productsContainer;


if (localStorage.getItem("ourProducts") != null) {
    productsContainer = JSON.parse(localStorage.getItem("ourProducts"));
    displayProduct();
} else {
    productsContainer = [];
}

var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCateogary');
var productDesInput = document.getElementById('productDes');
var inputs = document.getElementsByClassName("form-control");

console.log(productName, productPrice, productCateogary, productDes);

function addProduct() {
    var Product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        Description: productDesInput.value
    };

    productsContainer.push(Product);
    console.log(productsContainer);
    localStorage.setItem('ourProducts', JSON.stringify(productsContainer));

    clearForm();
    displayProduct();
}

function clearForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

function displayProduct() {
    var trs = "";

    for (var i = 0; i < productsContainer.length; i++) {
        trs += `<tr>
            <td>${i + 1}</td>
            <td>${productsContainer[i].name}</td>
            <td>${productsContainer[i].price}</td>
            <td>${productsContainer[i].category}</td>
            <td>${productsContainer[i].Description}</td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
            <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
        </tr>`;
    }

    document.getElementById("tablebody").innerHTML = trs;
}

function deleteProduct(index) {
    productsContainer.splice(index, 1);
    localStorage.setItem('ourProducts', JSON.stringify(productsContainer));
    displayProduct();
}

function searchProduct(term) {
    var trs = "";

    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
            trs += `<tr>
                <td>${i + 1}</td>
                <td>${productsContainer[i].name}</td>
                <td>${productsContainer[i].price}</td>
                <td>${productsContainer[i].category}</td>
                <td>${productsContainer[i].Description}</td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
                <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
            </tr>`;
        }
    }

    document.getElementById("tablebody").innerHTML = trs;
}

function updateProduct(index) {
    // Set the form fields with the details of the selected product
    productNameInput.value = productsContainer[index].name;
    productPriceInput.value = productsContainer[index].price;
    productCategoryInput.value = productsContainer[index].category;
    productDesInput.value = productsContainer[index].Description;

    // Change the button text to indicate an update operation
    document.getElementById("main-btn").innerHTML = "Update Product";

    // Add an event listener to the button for handling the update action
    document.getElementById("main-btn").onclick = function () {
        // Remove the old product at the specified index
        productsContainer.splice(index, 1);

        // Create a new product with the updated details
        var updatedProduct = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            Description: productDesInput.value
        };

        // Add the updated product to the array
        productsContainer.push(updatedProduct);

        // Update local storage
        localStorage.setItem('ourProducts', JSON.stringify(productsContainer));

        // Clear the form and reset the button text and click event
        clearForm();
        document.getElementById("main-btn").innerHTML = "Add Product";
        document.getElementById("main-btn").onclick = addProduct;

        // Refresh the displayed products
        displayProduct();
    };
}
