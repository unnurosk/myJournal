//@ts-nocheck
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonDatetime,  IonTextarea, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Home.css';
import logo from './logo.png';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { camera, trash, close } from 'ionicons/icons';
const { Filesystem, Storage } = Plugins;

const prefix = 'myJournal_test3';

function Home(props) {  
  const [text, setText] = useState();
  const [photos, setPhotos] = useState([]);
  const [date, setDate] = useState('2020-01-01');
  const [ready, setReady] = useState();
  const [unsaved, setUnsaved] = useState(false);
  
  const key = `${prefix}_${date}`;
  const {  takePhoto } = usePhotoGallery(photos, setPhotos);

  async function load () {    
    let state = await Storage.get({key});
    state = state.value ? JSON.parse(state.value) : {};
    setText(state.text || '');
    setPhotos(state.photos || []);
  }

  const save = () => {   
    Storage.set({key, value: JSON.stringify({text, photos})})
  }

  useEffect(() => { 
    load(); 
  },[date]);
  
  useEffect(() => {
    save();
  });
  

  if (text == undefined) return <div>loading</div>
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <img src={logo} id="logo"/>
          <IonTitle id="title" size="large">myJournal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">myJournal</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonTitle>Date</IonTitle>
        <IonDatetime displayFormat="MM-DD-YYYY" value={date} onIonChange={e => setDate(e.detail.value.slice(0,10))}></IonDatetime>
        <IonTitle>Entry</IonTitle>
        < IonTextarea id="entry" rows={10} debounce={500} onIonChange={d => setText(d.detail.value)} value={text}></ IonTextarea>
        
      </IonContent>
      <IonContent>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>

      <IonContent>
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg src={photo.webviewPath} />
             </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
