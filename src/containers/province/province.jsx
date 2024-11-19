import React, { useState, useEffect } from 'react';
import { callAPI, callApiDistrict, callApiWard, host } from './province.js'; 

function Province() {
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [result, setResult] = useState('');

    useEffect(() => {
        callAPI('https://provinces.open-api.vn/api/?depth=1');
    }, []);

    const handleProvinceChange = (event) => {
        setProvince(event.target.value);
        callApiDistrict(host + 'p/' + event.target.value + '?depth=2');
    };

    const handleDistrictChange = (event) => {
        setDistrict(event.target.value);
        callApiWard(host + 'd/' + event.target.value + '?depth=2');
    };

    const handleWardChange = (event) => {
        setWard(event.target.value);
        setResult(province + ' | ' + district + ' | ' + ward);
    };

    return (
        <div>
            <select id="province" value={province} onChange={handleProvinceChange}>
                {/* Render danh sách tỉnh */}
            </select>
            <select id="district" value={district} onChange={handleDistrictChange}>
                {/* Render danh sách quận/huyện */}
            </select>
            <select id="ward" value={ward} onChange={handleWardChange}>
                {/* Render danh sách phường/xã */}
            </select>
            <div id="result">{result}</div>
        </div>
    );
}

export default Province;