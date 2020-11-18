import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { faTshirt, faHatCowboy, faUserTie, faCircle } from '@fortawesome/free-solid-svg-icons';
import Tag from './Tag';
import axios from 'axios';

function List(props){

    const [category, setCategory] = useState(props.category);
    const [productIcon, setProductIcon] = useState();
    const [data, setData] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const [availableBtn, setAvailableBtn] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [toList, setToList] = useState(data.slice(0, 20));
    const [point, setPoint] = useState(20);

    //Run when props.list change. Re-initialize state
    useEffect(()=>{
        if (props.list){
            setCategory(props.category);
            setData(props.list.slice());
            setPoint(20);
            setToList(props.list.slice(0, 20));
            setIsReady(true);
            setHasMore(true);
            if (props.category == "jackets")
                setProductIcon(faUserTie);
            else if (props.category == "shirts")
                setProductIcon(faTshirt);
            else
                setProductIcon(faHatCowboy);

            //Set available buttons
            let i, newBtnArray = new Array();
            for (i=0; i<20; i++){
                newBtnArray.push("Check availability");
            }
            setAvailableBtn(newBtnArray);
        }
    }, [props.list]);

    const getMoreData = () => {
        if ((toList.length === data.length) && isReady){
            setHasMore(false);
            return;
        }
        if (isReady){
            setTimeout(()=>{
                setToList(data.slice(0, point + 20));
                let i, newBtnArray = availableBtn.slice();
                for (i=point+1; i<point+20; i++){
                    newBtnArray.push("Check availability");
                }
                setAvailableBtn(newBtnArray);
                setPoint((prev) => (prev + 20));
            }, 500);
        }
    }

    const checkAvailability = (id, manu, listIndex) =>{
        let newBtnArray = availableBtn.slice();
        newBtnArray[listIndex] = "Checking...";
        setAvailableBtn(newBtnArray);
        axios({
            url: "http://bad-api-assignment.reaktor.com/availability/"+manu,
            headers: {
                'Content-Type': 'application/json',
                // 'x-force-error-mode': 'all'
            },
        }).then(result => {return result.data}).then(data=>{
            let avail = data.response;
            if (typeof avail == "string"){
                //alert("NO INFORMATION. TRY TO FETCH AGAIN");
                let newBtnArray = availableBtn.slice();
                newBtnArray[listIndex] = "ERROR. CLICK TO TRY AGAIN";
                setAvailableBtn(newBtnArray);
            }
            else{
                avail.forEach((item, index) => {
                    if (item.id == id.toUpperCase()){
                        let newBtnArray = availableBtn.slice();
                        newBtnArray[listIndex] = item.DATAPAYLOAD.slice(31, -31);
                        setAvailableBtn(newBtnArray);
                    }
                });
            }
        });
    }

    return (
        <div className="w3-content">
        <h1 className="w3-center">{category.toUpperCase()}</h1>
            <InfiniteScroll
                pageStart={0}
                loadMore={getMoreData}
                hasMore={hasMore}
                loader={<h2 className="w3-center">Loading...</h2>}
                threshold={100}
            >
                {
                    toList.map((item, index) => {
                        return (
                            <Tag 
                                index={index} 
                                btnText={availableBtn[index]} 
                                productIcon={productIcon} 
                                item={item} 
                                checkAvailability={checkAvailability}
                            />
                        );
                    })
                }
            </InfiniteScroll>
        </div>
    );
    }

const mapStateToProps = (state, ownProps) => {
    const category = ownProps.category;
    return{
        list: state.products.products_list[category],
    }
}

export default connect(mapStateToProps, null)(List);