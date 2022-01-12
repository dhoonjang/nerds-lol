import { render } from 'react-dom';
import { FC } from 'react';
import HelloWorld from './HelloWorld';

const App: FC = () => <HelloWorld />;

render(<App />, document.getElementById('app'));
