// ReactotronConfig.js
import {reactotronRedux} from 'reactotron-redux';
import Reactotron, {networking} from 'reactotron-react-native';

// then add it to the plugin list
const reactotron = Reactotron.configure({name: 'React Native Demo'})
  .use(reactotronRedux()) //  <- here i am!
  .connect(); //Don't forget about me!

export default reactotron; // also: export me so I can be referenced by Redux store
