import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchFilmAction} from '../../store/api-actions';
import {getFilm, isFilmLoading} from '../../store/film-data/selector';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Load from "../../components/load/load";

const getFormatTime = (seconds: number) => {
  let result = new Date(seconds * 1000).toISOString().slice(11, 19).toString();
  if (result.startsWith('00')) {
    result = result.substring(3);
  }
  return `-${result}`;
};
function GetLoader() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: 'auto' }}
      width="200"
      height="200"
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
    >
      <rect width="6" height="12" x="47" y="24" fill="#080607" rx="3" ry="6">
        <animate
          attributeName="opacity"
          begin="-0.9166666666666666s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        >
        </animate>
      </rect>
      <rect
        width="6"
        height="12"
        x="47"
        y="24"
        fill="#080607"
        rx="3"
        ry="6"
        transform="rotate(30 50 50)"
      >
        <animate
          attributeName="opacity"
          begin="-0.8333333333333334s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        >
        </animate>
      </rect>
      <rect
        width="6"
        height="12"
        x="47"
        y="24"
        fill="#080607"
        rx="3"
        ry="6"
        transform="rotate(60 50 50)"
      >
        <animate
          attributeName="opacity"
          begin="-0.75s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        >
        </animate>
      </rect>
      <rect
        width="6"
        height="12"
        x="47"
        y="24"
        fill="#080607"
        rx="3"
        ry="6"
        transform="rotate(90 50 50)"
      >
        <animate
          attributeName="opacity"
          begin="-0.6666666666666666s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        >
        </animate>
      </rect>
      <rect
        width="6"
        height="12"
        x="47"
        y="24"
        fill="#080607"
        rx="3"
        ry="6"
        transform="rotate(120 50 50)"
      >
        <animate
          attributeName="opacity"
          begin="-0.5833333333333334s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        >
        </animate>
      </rect>
      <rect
        width="6"
        height="12"
        x="47"
        y="24"
        fill="#080607"
        rx="3"
        ry="6"
        transform="rotate(150 50 50)"
      >
        <animate
          attributeName="opacity"
          begin="-0.5s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        >
        </animate>
      </rect>
      <rect
        width="6"
        height="12"
        x="47"
        y="24"
        fill="#080607"
        rx="3"
        ry="6"
        transform="rotate(180 50 50)"
      >
        <animate
          attributeName="opacity"
          begin="-0.4166666666666667s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        >
        </animate>
      </rect>
      <rect
        width="6"
        height="12"
        x="47"
        y="24"
        fill="#080607"
        rx="3"
        ry="6"
        transform="rotate(210 50 50)"
      >
        <animate
          attributeName="opacity"
          begin="-0.3333333333333333s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        >
        </animate>
      </rect>
      <rect
        width="6"
        height="12"
        x="47"
        y="24"
        fill="#080607"
        rx="3"
        ry="6"
        transform="rotate(240 50 50)"
      >
        <animate
          attributeName="opacity"
          begin="-0.25s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        >
        </animate>
      </rect>
      <rect
        width="6"
        height="12"
        x="47"
        y="24"
        fill="#080607"
        rx="3"
        ry="6"
        transform="rotate(270 50 50)"
      >
        <animate
          attributeName="opacity"
          begin="-0.16666666666666666s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        >
        </animate>
      </rect>
      <rect
        width="6"
        height="12"
        x="47"
        y="24"
        fill="#080607"
        rx="3"
        ry="6"
        transform="rotate(300 50 50)"
      >
        <animate
          attributeName="opacity"
          begin="-0.08333333333333333s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        >
        </animate>
      </rect>
      <rect
        width="6"
        height="12"
        x="47"
        y="24"
        fill="#080607"
        rx="3"
        ry="6"
        transform="rotate(330 50 50)"
      >
        <animate
          attributeName="opacity"
          begin="0s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        >
        </animate>
      </rect>
    </svg>
  );
}

const PlayerScreen: React.FC = () => {
  const {id} = useParams();
  useEffect(() => {
    dispatch(fetchFilmAction(id));

    if (videoRef.current === null) {
      return;
    }

    videoRef.current?.addEventListener('loadeddata', () => setIsLoading(false));

    if (!isPlaying) {
      videoRef.current.load();
    }
  }, [id]);

  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const filmMovieLoading = useAppSelector(isFilmLoading);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (film === undefined && !filmMovieLoading) {
    return <NotFoundScreen/>;
  }
  const handleProgressBar = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const target = (e.target as HTMLVideoElement);
    if (isNaN(target.duration)) {
      return;
    }
    setProgress((target.currentTime / target.duration) * 100);
    if (videoRef.current) {
      setTimeLeft(Math.trunc(videoRef.current.duration - videoRef.current.currentTime));
    }
  };
  const handleFullScreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current?.requestFullscreen();
    }
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
      <button type="button" className="player__exit" onClick={() => navigate('/')}>Exit</button>
      {isLoading && GetLoader()}

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"/>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getFormatTime(timeLeft)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick=
            {
              () => {
                if (videoRef.current?.paused) {
                  videoRef.current?.play();
                  setIsPlaying(true);
                } else {
                  videoRef.current?.pause();
                  setIsPlaying(false);
                }
              }
            }
          >
            {isPlaying ?
              <>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#pause"/>
                </svg>
                <span>Pause</span>
              </>
              :
              <>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"/>
                </svg>
                <span>Play</span>
              </>}
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
