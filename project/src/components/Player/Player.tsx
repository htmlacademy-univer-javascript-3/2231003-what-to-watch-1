import React, {useEffect, useRef} from 'react';
import type {Film} from '../../types/film';

type Props = {
  film: Film;
  isPlaying: boolean;
}

const Player: React.FC<Props> = (props) => {
  const {film, isPlaying} = props;
  const playerRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!playerRef){
      return;
    }
    if (isPlaying){
      playerRef.current?.play();
    }
    else {
      playerRef.current?.load();
    }

  },[isPlaying]);

  return <video ref={playerRef} width="280" height="175" src={film.videoLink} poster={film.previewImage} muted={true}/>;
}
export default Player;
