/**
 * Created by pajakoo on 2/24/17.
 */

import {Servers} from './Constants'


var api = {
  getData:function () {
    //return fetch("http://omdbapi.com/?s=star&y&r=json").then((res) => res);
    //return fetch("https://79.100.190.102:8080/get/all").then((res) => res.json());
    //return fetch("http://127.0.0.1:8080/users/get/all").then((res) => res.json());
    return fetch( Servers.API_SERVER_IOS + ":" + 8080 + "/users/get/all").then((res) => res.json());
  }
}
module.exports = api;
