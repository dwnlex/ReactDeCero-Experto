import ItemCounter from './shopping-cart/ItemCounter';

interface ItemInCart {
  productName: string;
  quantity: number;
}

const itemInCart: ItemInCart[] = [
  { productName: 'Nintendo Switch 2', quantity: 1 },
  { productName: 'Pro Controller', quantity: 3 },
  { productName: 'Súper Smash', quantity: 5 },
];

export function FirstStepsApp() {
  return (
    <>
      {/*       <h1>Hello World !!!</h1>
      <p>This is a paragraph</p>

      <button>Click me</button>

      <div>
        <h1>Hello World - 2</h1>
        <p>This is a paragraph - 2</p>
      </div> */}

      <h1>Carrito de compras online</h1>

      {itemInCart.map(({ productName, quantity }) => (
        <ItemCounter key={productName} name={productName} quantity={quantity} />
      ))}

      {/*       
      <ItemCounter name="Nintendo Switch 2" quantity={7} />
      <ItemCounter name="Pro Controller" quantity={5} />
      <ItemCounter name="Súper Smash" quantity={3} /> 
      */}
    </>
  );
}
