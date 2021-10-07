import React, { useState, useEffect } from 'react';
import './filter.css';
import { getBatch } from '../../service/batch'

export default function Filter(props) {
    const [allitems, setItems] = useState([]);

    const getdata = () => {
        getBatch().then((response) => {
            const result = [];
            const map = new Map();
            for (const item of response.data) {
                if (!map.has(item.batchCategory.id)) {
                    map.set(item.batchCategory.id, true);    // set any value to Map
                    result.push({
                        id: item.batchCategory.id,
                        name: item.batchCategory.name
                    });
                }
            }
            setItems(result);
        })
    }

    useEffect(() => {
        getdata();
    }, [])
    return (
        <div className="filterDiv">
            <h2 className="titleBatch">Batches</h2>
            <div className="filters">
                <select onChange={(e) => {
                    props.onFilterChange(e.target.value);
                }} id="batch" name="Batches">
                    <option value="">All Batches</option>
                    {

                        allitems.map((item) =>
                            <option value={item.id} >{item.name}</option>
                        )
                    }
                </select>
            </div>
        </div>
    )
}
