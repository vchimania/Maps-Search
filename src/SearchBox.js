import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import PlaceInfo from './PlaceInfo';
import Recents from './Recents';
import { useSearchParams, useLocation } from 'react-router-dom';

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export default function SearchBox(props) {
  const { selectPosition, setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [load, setLoad] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [noAdmin, setNoAdmin] = useState(false);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const query = searchParams.get("query");
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    if(query){
      searchFunction(query);
    }
  }, [query]);

  const checkRecents = () => {
    let recent = localStorage.getItem("RECENTS");
    if(recent) return true;
    return false;
  }

  const searchFunction = (item) => {
    setLoad(true);
    // resetting search list after list item clicked
    setListPlace([])

    //Building params for API call
    const params = {
      q: item ? item : searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 1,
      extratags:1
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    //API call - nominatim
    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let res = JSON.parse(result)
        res.map(i => {
          if(i.type === "administrative"){
            setListPlace(listPlace => [...listPlace, i]);
            setNoAdmin(false)
          } else {
            setLoad(false);
            setNoAdmin(true)
          }
        })
        setLoad(false);
        setShowOptions(true);
      })
      .catch((err) => console.log("err: ", err));

      // Recents localStorage logic
      let existing_recents = JSON.parse(localStorage.getItem("RECENTS"));
      if(existing_recents == null) existing_recents = [];
      existing_recents = [...existing_recents, searchText];
      let no_duplicates = Array.from(new Set(existing_recents));
      let clean_arr = no_duplicates.filter(i => i)
      localStorage.setItem("RECENTS", JSON.stringify(clean_arr));
  }

  useEffect(() => {
    //clear query param and list on page reload
    searchParam.delete('query');
    setSearchParam(searchParam);
    setListPlace([])
  },[])

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }} className="field">
            <input
              placeholder={"Enter Location"}
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value)
              }}
            />
          </div>
          <div
            style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
          >
            <button
              className="search"
              onClick={() => {searchFunction()}}
            >
              Search
            </button>
          </div>
        </div>
        <div className="list">
          {(!load && showOptions) ? 
          <List component="nav" aria-label="main mailbox folders">
            {listPlace.map((item) => {
              return (
                <div key={item?.place_id}>
                  <ListItem
                    button
                    onClick={() => {
                      setSelectPosition(item);
                      setShowOptions(false);
                    }}
                  >
                    <ListItemIcon>
                      <img
                        src="./placeholder.png"
                        alt="Placeholder"
                        style={{ width: 38, height: 38 }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={item?.display_name} />
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List> : (!load && !showOptions) ? 
          <PlaceInfo selectPosition={selectPosition} /> :
          <div className="load"><div></div><div></div><div></div><div></div></div>
          }
          {(noAdmin && !load && listPlace.length === 0) && (<><h3>No Administrative Boundary found.</h3></>)}
          {checkRecents() && <Recents selectPosition={selectPosition} />}
        </div>
      </div>
      <style>{`
      .field input {
        width: 100%;
        height: 56px;
        position: relative;
        padding: 0px 16px;
        font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: normal;
        background: rgba( 255, 255, 255, 0.25 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 1.5px );
        -webkit-backdrop-filter: blur( 1.5px );
        border-radius: 10px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
      }
      .field input:focus {
        outline: none;
      }
      .load {
        display: inline-block;
        position: relative;
        padding: 100px 320px;     
      }
      .load div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 40px;
        height: 40px;
        margin: 8px;
        border: 8px solid #fff;
        border-radius: 50%;
        animation: load 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #000 transparent transparent transparent;
      }
      .load div:nth-child(1) {
        animation-delay: -0.45s;        
      }
      .load div:nth-child(2) {
        animation-delay: -0.3s;        
      }
      .load div:nth-child(3) {
        animation-delay: -0.15s;        
      }
      @keyframes load {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .search {
        align-items: center;
        appearance: none;
        background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
        border: 0;
        border-radius: 6px;
        box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: inline-flex;
        font-family: "JetBrains Mono",monospace;
        height: 48px;
        justify-content: center;
        line-height: 1;
        list-style: none;
        overflow: hidden;
        padding-left: 16px;
        padding-right: 16px;
        position: relative;
        text-align: left;
        text-decoration: none;
        transition: box-shadow .15s,transform .15s;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        white-space: nowrap;
        will-change: box-shadow,transform;
        font-size: 18px;
      }
      .search:focus {
        box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
      }
      .search:hover {
        box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
        transform: translateY(-2px);
      }
      .search:active {
        box-shadow: #3c4fe0 0 3px 7px inset;
        transform: translateY(2px);
      }  
      .list{
        height: 90vh;
        display: flex;
        flex-direction: column;
        position: relative;
      }  
      @media only screen and (max-width: 1200px){
          .load {
            padding: 100px 120px;     
          }
        }  
          `}
      </style>
    </>
  );
}