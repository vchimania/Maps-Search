import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {useNavigate} from 'react-router-dom';

const Recents = () => {

let recents = JSON.parse(localStorage.getItem("RECENTS"))
const navigate = useNavigate();

//Send query params in url
const goTo = (item) => {
    navigate({
        pathname: '/',
        search: `?query=${item}`,
      });
}

  return (
    <>
        <div className="recents">
            <span className="heading">Recent Searches</span>
            <div className="recents-card">
            {recents ? <List component="nav" aria-label="main mailbox folders">
                {recents.map((item) => {
                return (
                    <div key={item}>
                    <ListItem
                        button
                        onClick={() => {goTo(item)}}
                    >
                        <ListItemText primary={item} />
                    </ListItem>
                    </div>
                );
                })}
            </List> : null}
            </div>
        </div>
        <style>{`
        .recents{
            height: 40vh;
            width: 100%;
            padding: 10px;
            background-color: #9bedd5;
            margin: 20px 0 0 0;
            border-radius: 16px;
            position: absolute;
            bottom: 0;
        }
        .heading{
            font-size: 30px;
            font-weight: 700;
            color: #1C9B75;
        }
        .recents-card{
            height: 85%;
            width: 100%;
            backdrop-filter: blur(16px) saturate(180%);
            -webkit-backdrop-filter: blur(16px) saturate(180%);
            background-color: rgba(255, 255, 255, 0.75);
            border-radius: 12px;
            border: 1px solid rgba(209, 213, 219, 0.3);
            padding: 10px 30px;
            display: flex;
            flex-direction: column;
            color: #1C9B75;
            overflow: auto;
        }
        @media only screen and (max-width: 1200px){
          .recents {
            position: relative;   
          }
        }
          `}
      </style>
    </>
  )
}

export default Recents