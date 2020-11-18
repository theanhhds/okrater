import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { faTshirt, faHatCowboy, faUserTie, faCircle } from '@fortawesome/free-solid-svg-icons';
import Tag from './Tag';

function List(props){

    const [category, setCategory] = useState(props.category);
    const [productIcon, setProductIcon] = useState();
    const [data, setData] = useState([]);
    const [isReady, setIsReady] = useState(false);

    useEffect(()=>{
        if (props.list){
            // console.log("props.list runs");
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
        }
    }, [props.list]);


    const [hasMore, setHasMore] = useState(true);
    const [toList, setToList] = useState(data.slice(0, 20));
    const [point, setPoint] = useState(20);
    
    const getMoreData = () => {
        if ((toList.length === data.length) && isReady){
            setHasMore(false);
            return;
        }

        if (isReady)
        {
            setTimeout(()=>{
                setToList(data.slice(0, point + 20));
                setPoint((prev) => (prev + 20));                
            }, 500);
        }
    }

    const checkAvailability = (id, manu) =>{
        let avail_list_by_manu = props.avail[manu];
        avail_list_by_manu.forEach((item, index)=>{
            if (id.toUpperCase() == item.id)
                alert(item.DATAPAYLOAD.slice(31, -31));
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
            >
                {
                    toList.map((item, index) => {
                        return (
                            <Tag index={index} productIcon={productIcon} item={item} checkAvailability={checkAvailability}/>
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
        avail: state.products.availability_list
    }
}

export default connect(mapStateToProps, null)(List);