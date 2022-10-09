import MainScreen from '../../pages/main-screen/main-screen';
import type {PromoFilmInfo} from '../../types/promo-film-info';
import {PropsWithChildren} from 'react';

type Props = PropsWithChildren<{
  promoFilmInfo: PromoFilmInfo,
}>

function App(props: Props): JSX.Element {
  return (<MainScreen promoFilmInfo={props.promoFilmInfo}/>);
}

export default App;

