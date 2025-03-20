document.addEventListener("DOMContentLoaded", function () {
    fetchProducts();

    document.getElementById("productForm").addEventListener("submit", function (event) {
        event.preventDefault();
        let id = document.getElementById("productId").value;
        let name = document.getElementById("productName").value;
        let price = document.getElementById("productPrice").value;
        let action = id ? "update" : "create";

        fetch("ProductServlet", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `action=${action}&id=${id}&name=${name}&price=${price}`
        }).then(() => {
            fetchProducts();
            document.getElementById("productForm").reset();
        });
    });
});

function fetchProducts() {
    fetch("ProductServlet").then(response => response.json()).then(data => {
        let tbody = document.getElementById("productTableBody");
        tbody.innerHTML = "";
        data.forEach(product => {
            let row = `<tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>
                    <button onclick="editProduct(${product.id}, '${product.name}', ${product.price})">Edit</button>
                    <button onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>`;
            tbody.innerHTML += row;
        });
    });
}

function editProduct(id, name, price) {
    document.getElementById("productId").value = id;
    document.getElementById("productName").value = name;
    document.getElementById("productPrice").value = price;
}

function deleteProduct(id) {
    fetch("ProductServlet", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `action=delete&id=${id}`
    }).then(() => fetchProducts());
}
