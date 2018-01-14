import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

const ExpenseListItem = (props) => (
    <Link className='list-item' to={`/edit/${props.id}`}>
        <div>
            <h3 className='list-item__title' >{props.description}</h3>
            <span className='list-item__subtitle' >{moment(props.createdAt).format('DD MMMM YYYY')}</span>    
        </div>
        <h3 className='list-item__data' >{numeral(props.amount / 100).format('$0,0.00')}</h3>
    </Link>
);

export default ExpenseListItem;