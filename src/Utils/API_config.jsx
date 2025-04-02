import Cookies from "js-cookie";


export const live_url = `http://3.110.244.96:8000/api/v1/`

export const API_url = {
    Register: `${live_url}user/register`,
    Login: `${live_url}user/login`,
    Address: `${live_url}user/address`,
    Get_Data: `${live_url}product/get`,
    Get_Cart_data: `${live_url}product/cart`,
    AddCard: `${live_url}product/addCart`,
    RemoveCard: `${live_url}product/removeCart`,
    ReduceQuantity: `${live_url}product/reduceqt`,
    Create_checkout: `${live_url}checkout/checkout`,
}

const token = Cookies.get("Access_token")


export const PostAPI = async (Url, data) => {
    const token = Cookies.get("Access_token"); // Get latest token
    const myHeaders = new Headers();
    if (token) {
        myHeaders.append("Authorization", `Bearer ${token}`);
    }

    const requestOptions = {
        method: "POST",
        body: data,
        headers: myHeaders,
        redirect: "follow",
    };

    const response = await fetch(Url, requestOptions);
    return await response.json();
};

export const GetAPI = async (Url) => {
    const token = Cookies.get("Access_token"); // Get latest token
    const myHeaders = new Headers();
    if (token) {
        myHeaders.append("Authorization", `Bearer ${token}`);
    }

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    const response = await fetch(Url, requestOptions);
    return await response.json();
};
