import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

// eslint-disable-next-line consistent-return
const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [Play, setPlay] = useState(true);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    if (Play === true) {
      setTimeout(
        // eslint-disable-next-line no-unsafe-optional-chaining
        () => setIndex(index < byDateDesc?.length - 1 ? index + 1 : 0),
        5000
      );
    }
  };

  // useEffect(() => {
  nextCard();
  // });

  return (
    <div className="SlideCardList">
      {Play ? (
        <FaPauseCircle className="icon" onClick={() => setPlay(!Play)} />
      ) : (
        <FaPlayCircle className="icon" onClick={() => setPlay(!Play)} />
      )}
      <div className={Play ? "play-animation" : "pause-animation"}>
        {byDateDesc?.map((event, idx) => (
          <div
            key={event.id}
            className={
              Play
                ? `SlideCard SlideCard--${index === idx ? "display" : "hide"}
                    `
                : `SlideCard  
                          `
            }
          >
            <img src={event.cover} alt="forum" key={event.id} />
            <div key={event.title} className="SlideCard__descriptionContainer ">
              <div className="SlideCard__description" key={event.title}>
                <h3 key={event.cover}>{event.title} </h3>
                <p key={event.description}>{event.description}</p>
                <div key={event.title}>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        ))}
        <div className="SlideCard__paginationContainer">
          <div className="SlideCard__pagination" />
          {byDateDesc?.map((_, radioIdx) => (
            <input
              key={`${_.date}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
