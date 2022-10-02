import MainScreen from '../../pages/main-screen/main-screen';

type PromoFilmInfo = {
  name: string,
  genre: string,
  releaseDate: number,
}

function App(promoFilmInfo: PromoFilmInfo): JSX.Element {
  return (<MainScreen promoFilmInfo={promoFilmInfo}/>);
}

export default App;
export type {PromoFilmInfo};

