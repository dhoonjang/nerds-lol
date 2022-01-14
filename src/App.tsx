import { render } from 'react-dom';
import { FC } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Main from './Main';

const App: FC = () => {
  return (
    <ChakraProvider>
      <Main />
    </ChakraProvider>
  );
};

render(<App />, document.getElementById('app'));
