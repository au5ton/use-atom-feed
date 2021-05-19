import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useAtomFeed } from '../.';

import sampleFeed from 'url:/samples/Newtonsoft.Json.atom.xml';

const App = () => {
  const { data, error, isValidating } = useAtomFeed(sampleFeed);
  console.log('sampleFeed: ', data);
  return (
    <div>
      <h1>Hello, World!</h1>
      <pre>
        {data !== undefined ? JSON.stringify(data, undefined, 2): ''}
      </pre>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
