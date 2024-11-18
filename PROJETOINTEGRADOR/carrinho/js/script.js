
function menuOnClick() {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
  }

    let cartItems = [];

    // Adiciona um item ao carrinho
    function addItemToCart(itemName) {
        cartItems.push(itemName);
        updateCartMenu();
    }

    // Atualiza o menu do carrinho
    function updateCartMenu() {
        const cartItemsContainer = document.getElementById('cartItems');
        cartItemsContainer.innerHTML = ''; // Limpa o conteúdo atual

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p style="color: #aaa; text-align: center;">Seu carrinho está vazio</p>';
        } else {
            cartItems.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.textContent = `${index + 1}. ${item}`;
                cartItemsContainer.appendChild(itemElement);
            });
        }
    }

    function toggleCartMenu() {
        const menu = document.getElementById('cartMenu');
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }
    
    function toggleProfileMenu() {
        const menu = document.getElementById('profileMenu');
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }
    
    // Fecha os menus se clicar fora
    window.onclick = function(event) {
        if (!event.target.closest('.cart-container')) {
            document.getElementById('cartMenu').style.display = 'none';
        }
        if (!event.target.closest('.profile-container')) {
            document.getElementById('profileMenu').style.display = 'none';
        }
    }













    var taxRate = 0.05; // Taxa de 5%
    var shippingRate = 15.00; // Taxa fixa de envio
    var fadeTime = 300; // Tempo de animação em ms
    
    function recalculateCart() {
      var subtotal = 0;
    
      $('.product').each(function() {
        subtotal += parseFloat($(this).find('.product-line-price').text());
      });
    
      var tax = subtotal * taxRate;
      var shipping = (subtotal > 0 ? shippingRate : 0);
      var total = subtotal + tax + shipping;
    
      $('.totals-value').fadeOut(fadeTime, function() {
        $('#cart-subtotal').text(subtotal.toFixed(2));
        $('#cart-tax').text(tax.toFixed(2));
        $('#cart-shipping').text(shipping.toFixed(2));
        $('#cart-total').text(total.toFixed(2));
    
        if (total == 0) {
          $('.checkout').fadeOut(fadeTime);
        } else {
          $('.checkout').fadeIn(fadeTime);
        }
        $('.totals-value').fadeIn(fadeTime);
      });
    }
    
    function updateQuantity(quantityInput) {
      var productRow = $(quantityInput).closest('.product');
      var price = parseFloat(productRow.find('.product-price').text());
      var quantity = $(quantityInput).val();
      var linePrice = price * quantity;
    
      productRow.find('.product-line-price').fadeOut(fadeTime, function() {
        $(this).text(linePrice.toFixed(2));
        recalculateCart();
        $(this).fadeIn(fadeTime);
      });
    }
    
    function removeItem(removeButton) {
      var productRow = $(removeButton).closest('.product');
      productRow.slideUp(fadeTime, function() {
        productRow.remove();
        recalculateCart();
      });
    }
    