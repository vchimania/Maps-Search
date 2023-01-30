import React from 'react'

const PlaceInfo = (props) => {

const {selectPosition} = props;
const date = selectPosition?.extratags['population:date'];
const pop = selectPosition?.extratags?.population

const getYear = () => {
    if(date) return `(${new Date(date).getFullYear()})`
    return ""
}

const getPop = () => {
    if(pop) return pop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return "No Data"
}

const shareFunc = () => {
    navigator.clipboard.writeText(window.location.href)
    alert(`link copied`)
}

  return (
    <>
        <div className="info">
            <div className="info-card">
                <span className="city">{selectPosition?.display_name.split(" ")[0].replace(/,/g, '')}</span>
                <div className="metric">
                    <label>Population</label>
                    <span>{getPop() + ' ' + getYear()}</span>
                </div>
                <button
                    className="share"
                    onClick={() => shareFunc()}
                >
                    Share
                </button>
            </div>
        </div>
        <style>{`
            .info{
                padding: 30px;
                background-color: #9bedd5;
                margin: 40px 0 20px 0;
                border-radius: 16px;
            }
            .info-card{
                height: 100%;
                width: 100%;
                backdrop-filter: blur(16px) saturate(180%);
                -webkit-backdrop-filter: blur(16px) saturate(180%);
                background-color: rgba(255, 255, 255, 0.75);
                border-radius: 12px;
                border: 1px solid rgba(209, 213, 219, 0.3);
                padding: 20px 30px;
                display: flex;
                flex-direction: column;
                color: #1C9B75;
            }
            .city{
                width: 100%;
                font-size: 50px;
                font-weight: 800;
            }
            .metric{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 20px 0;
            }
            .metric label{
                font-size: 40px;
            }
            .metric span{
                height: 100%;
                display: flex;
                align-items: center;
                font-size: 35px;
            }
            .share {
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
                width: 48px;
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
                padding: 20px 40px;
                align-self: flex-end;
                margin: 40px 0 0 0;
            }
            .share:focus {
                box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
            }
            .share:hover {
                box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
                transform: translateY(-2px);
            }
            .share:active {
                box-shadow: #3c4fe0 0 3px 7px inset;
                transform: translateY(2px);
            }
            @media only screen and (max-width: 1200px){
                .city{
                    font-size: 30px;
                }
                .metric label{
                    font-size: 20px;
                }
                .metric span{
                    height: 100%;
                    display: flex;
                    align-items: center;
                    font-size: 15px;
                }
                .share{
                    margin: 15px 0 0 0;
                    padding: 15px 40px;
                }
            }
        `}
        </style>
    </>
  )
}

export default PlaceInfo