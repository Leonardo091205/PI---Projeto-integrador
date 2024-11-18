// Importando os módulos do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"; // Importando funções do Firestore
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCPPkSsGHBLRFYmnacuxVf5Nu4hagR2DnU",
  authDomain: "projeto-integrador-a2413.firebaseapp.com",
  projectId: "projeto-integrador-a2413",
  storageBucket: "projeto-integrador-a2413.firebasestorage.app",
  messagingSenderId: "1083151463445",
  appId: "1:1083151463445:web:93082b9e22076d0e550a1c",
  measurementId: "G-10011GNSG5"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Inicializando o Firestore
const analytics = getAnalytics(app);

// Função para adicionar produto
async function adicionarProduto() {
  const produto = {
    nome: "Processador Intel i9",
    imagem: "https://link_para_imagem.com",
    valor: 3500,
    descricao: "Processador Intel i9 de 10ª geração, 8 núcleos e 16 threads."
  };

  try {
    const docRef = await addDoc(collection(db, "Categorias", "Processadores", "Produtos"), produto);
    console.log("Produto adicionado com ID: ", docRef.id);
  } catch (error) {
    console.error("Erro ao adicionar produto: ", error);
  }
}

// Exemplo de chamada da função (você pode chamá-la ao clicar em um botão)
// adicionarProduto(); // Descomente se quiser adicionar um produto
 
async function loadFeaturedProducts() {
  const featuredProductsContainer = document.getElementById('featured-products-container');

  // Acessando a coleção 'Produtos' dentro da categoria 'Processadores' no Firestore
  const querySnapshot = await getDocs(collection(db, "Destaques"));

  // Para cada produto, criamos um card HTML
  querySnapshot.forEach((doc) => {
    const product = doc.data();
    
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    
    // Adicionando conteúdo do produto ao card
    productCard.innerHTML = `
      <img src="${product.imagem}" alt="${product.nome}" class="product-image">
      <h3 class="product-title">${product.nome}</h3>
      <p class="product-price">R$ ${product.valor}</p>
      <p class="product-description">${product.descricao}</p>
      <button class="add-to-cart">
<div class="default">Adicionar ao carrinho</div>
<div class="success">Adicionado</div>
<div class="cart">
  <div>
      <div></div>
      <div></div>
  </div>
</div>
<div class="dots"></div>
</button>

    `;
  
    
    // Inserindo o card no container de produtos
    featuredProductsContainer.appendChild(productCard);
      
      // Adicionando o eventListener ao botão de adicionar ao carrinho
      
      const addToCartButton = productCard.querySelector('.add-to-cart');
      addToCartButton.addEventListener('click', () => {
          addToCartButton.classList.toggle('added');
          
            addItemToCart(product); 
  

      // Remove o estado "Adicionado" após um tempo
      setTimeout(() => {
          addToCartButton.classList.remove('added');
      }, 3000);
  });
});
}
  
window.onload = loadFeaturedProducts;