/**
 * Created by pajakoo on 2/24/17.
 */



var api = {
  getData:function () {
    //return fetch("http://omdbapi.com/?s=star&y&r=json").then((res) => res);
    //return fetch("https://79.100.190.102:8080/get/all").then((res) => res.json());
    return fetch("http://10.10.0.119:8080/get/all").then((res) => res.json());
  }
}
module.exports = api;
