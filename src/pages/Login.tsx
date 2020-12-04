import { IonContent, IonText, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg } from '@ionic/react';
import React, { Component } from 'react';
//import './Login.css';
import { Twitter } from 'capacitor-twitter';
import logo from './logo.png';
import birdlogo from './twitter.png';
import './Login.css';
const twitter = new Twitter();
const INITIAL_STATE = {
  loggedIn: false,
};

class Login extends Component {
  state: any = {};
  props: any = {};
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  async getCurrentState() {
    twitter
      .isLogged()
      .then(r => console.log(r)) // returns { in: boolean, out: boolean }
      .catch(err => console.log(err));
  }

  async signIn(): Promise<void> {
    const { history } = this.props;
    twitter
      .login()
      .then(result => {
        console.log('result', result);
        history.push({
          pathname: '/home',
          state: { token: result.authToken, userId: result.userID, userName: result.userName }
        });
      }) // returns { authToken:string, authTokenSecret:string, userName:string, userID:string }
      .catch(err => console.log(err));
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>myJournal</IonTitle>
            <IonToolbar>
          <img src={logo} id="logo"/>
          <IonTitle id="title" size="large">myJournal</IonTitle>
        </IonToolbar>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonRow>
          </IonRow>
          <IonRow>
            <IonCol className="text-center">
              <IonText className="title">
                <img src={birdlogo} id="birdlogo"/>
                Login to myJournal using twitter. 
              </IonText>
            </IonCol>
          </IonRow>
          
          <IonButton className="login-button" routerLink="/home"  expand="full" fill="solid" color="primary">
            Login with Twitter
        </IonButton>
        </IonContent>
      </IonPage>
    )
  }
}

export default Login;