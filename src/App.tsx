import { render } from 'react-dom';
import { FC } from 'react';
import Main from './Main';

const App: FC = () => <Main />;

render(<App />, document.getElementById('app'));
