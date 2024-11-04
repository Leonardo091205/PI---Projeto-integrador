
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