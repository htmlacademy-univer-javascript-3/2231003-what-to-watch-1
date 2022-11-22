import React, {useEffect, useRef} from 'react';
import type {Film} from '../../types/film';

type Props = {
  film: Film;
  isPlay: boolean;
}

const Player: React.FC<Props> = (props) => {
  const {film, isPlay} = props;
  const playerRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (playerRef === null){
      return;
    }
    if (isPlay){
      playerRef.current?.play();
    }
    else {
      playerRef.current?.load();
    }

  },[isPlay]);

  return <video ref={playerRef} width="280" height="175" src={film.videoLink} poster={film.previewImage} muted={true}/>;
}
export default Player;
