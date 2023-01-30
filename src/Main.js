import React, { useState, useEffect }  from 'react';
import SearchBox from "./SearchBox";
import Maps from "./Maps";

const Main = () => {

    const [selectPosition, setSelectPosition] = useState(null);
    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 1200px)").matches
      )

    useEffect(() => {
        window
        .matchMedia("(max-width: 1200px)")
        .addEventListener('change', e => setMatches( e.matches ));
    }, []);

  return (
    <>
      {!matches && 
      <div className="main-container">
        <div className="info-cont">
          <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition}/>
        </div>
        <div className="map-cont">
          <Maps selectPosition={selectPosition} />
        </div>
      </div>}
      {matches && 
      <div className="main-container">
        <div className="map-cont">
          <Maps selectPosition={selectPosition} />
        </div>
        <div className="info-cont">
          <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition}/>
        </div>
      </div>}
      <style>{`
        .main-container{
          display: flex;
          width: 99vw;
          height: 99vh;
        }
        .info-cont{
          width: 40vw;
          padding: 20px;
        }
        .map-cont{
          height: 100%;
          width: 60vw;
        }
        @media only screen and (max-width: 1200px){
            .main-container{
                flex-direction: column;
            }
            .info-cont{
                width: 100%;
            }
            .map-cont{
                height: 80%;
                width: 100%;
            }
        }
          `}
      </style>
    </>
  )
}

export default Main