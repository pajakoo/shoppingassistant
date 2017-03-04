import React from 'react'
import {List, ListItem} from 'material-ui/List'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
//import {Servers} from '../../

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'unknown',
      loading: false,
      data: {},
      users:[]
    };

  }

  getPromiseData( x ){
    return new Promise((resolve, reject) => {
      Promise.all(x)
        .then(res => {
          return res.map(data => data.json())
        })
        .then(res => {
          Promise.all(res).then(resolve)
        }).catch(reject)
    })
  }

  componentDidMount() {
    let users = [fetch('http://localhost:8080/users/get/all').catch((err) => console.log('fetf: ',err))]
    this.getPromiseData(users).then( res => {
      this.setState({users:res.reduce((a,b)=>[...a,...b],[]) })
    })



/*

    new Promise((resolve, reject) => {
      if (typeof FB !== 'undefined') {
        resolve();
      } else {
        window.fbAsyncInit = () => {
          FB.init({
            appId      : '1322466351129906',
            xfbml      : true,
            version    : 'v2.8'
          });
          resolve();
        };
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }
    }).then(function() {

      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          let uid = response.authResponse.userID;
          let accessToken = response.authResponse.accessToken;

          //fetch('https://graph.facebook.com/me?fields=id&access_token='+accessToken).then((res) => console.log(res.json()) );

          console.log(uid);

          /!* make the API call *!/
          FB.api(
            "/"+uid,
            function (response) {
              if (response && !response.error) {
                console.log('eek:',response)

                fetch('http://localhost:8080/users/save/'+response.name).then((res) => console.log(res.json(), 'is saved'));
              }
            }
          );
        }
        else {
          FB.login();
        }
      });
    });
*/

  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme, { userAgent: 'all' }) };
  }

  render(){
      return (
        <List>
        {
          this.state.users.map((res, i) => {
            return <ListItem  key={i} primaryText={res.name} />
          })
        }
        </List>
    )

  }

}

Home.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};





/**
 * Created by pajakoo on 3/2/17.
 */
const promises = {
  init: () => {
    return new Promise((resolve, reject) => {
      if (typeof FB !== 'undefined') {
        resolve();
      } else {
        window.fbAsyncInit = () => {
          FB.init({
            appId      : '<app_id>',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.5'
          });
          resolve();
        };
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }
    });
  },
  checkLoginState: () => {
    return new Promise((resolve, reject) => {
      FB.getLoginStatus((response) => {
        response.status === 'connected' ? resolve(response) : reject(response);
      });
    });
  },
  login: () => {
    return new Promise((resolve, reject) => {
      FB.login((response) => {
        response.status === 'connected' ? resolve(response) : reject(response);
      });
    });
  },
  logout: () => {
    return new Promise((resolve, reject) => {
      FB.logout((response) => {
        response.authResponse ? resolve(response) : reject(response);
      });
    });
  },
  fetch: () => {
    return new Promise((resolve, reject) => {
      FB.api(
        '/me',
        {fields: 'first_name, last_name, gender'},
        response => response.error ? reject(response) : resolve(response)
      );
    });
  }
}

export const Facebook = {
  doLogin() {
    this.setState({
      loading: true
    }, () => {
      promises.init()
        .then(
          promises.checkLoginState,
          error => { throw error; }
        )
        .then(
          response => { this.setState({status: response.status}); },
          promises.login
        )
        .then(
          promises.fetch,
          error => { throw error; }
        )
        .then(
          response => { this.setState({loading: false, data: response, status: 'connected'}); },
          error => { throw error; }
        )
        .catch((error) => {
          this.setState({loading: false, data: {}, status: 'unknown'});
          console.warn(error);
        });
    });
  },
  doLogout() {
    this.setState({
      loading: true
    }, () => {
      promises.init()
        .then(
          promises.checkLoginState,
          error => { throw error; }
        )
        .then(
          promises.logout,
          error => { this.setState({data: {}, status: 'unknown'}); }
        )
        .then(
          response => { this.setState({loading: false, data: {}, status: 'unknown'}); },
          error => { throw error; }
        )
        .catch(error => {
          this.setState({loading: false, data: {}, status: 'unknown'});
          console.warn(error);
        });
    });
  },
  checkStatus() {
    this.setState({
      loading: true
    }, () => {
      promises.init()
        .then(
          promises.checkLoginState,
          error => { throw error; }
        )
        .then(
          response => { this.setState({status: response.status}); },
          error => { throw error; }
        )
        .then(
          promises.fetchUser,
          error => { throw error; }
        )
        .then(
          response => { this.setState({loading: false, data: response, status: 'connected'}); },
          error => { throw error; }
        )
        .catch((error) => {
          this.setState({loading: false, data: {}, status: 'unknown'});
          console.warn(error);
        });
    });
  }
};
