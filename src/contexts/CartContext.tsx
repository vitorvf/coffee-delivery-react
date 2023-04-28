import { createContext, ReactNode, useEffect, useState } from "react";
import { Coffee } from "../pages/Home/components/CoffeeCard";

export interface CartItem extends Coffee {
  quantity: number;

}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (coffee: Coffee, quantity: number) => void;
  removeItem: (itemId: number) => void;
  changeCartItemQuantity: (id: number, quantityModifier:number) => void;
  totalPrice: number;
  entrega:number


}

interface CartContextProviderProps {
  children: ReactNode;
}


export const CartContext = createContext({} as CartContextType);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const COFFEE_ITEMS_STORAGE_KEY = "coffeeDelivery:cartItems";
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = localStorage.getItem(COFFEE_ITEMS_STORAGE_KEY)

    if(storedCartItems){
      return JSON.parse(storedCartItems)
    }
    return[]
  });



  const cartQuantity = cartItems.length;

  const totalPrice = cartItems.reduce((total, item ) => {
    return total + item.price * item.quantity;
  }, 0);

  const entrega =  +  3.90
  

   


  function addToCart(coffee: Coffee, quantity: number) {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === coffee.id
    );
    
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];

      updatedCartItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    
    } else {
      setCartItems([...cartItems, { ...coffee, quantity }]);
    }
   

  }

  const removeItem = (id:number) => {
    const filteredItems = cartItems.filter((item) => item.id !== id);
    setCartItems(filteredItems);
  };

  function changeCartItemQuantity(id: number, quantityModifier: number) {
    //Verifica se o ID do Coffee.id é igual ao id fornecido, no click.
    const coffeeIndex = cartItems.findIndex(coffee => coffee.id === id);
    
    
    // Se o Coffeindex for igual a -1 o café ainda não está no carrinho não existe nada., adicione-o com a quantidade fornecida
    if (coffeeIndex === -1) {
      
       // aqui ele retorna no Coffe o id do objeto que for igual ao ID Clicado
     const coffee = cartItems.find(coffee => coffee.id === id);
    
        //Aqui se o Coffe for positivo, ele passa no SetCartItems um spread com todo resto de CartItems + todo resto que tem em coffe, e adiciona q quantitdade 1 como padrão
        if (coffee) {
          setCartItems([...cartItems, { ...coffee, quantity: 1 }]);
        }

      } 
      //Se o coffeIndex nao for igual a -1 é porque ja existe um item no carrinho
      else {
        //Aqui ele pega o UpdateCart e passa um spread criando uma copia do CartITems
        const updatedCart = [...cartItems];
        //entao nessa linha o UpdateCart recebe o mesmo updateCart, só que com o ??  passando o 0 como valor padrao, e o  + Quantiymodifier que altera o valor
        updatedCart[coffeeIndex].quantity = (updatedCart[coffeeIndex].quantity ?? 0) + quantityModifier;
        //E aqui ele atualiza o CartITems com o novo valor que é o UpdateCart, que no caso é uma copia do CartItems com alterações
        setCartItems(updatedCart);
    }
  }

   useEffect(() => {
    localStorage.setItem(COFFEE_ITEMS_STORAGE_KEY, JSON.stringify(cartItems))
   }, [cartItems])
  


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeItem, changeCartItemQuantity, totalPrice, entrega }}>
      {children}
    </CartContext.Provider>
  );
}
