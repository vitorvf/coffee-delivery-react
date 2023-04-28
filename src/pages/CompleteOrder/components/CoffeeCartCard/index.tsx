import { QuantityInput } from "../../../../components/QuantityInput";
import { RegularText } from "../../../../components/Typography";
import {
  ActionsContainer,
  CoffeeCartCardContainer,
  RemoveButton,
} from "./styles";
import { Trash } from "phosphor-react";
import { formatMoney } from "../../../../utils/formatMoney";
import { useContext } from "react";
import { CartContext, CartItem } from "../../../../contexts/CartContext";

interface CoffeeCartCardProps {
  coffee: CartItem;
}



export function CoffeeCartCard({ coffee }: CoffeeCartCardProps) {


  const coffeeTotal = coffee.price * coffee.quantity;
  
  const formattedPrice = formatMoney(coffeeTotal);
  const { cartItems, removeItem, changeCartItemQuantity,  } = useContext(CartContext);

  
  function handleIncrease() {
    changeCartItemQuantity(coffee.id, +1)

  }

  function handleonDecrease() {
    changeCartItemQuantity(coffee.id, -1)
    
  }

  function handleRemoveItem() {
    removeItem(coffee.id);

  }
  // console.log(coffee.price * coffee.quantity)

  return (
    <CoffeeCartCardContainer>
      <div>
        <img src={`/coffees/${coffee.photo}`} />
        <div>
          <RegularText color="subtitle">{coffee.name}</RegularText>
          <ActionsContainer>
            <QuantityInput
              onIncrease={handleIncrease}
              onDecrease={handleonDecrease}
              quantity={coffee.quantity}
              size="small"
            />
            <RemoveButton onClick={handleRemoveItem} type="button">
              <Trash size={16} />
              REMOVER
            </RemoveButton>
          </ActionsContainer>
        </div>
      </div>

      <p>R$ {formattedPrice}</p>
   
    </CoffeeCartCardContainer>
  );
}
