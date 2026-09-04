import type { CSSProperties } from "react";

const firstName = 'dwnlx';
const lastName = 'developer';

const favoriteGames = [
  'The Witcher 3',
  'The Elder Scrolls V: Skyrim',
  'The Last of Us',
  'The Witcher 3',
  'The Elder Scrolls V: Skyrim',
  'The Last of Us',
];

const isDeveloper = true;
const address = {
  street: '123 Main St',
  city: 'Anytown',
  state: 'CA',
  zip: '12345',
};


const myStyles: CSSProperties = {
  color: 'red',
  fontSize: '20px',
  fontWeight: 'bold',
  backgroundColor: isDeveloper ? 'black' : 'white',
};

export function MyAwesomeApp() {

  return (
    <div>
      <h1 data-testid="first-name-tittle">My Awesome App</h1>
      <h3>
        My name is {firstName} {lastName}
      </h3>
      <p className="mi-clase-css">I am a software engineer</p>
      <p>My favorite games are { favoriteGames.join(', ') }</p>
      <p>My age is { 17 + 18 }</p>
      <p>I am a developer: { isDeveloper ? 'Yes' : 'No' }</p>
      <p>My address is { address.street }, { address.city }, { address.state }, { address.zip }</p>
      <p style={myStyles}>My address is { `${address.street}, ${address.city}, ${address.state}, ${address.zip}` }</p>
    </div>
  );


}
