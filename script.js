class Project {
  constructor() {
    this.$inputProduct = $("#produto");
    this.$inputValue = $("#valor");
    this.tbody = document.querySelector(".tbody");
    this.allProducts = [];
    this.id = 1;
    this.editId = null;
    this.initEvent();
  }
  initEvent() {
    $("#salvar").click(() => this.onInputValidateFields());
    $("#cancelar").click(() => this.cancelFunction());
  }

  onInputValidateFields() {
    if (this.messageError()) this.addElements();
  }
  cancelFunction() {
    $("#salvar").text("Salvar");
    this.emptyField();
    this.editId = null;
  }
  addElements() {
    this.products = {};

    this.products.id = this.id;
    this.products.name = this.$inputProduct.val();
    this.products.value = this.$inputValue.val();
    if (this.editId === null) {
      this.allProducts.push(this.products);
    } else {
      this.onUpDateElements(this.editId, this.products);
    }
    this.id++;
    console.log(this.allProducts);
    this.emptyField();
    this.addElementsHTML();
  }
  emptyField() {
    this.$inputProduct.val("");
    this.$inputProduct.focus();
    this.$inputValue.val("");
  }
  addElementsHTML() {
    $(".tbody").text("");
    $(this.allProducts).each(function (pos, product) {
      $(".tbody").append(
        $("<tr/>")
          .addClass("firstItens")
          .append($("<td/>").text(product.id))
          .append($("<td/>").text(product.name))
          .append($("<td/>").text(product.value))
          .append(
            $("<td/>")
              .addClass("img")
              .append(
                `<img src='img/icons8-edit-30.png' onclick='project.onEditElements(${JSON.stringify(
                  product
                )})'>`
              )
              .append(
                `<img src='img/download.png' onclick='project.onDeleteElements(${product.id})'>`
              )
          )
      );
    });
  }

  onEditElements(products) {
    this.editId = products.id;
    $(this.$inputProduct).val(products.name);
    $(this.$inputValue).val(products.value);
    $("#salvar").text("Atualizar");
  }
  onUpDateElements(id, products) {
    $(this.allProducts).each((pos, product) => {
      if (product.id === id) {
        product.name = products.name;
        product.value = products.value;
      }
    });
  }

  onDeleteElements(id) {
    console.log(id);
    if (confirm(`Pretendes eliminar o item ${id} da sua lista.?`)) {
      $(this.allProducts).each((pos, product) => {
        if (product.id === id) {
          this.allProducts.splice(pos, 1);
          this.tbody.deleteRow(product);
        }
      });
    }
  }
  messageError() {
    let message = "";
    if ($(this.$inputProduct).val() === "") {
      message += "Informe o nome do produto\n";
    }
    if ($(this.$inputValue).val() === "") {
      message += "Informe o valor do produto";
    }
    if (message !== "") {
      alert(message);
      return false;
    }
    return true;
  }
}

const project = new Project();
