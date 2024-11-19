import axios from 'axios';
import React, { useEffect } from 'react';

const host = "https://provinces.open-api.vn/api/";

var callAPI = (api) => {
    return axios.get(api)
        .then((response) => {
            renderData(response.data, "province");
        });
}
callAPI('https://provinces.open-api.vn/api/?depth=1');

var callApiDistrict = (api) => {
    return axios.get(api)
        .then((response) => {
            renderData(response.data.districts, "district");
        });
}

var callApiWard = (api) => {
    return axios.get(api)
        .then((response) => {
            renderData(response.data.wards, "ward");
        });
}

var renderData = (array, select) => {
    const selectElement = document.querySelector("#" + select);

    if (selectElement) { // Kiểm tra xem element có tồn tại hay không
        selectElement.innerHTML = ''; // Xóa hết các option cũ

        // Thêm option mặc định
        let defaultOption = document.createElement('option');
        defaultOption.value = '';
        if (select === 'province') {
            defaultOption.text = 'Tỉnh/TP';
        } else if (select === 'district') {
            defaultOption.text = 'Quận/Huyện';
        } else {
            defaultOption.text = 'Phường/Xã';
        }
        selectElement.appendChild(defaultOption);

        // Thêm các option từ API
        array.forEach(element => {
            let option = document.createElement('option');
            option.value = element.code;
            option.text = element.name;
            selectElement.appendChild(option);
        });
    }
}


export { callAPI, callApiDistrict, callApiWard, host };