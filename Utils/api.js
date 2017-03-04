/**
 * Created by pajakoo on 2/24/17.
 */

import {Servers} from '../Utils/Constants'


var api = {
  getData:function () {
    //return fetch("http://omdbapi.com/?s=star&y&r=json").then((res) => res);
    //return fetch("https://79.100.190.102:8080/get/all").then((res) => res.json());
    return fetch("http://" + Servers.API_SERVER + ":" + process.env.PORT + "/users/get/all").then((res) => res.json());
  }
}
module.exports = api;
