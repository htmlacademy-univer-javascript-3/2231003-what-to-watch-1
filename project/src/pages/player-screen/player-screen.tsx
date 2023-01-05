import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import Load from '../../components/load/load';
import {fetchFilmAction} from '../../store/api-actions';
import {getFilm} from '../../store/film-data/selector';
import NotFoundScreen from '../not-found-screen/not-found-screen';

const PlayerScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const navigate = useNavigate();
  const {id} = useParams();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    dispatch(fetchFilmAction(id))

    if (videoRef.current === null) {
      return;
    }

    videoRef.current?.addEventListener('loadeddata', () => setIsLoading(false));

    if (!isPlaying) {
      videoRef.current.load();
    }
  }, [id])

  if (film === undefined) {
    return <NotFoundScreen/>;
  }

  const handleFullScreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current?.requestFullscreen()
    }
  };
  const getFormatPlayTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    let format = date.toISOString().slice(11, 19).toString();
    if (format.startsWith('00')) {
      format = format.substring(3);
    }
    return `-${format}`;
  }
  const handlePlayClick = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  };
  const handleProgressBar = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    if (isNaN(e.target.duration))
      return;
    setProgress((e.target.currentTime / e.target.duration) * 100);
    if (videoRef.current)
      setTimeLeft(Math.trunc(videoRef.current.duration - videoRef.current.currentTime));

  };

  return (
    <div className="player">
      <video
        src={film?.videoLink}
        className="player__video"
        poster={film?.posterImage}
        ref={videoRef}
        onDoubleClick={handleFullScreen}
        onTimeUpdate={(event) => handleProgressBar(event)}
      />
      {isLoading && <Load/>}
      <button type="button" className="player__exit" onClick={() => navigate('/')}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"/>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getFormatPlayTime(timeLeft)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handlePlayClick}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"/>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen" onClick={handleFullScreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"/>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerScreen;
